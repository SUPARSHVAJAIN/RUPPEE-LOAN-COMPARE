export type LenderType = 'Public Bank' | 'Private Bank' | 'Small Finance Bank' | 'NBFC';

export type LoanType = 'Personal' | 'Home' | 'Car' | 'Business';

export type EmploymentStatus = 'Salaried' | 'Self-employed Professional' | 'Self-employed Business' | 'Unemployed';

export interface LoanProduct {
  loanType: LoanType;
  minRate: number; // Annual interest rate percentage (e.g., 8.40)
  maxRate: number; // Annual interest rate percentage (e.g., 14.50)
  processingFee: string; // e.g. "0.5% of loan amount + GST" or "Flat ₹1,999"
  minCreditScore: number; // e.g. 650
  minAge: number; // e.g. 21
  maxAge: number; // e.g. 60
  allowedEmployment: EmploymentStatus[];
  minTenureYears: number;
  maxTenureYears: number;
  maxAmountRupees: number; // in Rupees
}

export interface Lender {
  id: string;
  name: string;
  type: LenderType;
  logoColor: string; // For rich dynamic vector placeholders
  rating: number; // Out of 5
  products: Partial<Record<LoanType, LoanProduct>>;
  updatedAt: string; // ISO date string or human readable
  isAIUpdated?: boolean; // Flag to indicate if real-time rates were fetched via Gemini
  states?: string[]; // Allowed states, e.g. ["Maharashtra", "Gujarat"]. If undefined, means All India.
  districts?: Record<string, string[]>; // Optional district restrictions per state. e.g., {"Maharashtra": ["Mumbai City", "Pune"]}
}

export interface EligibilityFilters {
  age: number;
  creditScore: number;
  employmentStatus: EmploymentStatus;
  monthlyIncome: number;
  existingEmi: number;
  loanAmount: number;
  tenureYears: number;
  loanType: LoanType;
  selectedState: string; // Filter by State
  selectedDistrict: string; // Filter by District
}

export interface LoanComparisonResult {
  lender: Lender;
  product: LoanProduct;
  isEligible: boolean;
  reasons: string[];
  emi: number;
  totalInterest: number;
  totalPayment: number;
  maxEligibleAmount: number;
}
