import React from 'react';
import { LoanComparisonResult } from '../types';
import { formatRupees } from '../utils';
import { CheckCircle2, AlertTriangle, XCircle, Percent, ArrowRight, Clock, Star, Landmark } from 'lucide-react';

interface LenderCardProps {
  result: LoanComparisonResult;
  onOpenDetails: (result: LoanComparisonResult) => void;
}

export const LenderCard: React.FC<LenderCardProps> = ({ result, onOpenDetails }) => {
  const { lender, product, isEligible, reasons, emi, totalInterest, maxEligibleAmount } = result;

  // Extract initials for the logo placeholder
  const getInitials = (name: string) => {
    return name
      .replace('State Bank of India', 'SBI')
      .replace('Punjab National Bank', 'PNB')
      .replace('Bank of Baroda', 'BOB')
      .replace('IDFC FIRST Bank', 'IDFC')
      .replace('Small Finance Bank', 'SFB')
      .replace('(', '')
      .replace(')', '')
      .split(' ')
      .map(w => w[0])
      .join('')
      .substring(0, 3)
      .toUpperCase();
  };

  // Human-friendly lender type badge
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Public Bank': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Private Bank': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Small Finance Bank': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'NBFC': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  // Determine eligibility state
  const isCapped = isEligible && reasons.some(r => r.includes('requested amount exceeds'));

  return (
    <div 
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full ${
        isCapped 
          ? 'border-amber-200 shadow-sm hover:shadow-md hover:border-amber-300' 
          : isEligible 
            ? 'border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-400 border-t-4 border-t-indigo-600' 
            : 'border-slate-100 opacity-75 shadow-none'
      }`}
      id={`lender-card-${lender.id}`}
    >
      {/* Top Banner / Badge Status */}
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getTypeColor(lender.type)}`}>
            {lender.type}
          </span>
          {lender.isAIUpdated && (
            <span className="bg-amber-500/10 text-amber-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-amber-300/30 flex items-center gap-1">
              ⚡ Live Rates
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated {new Date(lender.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Header Block */}
        <div className="flex items-start gap-4 mb-5">
          {/* Logo Placeholder */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${lender.logoColor} flex items-center justify-center text-white font-black text-sm tracking-wide shadow-inner flex-shrink-0`}>
            {getInitials(lender.name)}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-base leading-tight flex items-center gap-2 font-display">
              {lender.name}
            </h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <div className="flex items-center gap-0.5 text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded text-[11px] font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{lender.rating}</span>
              </div>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-slate-600 flex items-center gap-1">
                📍 {lender.states ? `${lender.states.join(', ')}` : 'All-India'}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Rates/EMIs Grid */}
        <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4 mb-5 bg-slate-50/50 px-3 rounded-xl">
          <div>
            <span className="text-xs text-slate-500 block mb-0.5">Interest Rate (p.a.)</span>
            <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-indigo-600" />
              {product.minRate.toFixed(2)}% - {product.maxRate.toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block mb-0.5">Processing Fee</span>
            <span className="text-xs font-semibold text-slate-700 line-clamp-2 leading-tight">
              {product.processingFee}
            </span>
          </div>
        </div>

        {/* Eligibility Check Overlay */}
        <div className="flex-1 mb-5">
          {!isEligible ? (
            <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                Ineligible For Loan
              </div>
              <ul className="space-y-1">
                {reasons.map((reason, idx) => (
                  <li key={idx} className="text-xs text-rose-600 list-disc ml-4 font-medium leading-relaxed">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          ) : isCapped ? (
            <div className="space-y-4">
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  Approved For Lower Amount
                </div>
                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                  Requested amount exceeds your FOIR debt limits. Approved up to <span className="font-bold">{formatRupees(maxEligibleAmount)}</span>.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Monthly EMI</span>
                  <span className="text-lg font-extrabold text-amber-700">{formatRupees(emi)}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Total Interest</span>
                  <span className="text-base font-bold text-slate-800">{formatRupees(totalInterest, true)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Fully Eligible
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Monthly EMI</span>
                  <span className="text-lg font-extrabold text-indigo-700">{formatRupees(emi)}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Total Interest</span>
                  <span className="text-base font-bold text-slate-800">{formatRupees(totalInterest, true)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {isEligible ? (
          <button
            type="button"
            id={`btn-open-details-${lender.id}`}
            onClick={() => onOpenDetails(result)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCapped
                ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md'
            }`}
          >
            Calculate Repayment Detail
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-full py-2.5 rounded-xl border border-slate-100 bg-slate-50/30 text-slate-400 text-xs font-semibold text-center flex items-center justify-center gap-1.5 cursor-not-allowed">
            <Landmark className="w-3.5 h-3.5" />
            Lending criteria unmet
          </div>
        )}
      </div>
    </div>
  );
};
