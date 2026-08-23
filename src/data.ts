import { Lender } from './types';

export const INITIAL_LENDERS: Lender[] = [
  {
    id: 'sbi',
    name: 'State Bank of India (SBI)',
    type: 'Public Bank',
    logoColor: 'from-cyan-500 to-blue-600',
    rating: 4.6,
    updatedAt: '2026-06-25T12:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.40,
        maxRate: 9.65,
        processingFee: '0.35% of loan amount (Min ₹2,000, Max ₹10,000) + GST',
        minCreditScore: 700,
        minAge: 18,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 100000000 // 10 Cr
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.90,
        maxRate: 14.20,
        processingFee: '1.0% to 1.5% of loan amount + GST',
        minCreditScore: 720,
        minAge: 21,
        maxAge: 58,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 6,
        maxAmountRupees: 2000000 // 20 L
      },
      Car: {
        loanType: 'Car',
        minRate: 8.65,
        maxRate: 9.70,
        processingFee: 'Flat ₹1,500 + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 67,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 3,
        maxTenureYears: 7,
        maxAmountRupees: 5000000 // 50 L
      },
      Business: {
        loanType: 'Business',
        minRate: 11.20,
        maxRate: 14.50,
        processingFee: '2.0% of loan amount + GST',
        minCreditScore: 720,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 15000000 // 1.5 Cr
      }
    }
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    type: 'Private Bank',
    logoColor: 'from-blue-700 to-indigo-900',
    rating: 4.7,
    updatedAt: '2026-06-25T14:30:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.50,
        maxRate: 9.85,
        processingFee: '0.50% of loan amount (Max ₹3,000) + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 150000000 // 15 Cr
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.50,
        maxRate: 15.99,
        processingFee: 'Flat ₹4,999 + GST',
        minCreditScore: 720,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 4000000 // 40 L
      },
      Car: {
        loanType: 'Car',
        minRate: 8.75,
        maxRate: 10.25,
        processingFee: '0.5% of loan amount + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 3,
        maxTenureYears: 7,
        maxAmountRupees: 7500000 // 75 L
      },
      Business: {
        loanType: 'Business',
        minRate: 11.90,
        maxRate: 16.50,
        processingFee: '1.5% to 2.5% of loan amount + GST',
        minCreditScore: 710,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 50000000 // 5 Cr
      }
    }
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    type: 'Private Bank',
    logoColor: 'from-orange-500 to-amber-600',
    rating: 4.6,
    updatedAt: '2026-06-25T11:45:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.55,
        maxRate: 10.05,
        processingFee: '0.50% of loan amount (Max ₹5,000) + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 120000000 // 12 Cr
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.65,
        maxRate: 16.00,
        processingFee: 'Up to 2.25% of loan amount + GST',
        minCreditScore: 710,
        minAge: 21,
        maxAge: 58,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 5000000 // 50 L
      },
      Car: {
        loanType: 'Car',
        minRate: 8.70,
        maxRate: 10.50,
        processingFee: 'Flat ₹2,500 to ₹5,000 + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 8000000 // 80 L
      },
      Business: {
        loanType: 'Business',
        minRate: 12.00,
        maxRate: 17.00,
        processingFee: '2.0% of loan amount + GST',
        minCreditScore: 720,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 40000000 // 4 Cr
      }
    }
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    type: 'Private Bank',
    logoColor: 'from-rose-800 to-red-950',
    rating: 4.5,
    updatedAt: '2026-06-25T16:15:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.60,
        maxRate: 9.95,
        processingFee: 'Up to 1.0% of loan amount (Min ₹10,000) + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 100000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.75,
        maxRate: 17.50,
        processingFee: '1.5% to 2.0% of loan amount + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 4000000
      },
      Car: {
        loanType: 'Car',
        minRate: 8.85,
        maxRate: 11.00,
        processingFee: 'Flat ₹3,500 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 8,
        maxAmountRupees: 6000000
      },
      Business: {
        loanType: 'Business',
        minRate: 12.25,
        maxRate: 18.00,
        processingFee: '1.5% to 2.0% of loan amount + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 30000000
      }
    }
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    type: 'Private Bank',
    logoColor: 'from-red-600 to-blue-800',
    rating: 4.5,
    updatedAt: '2026-06-24T15:20:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.45,
        maxRate: 9.55,
        processingFee: '0.50% of loan amount + GST (Min ₹6,500)',
        minCreditScore: 720,
        minAge: 18,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 150000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.99,
        maxRate: 16.50,
        processingFee: 'Up to 2.50% of loan amount + GST',
        minCreditScore: 720,
        minAge: 21,
        maxAge: 58,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 3000000
      },
      Car: {
        loanType: 'Car',
        minRate: 8.70,
        maxRate: 9.95,
        processingFee: 'Flat ₹3,000 + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 5000000
      }
    }
  },
  {
    id: 'bob',
    name: 'Bank of Baroda (BoB)',
    type: 'Public Bank',
    logoColor: 'from-orange-600 to-orange-800',
    rating: 4.4,
    updatedAt: '2026-06-25T10:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.40,
        maxRate: 10.60,
        processingFee: '0.25% to 0.50% of loan amount (Min ₹8,500, Max ₹25,000) + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 100000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.10,
        maxRate: 15.60,
        processingFee: '1.0% of loan amount (Min ₹1,000, Max ₹10,000) + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 2000000
      },
      Car: {
        loanType: 'Car',
        minRate: 8.75,
        maxRate: 10.95,
        processingFee: 'Flat ₹1,500 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 5000000
      }
    }
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank (PNB)',
    type: 'Public Bank',
    logoColor: 'from-amber-700 to-rose-900',
    rating: 4.3,
    updatedAt: '2026-06-24T09:30:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.45,
        maxRate: 10.25,
        processingFee: '0.35% of loan amount (Min ₹2,500, Max ₹15,000) + GST',
        minCreditScore: 680,
        minAge: 18,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 80000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.40,
        maxRate: 15.45,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1500000
      },
      Car: {
        loanType: 'Car',
        minRate: 8.80,
        maxRate: 10.40,
        processingFee: 'Flat ₹1,000 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 4000000
      }
    }
  },
  {
    id: 'idfc',
    name: 'IDFC FIRST Bank',
    type: 'Private Bank',
    logoColor: 'from-amber-800 to-rose-750',
    rating: 4.6,
    updatedAt: '2026-06-25T15:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.55,
        maxRate: 9.85,
        processingFee: '0.50% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 75000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.49,
        maxRate: 19.99,
        processingFee: 'Flat ₹3,499 + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 4000000
      },
      Car: {
        loanType: 'Car',
        minRate: 8.99,
        maxRate: 11.50,
        processingFee: 'Flat ₹2,500 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 6000000
      },
      Business: {
        loanType: 'Business',
        minRate: 12.49,
        maxRate: 20.00,
        processingFee: '2.0% to 2.5% of loan amount + GST',
        minCreditScore: 690,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 10000000
      }
    }
  },
  {
    id: 'au_sfb',
    name: 'AU Small Finance Bank',
    type: 'Small Finance Bank',
    logoColor: 'from-orange-600 to-indigo-850',
    rating: 4.4,
    updatedAt: '2026-06-25T11:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 9.15,
        maxRate: 12.50,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 650,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 50000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.99,
        maxRate: 21.00,
        processingFee: 'Up to 2.5% of loan amount + GST',
        minCreditScore: 670,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1500000
      },
      Car: {
        loanType: 'Car',
        minRate: 9.45,
        maxRate: 12.99,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 650,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 4000000
      },
      Business: {
        loanType: 'Business',
        minRate: 13.50,
        maxRate: 22.00,
        processingFee: '2.0% of loan amount + GST',
        minCreditScore: 660,
        minAge: 23,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 20000000
      }
    }
  },
  {
    id: 'equitas_sfb',
    name: 'Equitas Small Finance Bank',
    type: 'Small Finance Bank',
    logoColor: 'from-emerald-600 to-indigo-900',
    rating: 4.2,
    updatedAt: '2026-06-23T14:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 9.50,
        maxRate: 13.00,
        processingFee: '1.0% to 1.5% of loan amount + GST',
        minCreditScore: 630,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 25,
        maxAmountRupees: 30000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 12.50,
        maxRate: 23.00,
        processingFee: '2.0% to 3.0% of loan amount + GST',
        minCreditScore: 650,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1000000
      },
      Business: {
        loanType: 'Business',
        minRate: 14.00,
        maxRate: 24.00,
        processingFee: '2.0% to 3.0% of loan amount + GST',
        minCreditScore: 640,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 10000000
      }
    }
  },
  {
    id: 'ujjivan_sfb',
    name: 'Ujjivan Small Finance Bank',
    type: 'Small Finance Bank',
    logoColor: 'from-blue-600 to-orange-500',
    rating: 4.1,
    updatedAt: '2026-06-24T11:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 9.65,
        maxRate: 14.00,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 620,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 3,
        maxTenureYears: 25,
        maxAmountRupees: 25000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 12.99,
        maxRate: 24.50,
        processingFee: '2.0% of loan amount + GST',
        minCreditScore: 640,
        minAge: 22,
        maxAge: 58,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1000000
      },
      Business: {
        loanType: 'Business',
        minRate: 14.50,
        maxRate: 25.00,
        processingFee: '2.5% of loan amount + GST',
        minCreditScore: 630,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 7500000
      }
    }
  },
  {
    id: 'bajaj',
    name: 'Bajaj Finserv',
    type: 'NBFC',
    logoColor: 'from-blue-600 to-blue-800',
    rating: 4.5,
    updatedAt: '2026-06-25T17:00:00Z',
    products: {
      Personal: {
        loanType: 'Personal',
        minRate: 11.00,
        maxRate: 18.50,
        processingFee: 'Up to 3.99% of loan amount + GST',
        minCreditScore: 685,
        minAge: 21,
        maxAge: 80,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 4000000
      },
      Car: {
        loanType: 'Car',
        minRate: 9.50,
        maxRate: 13.50,
        processingFee: '1.0% to 2.0% of loan amount + GST',
        minCreditScore: 670,
        minAge: 21,
        maxAge: 75,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 5000000
      },
      Business: {
        loanType: 'Business',
        minRate: 12.50,
        maxRate: 19.99,
        processingFee: 'Up to 3.0% of loan amount + GST',
        minCreditScore: 685,
        minAge: 22,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 6,
        maxAmountRupees: 8000000
      }
    }
  },
  {
    id: 'tata_capital',
    name: 'Tata Capital',
    type: 'NBFC',
    logoColor: 'from-blue-500 to-teal-600',
    rating: 4.5,
    updatedAt: '2026-06-25T13:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.70,
        maxRate: 11.50,
        processingFee: '0.50% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 100000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 10.99,
        maxRate: 19.00,
        processingFee: 'Up to 2.50% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 58,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 6,
        maxAmountRupees: 3500000
      },
      Car: {
        loanType: 'Car',
        minRate: 9.25,
        maxRate: 12.50,
        processingFee: 'Flat ₹2,500 to ₹5,000 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 5000000
      },
      Business: {
        loanType: 'Business',
        minRate: 12.99,
        maxRate: 21.00,
        processingFee: 'Up to 2.50% of loan amount + GST',
        minCreditScore: 680,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 7500000
      }
    }
  },
  {
    id: 'lt_finance',
    name: 'L&T Finance',
    type: 'NBFC',
    logoColor: 'from-amber-600 to-yellow-700',
    rating: 4.3,
    updatedAt: '2026-06-23T16:30:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.80,
        maxRate: 11.75,
        processingFee: '0.50% of loan amount + GST',
        minCreditScore: 670,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 25,
        maxAmountRupees: 50000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.50,
        maxRate: 20.00,
        processingFee: 'Up to 3.0% of loan amount + GST',
        minCreditScore: 670,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 2500000
      },
      Business: {
        loanType: 'Business',
        minRate: 13.50,
        maxRate: 22.00,
        processingFee: 'Up to 2.5% of loan amount + GST',
        minCreditScore: 670,
        minAge: 23,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 5000000
      }
    }
  },
  {
    id: 'aditya_birla',
    name: 'Aditya Birla Capital',
    type: 'NBFC',
    logoColor: 'from-yellow-600 to-red-700',
    rating: 4.3,
    updatedAt: '2026-06-24T12:00:00Z',
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.75,
        maxRate: 11.99,
        processingFee: 'Up to 1.0% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 75000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.25,
        maxRate: 21.00,
        processingFee: 'Up to 3.0% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 3000000
      },
      Business: {
        loanType: 'Business',
        minRate: 13.00,
        maxRate: 22.50,
        processingFee: 'Up to 2.5% of loan amount + GST',
        minCreditScore: 680,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 10000000
      }
    }
  },
  {
    id: 'mahindra_finance',
    name: 'Mahindra Finance',
    type: 'NBFC',
    logoColor: 'from-red-600 to-gray-700',
    rating: 4.1,
    updatedAt: '2026-06-23T15:00:00Z',
    products: {
      Car: {
        loanType: 'Car',
        minRate: 9.75,
        maxRate: 14.50,
        processingFee: '1.5% to 2.5% of loan amount + GST',
        minCreditScore: 630,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 7,
        maxAmountRupees: 4000000
      },
      Business: {
        loanType: 'Business',
        minRate: 14.00,
        maxRate: 23.00,
        processingFee: '2.5% to 3.0% of loan amount + GST',
        minCreditScore: 640,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 5000000
      }
    }
  },
  {
    id: 'karnataka_bank',
    name: 'Karnataka Bank',
    type: 'Private Bank',
    logoColor: 'from-red-600 to-amber-500',
    rating: 4.4,
    updatedAt: '2026-06-25T10:15:00Z',
    states: ['Karnataka', 'Maharashtra', 'Tamil Nadu'],
    districts: {
      'Karnataka': ['All Districts', 'Bengaluru Urban', 'Mysuru', 'Mangaluru', 'Udupi'],
      'Maharashtra': ['All Districts', 'Mumbai City', 'Pune'],
      'Tamil Nadu': ['All Districts', 'Chennai', 'Coimbatore']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.75,
        maxRate: 10.50,
        processingFee: '0.50% of loan amount (Min ₹5,000, Max ₹20,000) + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 50000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.50,
        maxRate: 16.00,
        processingFee: '1.0% to 1.5% of loan amount + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 2000000
      }
    }
  },
  {
    id: 'kerala_gramin',
    name: 'Kerala Gramin Bank',
    type: 'Public Bank',
    logoColor: 'from-green-600 to-emerald-800',
    rating: 4.3,
    updatedAt: '2026-06-25T09:00:00Z',
    states: ['Kerala'],
    districts: {
      'Kerala': ['All Districts', 'Kochi (Ernakulam)', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.60,
        maxRate: 9.90,
        processingFee: '0.40% of loan amount + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 30000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.25,
        maxRate: 15.00,
        processingFee: 'Flat ₹1,500 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 58,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1500000
      },
      Car: {
        loanType: 'Car',
        minRate: 8.95,
        maxRate: 10.25,
        processingFee: 'Flat ₹1,000 + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 3,
        maxTenureYears: 7,
        maxAmountRupees: 3000000
      }
    }
  },
  {
    id: 'saraswat_coop',
    name: 'Saraswat Co-operative Bank',
    type: 'Private Bank',
    logoColor: 'from-indigo-600 to-blue-800',
    rating: 4.4,
    updatedAt: '2026-06-25T11:30:00Z',
    states: ['Maharashtra', 'Delhi (NCR)', 'Gujarat', 'Karnataka'],
    districts: {
      'Maharashtra': ['All Districts', 'Mumbai City', 'Pune', 'Thane', 'Nashik'],
      'Delhi (NCR)': ['All Districts', 'New Delhi'],
      'Gujarat': ['All Districts', 'Ahmedabad', 'Surat'],
      'Karnataka': ['All Districts', 'Bengaluru Urban']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.55,
        maxRate: 9.75,
        processingFee: 'Flat ₹5,000 + GST',
        minCreditScore: 700,
        minAge: 21,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 75000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.00,
        maxRate: 14.50,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 710,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 2500000
      },
      Business: {
        loanType: 'Business',
        minRate: 12.00,
        maxRate: 15.50,
        processingFee: '1.5% of loan amount + GST',
        minCreditScore: 700,
        minAge: 25,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 25000000
      }
    }
  },
  {
    id: 'sikkim_bank',
    name: 'State Bank of Sikkim',
    type: 'Public Bank',
    logoColor: 'from-emerald-500 to-teal-700',
    rating: 4.2,
    updatedAt: '2026-06-24T14:00:00Z',
    states: ['Sikkim'],
    districts: {
      'Sikkim': ['All Districts', 'Gangtok', 'Namchi', 'Gyalshing', 'Mangan']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.85,
        maxRate: 10.20,
        processingFee: '0.50% of loan amount + GST',
        minCreditScore: 650,
        minAge: 18,
        maxAge: 65,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 25,
        maxAmountRupees: 20000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.75,
        maxRate: 14.99,
        processingFee: 'Flat ₹2,000 + GST',
        minCreditScore: 660,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1500000
      }
    }
  },
  {
    id: 'prathama_up',
    name: 'Prathama UP Gramin Bank',
    type: 'Public Bank',
    logoColor: 'from-teal-600 to-rose-700',
    rating: 4.1,
    updatedAt: '2026-06-23T11:00:00Z',
    states: ['Uttar Pradesh'],
    districts: {
      'Uttar Pradesh': ['All Districts', 'Lucknow', 'Meerut', 'Ghaziabad', 'Bareilly', 'Aligarh']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.65,
        maxRate: 10.10,
        processingFee: '0.35% of loan amount + GST',
        minCreditScore: 660,
        minAge: 18,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 25000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.50,
        maxRate: 14.75,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 670,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1000000
      }
    }
  },
  {
    id: 'maharashtra_gramin',
    name: 'Maharashtra Gramin Bank',
    type: 'Public Bank',
    logoColor: 'from-yellow-600 to-orange-700',
    rating: 4.1,
    updatedAt: '2026-06-25T08:30:00Z',
    states: ['Maharashtra'],
    districts: {
      'Maharashtra': ['All Districts', 'Aurangabad (Chhatrapati Sambhajinagar)', 'Nashik', 'Pune', 'Solapur', 'Jalgaon']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.70,
        maxRate: 10.30,
        processingFee: '0.40% of loan amount + GST',
        minCreditScore: 650,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 25,
        maxAmountRupees: 25000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.90,
        maxRate: 15.20,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 660,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 1500000
      },
      Business: {
        loanType: 'Business',
        minRate: 12.50,
        maxRate: 16.00,
        processingFee: '2.0% of loan amount + GST',
        minCreditScore: 660,
        minAge: 23,
        maxAge: 65,
        allowedEmployment: ['Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 10000000
      }
    }
  },
  {
    id: 'tmb_bank',
    name: 'Tamilnad Mercantile Bank',
    type: 'Private Bank',
    logoColor: 'from-sky-700 to-indigo-800',
    rating: 4.3,
    updatedAt: '2026-06-24T10:00:00Z',
    states: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra'],
    districts: {
      'Tamil Nadu': ['All Districts', 'Chennai', 'Coimbatore', 'Madurai', 'Tirunelveli', 'Erode', 'Thanjavur']
    },
    products: {
      Home: {
        loanType: 'Home',
        minRate: 8.60,
        maxRate: 10.00,
        processingFee: '0.50% of loan amount (Max ₹10,000) + GST',
        minCreditScore: 680,
        minAge: 21,
        maxAge: 70,
        allowedEmployment: ['Salaried', 'Self-employed Professional', 'Self-employed Business'],
        minTenureYears: 5,
        maxTenureYears: 30,
        maxAmountRupees: 50000000
      },
      Personal: {
        loanType: 'Personal',
        minRate: 11.20,
        maxRate: 15.50,
        processingFee: '1.0% of loan amount + GST',
        minCreditScore: 690,
        minAge: 21,
        maxAge: 60,
        allowedEmployment: ['Salaried'],
        minTenureYears: 1,
        maxTenureYears: 5,
        maxAmountRupees: 2000000
      }
    }
  }
];
