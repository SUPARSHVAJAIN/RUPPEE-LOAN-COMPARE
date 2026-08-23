import React, { useState, useEffect } from 'react';
import { LoanComparisonResult } from '../types';
import { formatRupees, calculateEmi } from '../utils';
import { X, Calendar, DollarSign, Clock, ShieldCheck, CreditCard } from 'lucide-react';

interface EmiCalculatorModalProps {
  result: LoanComparisonResult;
  onClose: () => void;
}

export const EmiCalculatorModal: React.FC<EmiCalculatorModalProps> = ({ result, onClose }) => {
  const { lender, product, maxEligibleAmount } = result;

  // Track editable fields in the modal for on-the-fly play-grounding
  const [customAmount, setCustomAmount] = useState<number>(Math.min(result.maxEligibleAmount, maxEligibleAmount || 500000));
  const [customRate, setCustomRate] = useState<number>(product.minRate);
  const [customTenure, setCustomTenure] = useState<number>(result.product.minTenureYears + 2);

  // Initialize with correct values when result changes
  useEffect(() => {
    setCustomAmount(Math.min(result.maxEligibleAmount, maxEligibleAmount || 500000));
    setCustomRate(product.minRate);
    setCustomTenure(result.product.minTenureYears + 2);
  }, [result]);

  // Recalculate values based on play-grounded sliders
  const emi = Math.round(calculateEmi(customAmount, customRate, customTenure));
  const totalPayment = emi * customTenure * 12;
  const totalInterest = Math.max(0, totalPayment - customAmount);
  
  // Custom Donut values
  const interestPercentage = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;
  const principalPercentage = 100 - interestPercentage;

  // Generate simple yearly amortization schedule
  const getAmortizationSchedule = () => {
    const schedule = [];
    let balance = customAmount;
    const monthlyRate = customRate / 12 / 100;

    for (let year = 1; year <= customTenure; year++) {
      let interestPaidInYear = 0;
      let principalPaidInYear = 0;

      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = emi - interest;
        
        interestPaidInYear += interest;
        principalPaidInYear += principal;
        balance -= principal;
      }

      schedule.push({
        year,
        principalPaid: Math.round(principalPaidInYear),
        interestPaid: Math.round(interestPaidInYear),
        remainingBalance: Math.max(0, Math.round(balance))
      });
    }
    return schedule;
  };

  const schedule = getAmortizationSchedule();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="repayment-modal">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 font-display">
              <span className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${lender.logoColor} flex items-center justify-center text-white font-black text-xs`}>
                {lender.name.substring(0, 2).toUpperCase()}
              </span>
              {lender.name} Repayment Simulator
            </h3>
            <span className="text-xs text-slate-500 font-medium">Playground for custom loan configurations</span>
          </div>
          <button 
            type="button" 
            id="btn-close-modal"
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Block: Sliders (Grounding) */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-display">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Tune Loan Specifications
            </h4>

            {/* Custom Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-600">Simulated Principal</span>
                <span className="font-extrabold text-indigo-700">{formatRupees(customAmount)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={maxEligibleAmount || 500000}
                step={25000}
                value={customAmount}
                onChange={(e) => setCustomAmount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Min: ₹50 K</span>
                <span>Max Eligible: {formatRupees(maxEligibleAmount, true)}</span>
              </div>
            </div>

            {/* Custom Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-600">Dynamic Interest Rate (p.a.)</span>
                <span className="font-extrabold text-indigo-600">{customRate.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min={product.minRate - 1 > 0 ? parseFloat((product.minRate - 1).toFixed(2)) : 5}
                max={parseFloat((product.maxRate + 2).toFixed(2))}
                step={0.05}
                value={customRate}
                onChange={(e) => setCustomRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Min: {(product.minRate - 1).toFixed(2)}%</span>
                <span>Max: {(product.maxRate + 2).toFixed(2)}%</span>
              </div>
            </div>

            {/* Custom Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-600">Repayment Period</span>
                <span className="font-extrabold text-slate-800">{customTenure} Years</span>
              </div>
              <input
                type="range"
                min={product.minTenureYears}
                max={product.maxTenureYears}
                step={1}
                value={customTenure}
                onChange={(e) => setCustomTenure(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Min: {product.minTenureYears} Yrs</span>
                <span>Max: {product.maxTenureYears} Yrs</span>
              </div>
            </div>

            {/* Custom Lender Info Snippet */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-900 space-y-1">
                <span className="font-bold block">Accurate Indian Banking Guidelines Applied</span>
                <p className="leading-relaxed text-indigo-800/90 font-medium">
                  Calculations account for compounding on reducing balances, mimicking standard rules from HDFC, SBI and major NBFCs. Eligibility approved under FOIR (Fixed Obligation to Income Ratio) limits.
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Financial breakdown + Charts */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-display">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                Payment Breakdown
              </h4>

              {/* Numerical Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Monthly EMI</span>
                  <span className="text-lg font-extrabold text-indigo-700">{formatRupees(emi)}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Total Interest</span>
                  <span className="text-lg font-extrabold text-indigo-500">{formatRupees(totalInterest)}</span>
                </div>
              </div>

              {/* Custom SVG Donut Chart */}
              <div className="flex items-center justify-center py-2">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background Circle */}
                    <path
                      className="text-indigo-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Interest Arc */}
                    <path
                      className="text-indigo-600 transition-all duration-300"
                      strokeDasharray={`${interestPercentage} 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-slate-800 font-display">
                      {((customAmount / (totalPayment || 1)) * 100).toFixed(0)}%
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Principal</span>
                  </div>
                </div>

                <div className="ml-6 space-y-2.5 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-indigo-100"></span>
                    <span className="text-slate-500">Principal: {principalPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-indigo-600"></span>
                    <span className="text-slate-500">Interest: {interestPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="text-slate-400 text-[10px] mt-1 leading-tight">
                    Total Amount Payable: <br />
                    <span className="text-slate-800 font-bold text-xs">{formatRupees(totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Schedule Table */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-display">Yearly Repayment Schedule</h4>
          <div className="overflow-x-auto max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-inner">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
              <thead className="bg-slate-50 sticky top-0 font-bold text-slate-500">
                <tr>
                  <th className="px-4 py-2.5">Year</th>
                  <th className="px-4 py-2.5">Principal Repaid</th>
                  <th className="px-4 py-2.5">Interest Paid</th>
                  <th className="px-4 py-2.5">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2 text-indigo-600 font-bold">Year {row.year}</td>
                    <td className="px-4 py-2">{formatRupees(row.principalPaid)}</td>
                    <td className="px-4 py-2 text-indigo-500">{formatRupees(row.interestPaid)}</td>
                    <td className="px-4 py-2 font-mono text-slate-500">{formatRupees(row.remainingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};
