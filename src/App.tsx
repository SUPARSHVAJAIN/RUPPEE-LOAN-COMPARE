import React, { useState, useEffect } from 'react';
import { Lender, EligibilityFilters, LoanComparisonResult, LoanType } from './types';
import { assessEligibility, formatRupees } from './utils';
import { FiltersForm } from './components/FiltersForm';
import { LenderCard } from './components/LenderCard';
import { EmiCalculatorModal } from './components/EmiCalculatorModal';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  RotateCcw, 
  ArrowUpDown, 
  CheckCircle, 
  SlidersHorizontal, 
  TrendingUp, 
  HelpCircle, 
  Building2, 
  Briefcase, 
  Percent,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const INITIAL_FILTERS: EligibilityFilters = {
  age: 30,
  creditScore: 750,
  employmentStatus: 'Salaried',
  monthlyIncome: 65000,
  existingEmi: 0,
  loanAmount: 3500000, // Increased to 35 Lakhs
  tenureYears: 20,     // Increased to 20 Years
  loanType: 'Home',    // Changed to Home Loan to support higher limits natively
  selectedState: 'All India',
  selectedDistrict: 'All Districts',
};

export default function App() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [filters, setFilters] = useState<EligibilityFilters>(INITIAL_FILTERS);
  const [selectedResult, setSelectedResult] = useState<LoanComparisonResult | null>(null);
  
  // Sorting & Categorizing states
  const [sortBy, setSortBy] = useState<'rate' | 'emi' | 'rating'>('rate');
  const [filterType, setFilterType] = useState<string>('All');
  const [showEligibleOnly, setShowEligibleOnly] = useState<boolean>(false);

  // AI rate updating states
  const [isUpdatingRates, setIsUpdatingRates] = useState<boolean>(false);
  const [apiStatusMessage, setApiStatusMessage] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  // Fetch current lenders from Express API
  const fetchLenders = async () => {
    try {
      const res = await fetch('/api/loans');
      const data = await res.json();
      if (data.success && data.lenders) {
        setLenders(data.lenders);
      }
    } catch (err) {
      console.error("Error fetching lenders:", err);
    }
  };

  useEffect(() => {
    fetchLenders();
  }, []);

  // Handler to trigger real-time rate updates via Gemini Search Grounding
  const handleAiUpdate = async () => {
    setIsUpdatingRates(true);
    setApiStatusMessage("Scanning Google Search for live Indian bank interest rates (June 2026)...");
    try {
      const res = await fetch('/api/update-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      
      if (data.success && data.lenders) {
        setLenders(data.lenders);
        setIsSimulated(data.isSimulated || false);
        setApiStatusMessage(data.message);
        
        // Clear message after 6 seconds
        setTimeout(() => {
          setApiStatusMessage(null);
        }, 6000);
      }
    } catch (err) {
      console.error("Error updating rates:", err);
      setApiStatusMessage("Failed to update rates. Using fallback offline market adjustments.");
      setTimeout(() => {
        setApiStatusMessage(null);
      }, 4000);
    } finally {
      setIsUpdatingRates(false);
    }
  };

  // Reset database back to baseline
  const handleReset = async () => {
    try {
      const res = await fetch('/api/reset-loans', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.lenders) {
        setLenders(data.lenders);
        setApiStatusMessage("Database reset to base interest rate configurations.");
        setIsSimulated(false);
        setTimeout(() => {
          setApiStatusMessage(null);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Run eligibility assessments for all lenders for the selected product
  const comparisonResults: LoanComparisonResult[] = lenders
    .map((lender) => {
      const product = lender.products[filters.loanType];
      if (!product) return null;
      return assessEligibility(lender, product, filters);
    })
    .filter((res): res is LoanComparisonResult => res !== null);

  // Filter comparisons
  const filteredResults = comparisonResults.filter((res) => {
    if (showEligibleOnly && !res.isEligible) return false;
    if (filterType !== 'All' && res.lender.type !== filterType) return false;
    
    // State Filter: If selectedState is specified and is not 'All India', check if lender covers it
    if (filters.selectedState && filters.selectedState !== 'All India') {
      if (res.lender.states && !res.lender.states.includes(filters.selectedState)) {
        return false;
      }
      
      // District Filter: If selectedDistrict is specified and is not 'All Districts', check if lender covers it
      if (filters.selectedDistrict && filters.selectedDistrict !== 'All Districts') {
        if (res.lender.districts) {
          const stateDistricts = res.lender.districts[filters.selectedState];
          if (stateDistricts && !stateDistricts.includes(filters.selectedDistrict) && !stateDistricts.includes('All Districts')) {
            return false;
          }
        }
      }
    }
    
    return true;
  });

  // Sort comparisons
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'rate') {
      return a.product.minRate - b.product.minRate;
    }
    if (sortBy === 'emi') {
      if (!a.isEligible) return 1;
      if (!b.isEligible) return -1;
      return a.emi - b.emi;
    }
    if (sortBy === 'rating') {
      return b.lender.rating - a.lender.rating;
    }
    return 0;
  });

  // Derived Statistics for Highlights Banner
  const eligibleCount = comparisonResults.filter(r => r.isEligible).length;
  const bestRateProduct = comparisonResults.reduce((lowest, curr) => {
    if (!lowest) return curr;
    return curr.product.minRate < lowest.product.minRate ? curr : lowest;
  }, null as LoanComparisonResult | null);

  const bestRateStr = bestRateProduct 
    ? `${bestRateProduct.product.minRate.toFixed(2)}% (${bestRateProduct.lender.name.split(' ')[0]})`
    : 'N/A';

  const averageEmi = comparisonResults.filter(r => r.isEligible && r.emi > 0);
  const averageEmiVal = averageEmi.length > 0
    ? Math.round(averageEmi.reduce((sum, curr) => sum + curr.emi, 0) / averageEmi.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-800" id="main-root">
      {/* Dynamic Status / Toast Banner */}
      {apiStatusMessage && (
        <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-2xl shadow-lg border text-sm max-w-md animate-in slide-in-from-bottom-5 duration-300 flex items-start gap-3 ${
          isSimulated 
            ? 'bg-amber-50 text-amber-800 border-amber-200' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          {isSimulated ? (
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <span className="font-bold block">{isSimulated ? "Simulated Live Update Active" : "Gemini Real-Time Active"}</span>
            <p className="text-xs leading-relaxed opacity-90">{apiStatusMessage}</p>
          </div>
        </div>
      )}

      {/* Main Header Block */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm">
              ₹
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-lg sm:text-xl tracking-tight leading-tight font-display">
                Rupee Loan Comparison <span className="text-indigo-600">Simulator</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Indian Banking Rates & Eligibility</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Real-time green breathing badge from Sleek design */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Grounded Google search live rates</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Reset Database Button */}
              <button
                type="button"
                id="btn-reset-database"
                onClick={handleReset}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 bg-white cursor-pointer"
                title="Reset Rates to Baseline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Baseline</span>
              </button>

              {/* AI Real-time Update Trigger */}
              <button
                type="button"
                id="btn-trigger-ai-update"
                onClick={handleAiUpdate}
                disabled={isUpdatingRates}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isUpdatingRates
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md shadow-slate-200'
                }`}
              >
                {isUpdatingRates ? (
                  <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                )}
                <span>{isUpdatingRates ? 'Syncing...' : 'Fetch Live Rates via AI'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Quick Insights Dashboard Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="insights-dashboard">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-slate-50 text-indigo-600 rounded-xl border border-slate-100">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Lenders Tracked</span>
              <span className="text-xl font-black text-slate-800 font-display">{lenders.length}</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Banks & NBFCs</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Eligible Offers</span>
              <span className="text-xl font-black text-emerald-600 font-display">{eligibleCount}</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Matching criteria</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Lowest Interest</span>
              <span className="text-sm font-extrabold text-amber-700 truncate block mt-1 font-display">{bestRateStr}</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Optimized rates</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Avg Eligible EMI</span>
              <span className="text-xl font-black text-indigo-700 font-display">{averageEmiVal > 0 ? formatRupees(averageEmiVal) : 'N/A'}</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Based on your parameters</span>
            </div>
          </div>
        </div>

        {/* AI rate fetching loader block */}
        {isUpdatingRates && (
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left z-10">
              <span className="bg-white/10 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/10 inline-flex items-center gap-1 font-display">
                ⚡ Active Search Grounding
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display">AI is gathering latest June 2026 interest rates</h3>
              <p className="text-sm text-slate-300 max-w-xl font-medium">
                We are actively searching official portals of SBI, HDFC Bank, ICICI Bank, and large finance companies to map live baseline rates, processing fees and policy updates.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0 z-10">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-slate-400 font-bold">Connecting to Google Search...</span>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3"></div>
          </div>
        )}

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Filters (Capped/FOIR Inputs) */}
          <div className="xl:col-span-5 h-fit xl:sticky xl:top-24">
            <FiltersForm filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Right Column: Lenders Comparison List */}
          <div className="xl:col-span-7 space-y-6">
            
            {/* Toolbar for Sorting & Sub-Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Type Category Selection */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {['All', 'Public Bank', 'Private Bank', 'Small Finance Bank', 'NBFC'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      filterType === type
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm shadow-indigo-100'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {type === 'All' ? 'All Lenders' : type}
                  </button>
                ))}
              </div>

              {/* Sorting Selection & Checkbox */}
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Eligible Toggle */}
                <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEligibleOnly}
                    onChange={(e) => setShowEligibleOnly(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span>Show Eligible Only ({eligibleCount})</span>
                </label>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    id="sort-by-selector"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'rate' | 'emi' | 'rating')}
                    className="bg-transparent border-0 text-xs font-bold text-slate-700 focus:ring-0 p-0 pr-6 cursor-pointer"
                  >
                    <option value="rate">Sort by: Lowest Rate</option>
                    <option value="emi">Sort by: Lowest EMI</option>
                    <option value="rating">Sort by: Highest Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lender Cards Grid */}
            {sortedResults.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {sortedResults.map((res) => (
                    <motion.div
                      key={res.lender.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <LenderCard 
                        result={res} 
                        onOpenDetails={setSelectedResult} 
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-2xl text-slate-400">
                  🔍
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-850 font-display">No matching lenders found</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                    Try adjusting your eligibility parameters (lower requested amount, increase repayment tenure, improve CIBIL credit score, or change lender types).
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Detailed Informational Guide Footer */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            Understanding Loan Eligibility Criteria in India
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500 leading-relaxed font-medium">
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block">1. CIBIL Credit Score Bracket</span>
              <p>
                CIBIL score ranges from 300 to 900. Banks (such as SBI, HDFC, ICICI) typically mandate a minimum score of 700 to 750 for favorable rates. Scores below 650 are high risk, leaving borrowers dependent on Small Finance Banks (SFBs) or specialized NBFCs (like Bajaj Finserv) which charge higher interest rate premiums.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block">2. Fixed Obligation to Income Ratio (FOIR)</span>
              <p>
                Indian banking institutions rarely allow total monthly debts (existing EMIs + proposed EMI) to exceed 50% to 60% of net monthly income. If your existing EMIs represent a large percentage of your monthly income, your loan application gets capped or rejected to prevent over-leverage.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block">3. Employment & Professional Standing</span>
              <p>
                Salaried professionals represent the lowest risk segment and qualify for minimal processing fees and interest rates. Self-employed Professionals (Doctors, CAs, Architects) are highly preferred but require income tax returns (ITRs). Self-employed Businesses and non-professionals pay marginal risk premiums depending on industry sectors.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Amortization & Repayment Calculator Modal */}
      {selectedResult && (
        <EmiCalculatorModal 
          result={selectedResult} 
          onClose={() => setSelectedResult(null)} 
        />
      )}

      {/* Styled Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Rupee Loan Comparison Engine. Grounded via Gemini Search Agent.</p>
          <p className="max-w-md mx-auto">
            Disclaimers: Interest rates provided are estimations derived dynamically from search grounding. Actual rates fluctuate based on individual profile assessments, bank policies, and RBI repo rate mandates.
          </p>
        </div>
      </footer>
    </div>
  );
}
