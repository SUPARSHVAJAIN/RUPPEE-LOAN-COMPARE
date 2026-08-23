import React from 'react';
import { EligibilityFilters, LoanType, EmploymentStatus } from '../types';
import { formatRupees } from '../utils';
import { HelpCircle, Shield, Briefcase, User, Milestone, MapPin } from 'lucide-react';
import { INDIAN_STATES_DISTRICTS } from '../constants/locations';

interface FiltersFormProps {
  filters: EligibilityFilters;
  onFilterChange: (filters: EligibilityFilters) => void;
}

const LOAN_TYPES: { type: LoanType; label: string; icon: string; desc: string }[] = [
  { type: 'Home', label: 'Home Loan', icon: '🏠', desc: 'To purchase/construct property' },
  { type: 'Personal', label: 'Personal Loan', icon: '👤', desc: 'For personal/unsecured needs' },
  { type: 'Car', label: 'Car Loan', icon: '🚗', desc: 'For new or used vehicles' },
  { type: 'Business', label: 'Business Loan', icon: '💼', desc: 'For business expansion/working capital' },
];

export const FiltersForm: React.FC<FiltersFormProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof EligibilityFilters, value: any) => {
    const updated = { ...filters, [key]: value };

    // Auto-adjust default tenures if loan type changes to keep them in realistic ranges
    if (key === 'loanType') {
      if (value === 'Home') {
        updated.tenureYears = 20;
        if (updated.loanAmount < 1000000) updated.loanAmount = 3000000; // 30 L default for Home
      } else if (value === 'Personal') {
        updated.tenureYears = 3;
        if (updated.loanAmount > 2000000) updated.loanAmount = 500000; // 5 L default for Personal
      } else if (value === 'Car') {
        updated.tenureYears = 5;
        if (updated.loanAmount > 5000000) updated.loanAmount = 800000; // 8 L default for Car
      } else if (value === 'Business') {
        updated.tenureYears = 3;
        if (updated.loanAmount > 20000000) updated.loanAmount = 1000000; // 10 L default for Business
      }
    }

    onFilterChange(updated);
  };

  // Helper to identify Credit Score tier
  const getCreditScoreTier = (score: number) => {
    if (score >= 750) return { label: 'Excellent', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (score >= 700) return { label: 'Good', color: 'text-green-600 bg-green-50 border-green-200' };
    if (score >= 650) return { label: 'Average', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { label: 'Poor / High Risk', color: 'text-rose-600 bg-rose-50 border-rose-200' };
  };

  const creditTier = getCreditScoreTier(filters.creditScore);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-8 shadow-sm" id="filters-container">
      {/* Loan Type Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <Milestone className="w-4 h-4 text-indigo-600" />
          Select Loan Purpose
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {LOAN_TYPES.map((item) => (
            <button
              key={item.type}
              type="button"
              id={`loan-type-${item.type.toLowerCase()}`}
              onClick={() => handleChange('loanType', item.type)}
              className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                filters.loanType === item.type
                  ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="font-bold text-slate-900 text-sm">{item.label}</span>
              <span className="text-[10px] text-slate-500 mt-1 leading-tight">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Loan Request Details */}
        <div className="space-y-6">
          <h3 className="font-bold font-display text-slate-800 border-b border-slate-100 pb-2 text-base flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span> Loan Requirements
          </h3>

          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="input-loan-amount" className="text-sm font-medium text-slate-700">Requested Loan Amount</label>
              <span className="text-lg font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                {formatRupees(filters.loanAmount)}
              </span>
            </div>
            <input
              type="range"
              id="input-loan-amount"
              min={filters.loanType === 'Home' ? 500000 : 50000}
              max={filters.loanType === 'Home' ? 50000000 : filters.loanType === 'Business' ? 20000000 : 5000000}
              step={filters.loanType === 'Home' ? 100000 : 25000}
              value={filters.loanAmount}
              onChange={(e) => handleChange('loanAmount', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{filters.loanType === 'Home' ? '₹5 Lakh' : '₹50 K'}</span>
              <span>{filters.loanType === 'Home' ? '₹5 Crore' : filters.loanType === 'Business' ? '₹2 Crore' : '₹50 Lakh'}</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="input-loan-tenure" className="text-sm font-medium text-slate-700">Repayment Tenure</label>
              <span className="text-lg font-bold text-slate-800">
                {filters.tenureYears} {filters.tenureYears === 1 ? 'Year' : 'Years'}
                <span className="text-xs font-normal text-slate-500 ml-1">({filters.tenureYears * 12} months)</span>
              </span>
            </div>
            <input
              type="range"
              id="input-loan-tenure"
              min={filters.loanType === 'Home' ? 5 : 1}
              max={filters.loanType === 'Home' ? 30 : filters.loanType === 'Car' ? 7 : 5}
              step={1}
              value={filters.tenureYears}
              onChange={(e) => handleChange('tenureYears', parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{filters.loanType === 'Home' ? '5 Yrs' : '1 Yr'}</span>
              <span>{filters.loanType === 'Home' ? '30 Yrs' : filters.loanType === 'Car' ? '7 Yrs' : '5 Yrs'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Eligibility Factors */}
        <div className="space-y-6">
          <h3 className="font-bold font-display text-slate-800 border-b border-slate-100 pb-2 text-base flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Applicant Profile & Filters
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Age Filter */}
            <div className="space-y-1">
              <label htmlFor="input-age" className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Age (Years)
              </label>
              <input
                type="number"
                id="input-age"
                min={18}
                max={80}
                value={filters.age}
                onChange={(e) => handleChange('age', Math.min(80, Math.max(18, parseInt(e.target.value) || 18)))}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium"
              />
            </div>

            {/* Credit Score */}
            <div className="space-y-1">
              <label htmlFor="input-credit-score" className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                Credit Score (CIBIL)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="input-credit-score"
                  min={300}
                  max={900}
                  value={filters.creditScore}
                  onChange={(e) => handleChange('creditScore', Math.min(900, Math.max(300, parseInt(e.target.value) || 300)))}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium"
                />
                <span className={`absolute top-0 right-0 mt-2 mr-2 text-[9px] font-bold px-1.5 py-0.5 rounded border ${creditTier.color}`}>
                  {creditTier.label}
                </span>
              </div>
            </div>
          </div>

          {/* Employment Status */}
          <div className="space-y-2">
            <label htmlFor="input-employment" className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              Employment Status
            </label>
            <select
              id="input-employment"
              value={filters.employmentStatus}
              onChange={(e) => handleChange('employmentStatus', e.target.value as EmploymentStatus)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium bg-slate-50/50"
            >
              <option value="Salaried">Salaried Employee (MNC, Govt, Private)</option>
              <option value="Self-employed Professional">Self-Employed Professional (Doctor, CA, Architect, IT Expert)</option>
              <option value="Self-employed Business">Self-Employed Business / Proprietor / Merchant</option>
              <option value="Unemployed">Retired / Pensioner / Unemployed</option>
            </select>
          </div>

          {/* State & District Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="input-state" className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                State (Location)
              </label>
              <select
                id="input-state"
                value={filters.selectedState || 'All India'}
                onChange={(e) => {
                  const stateVal = e.target.value;
                  const updated = { ...filters, selectedState: stateVal, selectedDistrict: 'All Districts' };
                  onFilterChange(updated);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium bg-slate-50/50"
              >
                {Object.keys(INDIAN_STATES_DISTRICTS).map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="input-district" className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                District
              </label>
              <select
                id="input-district"
                value={filters.selectedDistrict || 'All Districts'}
                disabled={!filters.selectedState || filters.selectedState === 'All India'}
                onChange={(e) => handleChange('selectedDistrict', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium bg-slate-50/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {filters.selectedState && filters.selectedState !== 'All India' ? (
                  INDIAN_STATES_DISTRICTS[filters.selectedState]?.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))
                ) : (
                  <option value="All Districts">All Districts</option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Monthly Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="input-monthly-income" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Monthly Income</label>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                  {formatRupees(filters.monthlyIncome, true)}
                </span>
              </div>
              <input
                type="number"
                id="input-monthly-income"
                min={0}
                value={filters.monthlyIncome}
                onChange={(e) => handleChange('monthlyIncome', Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium"
              />
            </div>

            {/* Existing EMIs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="input-existing-emi" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Existing EMIs</label>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                  {formatRupees(filters.existingEmi, true)}
                </span>
              </div>
              <input
                type="number"
                id="input-existing-emi"
                min={0}
                value={filters.existingEmi}
                onChange={(e) => handleChange('existingEmi', Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
