import { Lender, LoanProduct, EligibilityFilters, LoanComparisonResult, EmploymentStatus } from './types';

/**
 * Calculates standard Monthly EMI for a principal, annual rate, and tenure in years.
 */
export function calculateEmi(principal: number, annualRatePercent: number, tenureYears: number): number {
  const r = annualRatePercent / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Formats a number into Indian Rupee (INR) currency format (e.g., ₹1,50,000 or ₹1.5 Lakh)
 */
export function formatRupees(amount: number, short: boolean = false): string {
  if (short) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)} K`;
    }
  }
  
  // Standard Indian currency formatting
  const x = amount.toFixed(0).toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return `₹${formatted}`;
}

/**
 * Assesses loan eligibility for a single lender product based on user criteria.
 * Follows FOIR (Fixed Obligation to Income Ratio) used by Indian Banks.
 */
export function assessEligibility(
  lender: Lender,
  product: LoanProduct,
  filters: EligibilityFilters
): LoanComparisonResult {
  const reasons: string[] = [];
  let isEligible = true;

  // 1. Age check
  if (filters.age < product.minAge) {
    isEligible = false;
    reasons.push(`Minimum required age is ${product.minAge} years (Your age: ${filters.age}).`);
  } else if (filters.age > product.maxAge) {
    isEligible = false;
    reasons.push(`Maximum allowed age is ${product.maxAge} years (Your age: ${filters.age}).`);
  }

  // Co-terminus age check (Age at maturity of loan should not cross 70 years)
  if (filters.age + filters.tenureYears > Math.min(product.maxAge + 5, 75)) {
    isEligible = false;
    reasons.push(`Loan maturity age exceeds limit. Maximum allowed age at repayment is ${Math.min(product.maxAge + 5, 75)} years.`);
  }

  // 2. Credit Score check
  if (filters.creditScore < product.minCreditScore) {
    isEligible = false;
    reasons.push(`Minimum Credit Score required is ${product.minCreditScore} (Your score: ${filters.creditScore}).`);
  }

  // 3. Employment Status check
  if (!product.allowedEmployment.includes(filters.employmentStatus)) {
    isEligible = false;
    const allowedStr = product.allowedEmployment.map(e => {
      if (e === 'Salaried') return 'Salaried';
      if (e === 'Self-employed Professional') return 'Self-Employed (Doctor/CA/Engineer)';
      if (e === 'Self-employed Business') return 'Self-Employed (Business)';
      return e;
    }).join(', ');
    reasons.push(`Lender only lends to: ${allowedStr}.`);
  }

  // Location coverage check
  if (filters.selectedState && filters.selectedState !== 'All India') {
    if (lender.states && !lender.states.includes(filters.selectedState)) {
      isEligible = false;
      reasons.push(`Lender not active in ${filters.selectedState}.`);
    } else if (filters.selectedDistrict && filters.selectedDistrict !== 'All Districts' && lender.districts) {
      const stateDistricts = lender.districts[filters.selectedState];
      if (stateDistricts && !stateDistricts.includes(filters.selectedDistrict) && !stateDistricts.includes('All Districts')) {
        isEligible = false;
        reasons.push(`Lender not active in ${filters.selectedDistrict}, ${filters.selectedState}.`);
      }
    }
  }

  // 4. Monthly Income limits
  // Define minimum income requirements
  let minIncomeRequired = 15000; // default for personal loans/others
  if (product.loanType === 'Home') minIncomeRequired = 25000;
  if (product.loanType === 'Business') minIncomeRequired = 30000;

  if (filters.monthlyIncome < minIncomeRequired) {
    isEligible = false;
    reasons.push(`Minimum monthly income required is ${formatRupees(minIncomeRequired)}.`);
  }

  // 5. FOIR (Fixed Obligation to Income Ratio) calculation
  // Total EMI capacity is typically 40% to 60% of income depending on bracket
  let foirPercent = 0.40;
  if (filters.monthlyIncome >= 75000) {
    foirPercent = 0.60;
  } else if (filters.monthlyIncome >= 40000) {
    foirPercent = 0.50;
  }

  const maxTotalEmiAllowed = filters.monthlyIncome * foirPercent;
  const availableEmiCapacity = maxTotalEmiAllowed - filters.existingEmi;

  // Let's compute maximum loan amount they can afford based on interest rate and tenure
  // We use the middle-of-the-road interest rate for this check
  const midRate = (product.minRate + product.maxRate) / 2;
  const r = midRate / 12 / 100;
  const n = filters.tenureYears * 12;

  let maxAffordableAmount = 0;
  if (availableEmiCapacity > 0) {
    if (r === 0) {
      maxAffordableAmount = availableEmiCapacity * n;
    } else {
      maxAffordableAmount = availableEmiCapacity * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    }
  }

  const absoluteMaxAmount = Math.min(product.maxAmountRupees, maxAffordableAmount);
  const maxEligibleAmount = Math.max(0, parseFloat(absoluteMaxAmount.toFixed(0)));

  if (availableEmiCapacity <= 0) {
    isEligible = false;
    reasons.push(`Existing EMIs exceed or reach your borrowing cap (${(foirPercent * 100).toFixed(0)}% of net income).`);
  } else if (filters.loanAmount > maxEligibleAmount) {
    // If they ask for more than eligible, we still mark as eligible but flag that the amount is capped!
    // Or we let them know they qualify for a lower amount
    reasons.push(`Your requested amount exceeds eligible limit. Approved up to ${formatRupees(maxEligibleAmount, true)} based on income/debts.`);
  }

  // Calculate actual financial values for requested loan amount
  const actualLendAmount = Math.min(filters.loanAmount, maxEligibleAmount || filters.loanAmount);
  const emi = calculateEmi(actualLendAmount, product.minRate, filters.tenureYears);
  const totalPayment = emi * filters.tenureYears * 12;
  const totalInterest = totalPayment - actualLendAmount;

  return {
    lender,
    product,
    isEligible: isEligible && maxEligibleAmount > 0,
    reasons,
    emi: isEligible ? Math.round(emi) : 0,
    totalInterest: isEligible ? Math.round(totalInterest) : 0,
    totalPayment: isEligible ? Math.round(totalPayment) : 0,
    maxEligibleAmount
  };
}
