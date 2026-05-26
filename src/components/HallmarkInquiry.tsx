import React, { useState } from 'react';
import { Search, Sparkles, RefreshCw, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { generateDynamicCertificate, farsiDigits } from '../data';
import { dbService } from '../lib/dbService';
import { AssayCertificate } from '../types';

interface HallmarkInquiryProps {
  onCertificateFound: (cert: AssayCertificate) => void;
}

export default function HallmarkInquiry({ onCertificateFound }: HallmarkInquiryProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foundCert, setFoundCert] = useState<AssayCertificate | null>(null);
  const [showNotFound, setShowNotFound] = useState(false);
  const [searchedCode, setSearchedCode] = useState('');
  const [showPhone, setShowPhone] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('لطفاً شماره انگ یا کد شناسنامه را وارد کنید.');
      setTimeout(() => setError(''), 4000);
      return;
    }

    setLoading(true);
    setFoundCert(null);
    setShowNotFound(false);
    setError('');

    // Simulate laboratory database search
    setTimeout(() => {
      const cleanKey = query.trim().toUpperCase();
      const cert = dbService.getCertificate(cleanKey);

      if (!cert) {
        setSearchedCode(cleanKey);
        setShowNotFound(true);
        setLoading(false);
        return;
      }

      setFoundCert(cert);
      onCertificateFound(cert);
      setLoading(false);
    }, 1500);
  };

  const clearInquiry = () => {
    setQuery('');
    setFoundCert(null);
    setShowNotFound(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 z-10">
      
      {/* Centered Glassmorphic Card styled exactly like the mockup */}
      <div className="relative glass-panel rounded-3xl p-6 md:p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#d4af37]/25 before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#d4af37]/5 before:to-transparent before:pointer-events-none">
        
        {/* Abstract golden flare accent behind the panel */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#d4af37]/10 blur-[60px]" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#d4af37]/10 blur-[60px]" />

        {/* Card Header Translation: "استعلام انگ" */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/15 mb-3 font-semibold">
            <Sparkles size={11} className="animate-pulse" />
            سامانه آنلاین اعتبارسنجی کدهای رسمی انگ آزمایشگاهی
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100 select-none">
            استعلام شماره انگ آزمایشگاهی
          </h2>
          <p className="text-xs text-gray-400 mt-2 font-medium">
            با وارد کردن شناسه تاییدیه یا کد انگ، اصالت و مشخصات رسمی آزمایشگاهی کالا را مشاهده نمایید.
          </p>
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleInquiry} className="relative">
          {/* Main search bar matching the exact design style with elements aligned perfectly in RTL */}
          <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center bg-transparent sm:bg-[#15171d]/90 hover:sm:bg-[#1a1c24] border-0 sm:border border-[#d4af37]/20 hover:sm:border-[#d4af37]/45 focus-within:sm:border-[#d4af37]/75 rounded-2xl sm:p-1.5 transition-all duration-300 w-full justify-between">
            
            {/* 1. RIGHT SIDE (or Top on mobile): Search Icon & Input Field */}
            <div className="flex items-center flex-grow pl-2 bg-[#15171d]/90 hover:bg-[#1a1c24] border border-[#d4af37]/25 sm:border-0 rounded-2xl p-4 sm:p-0">
              <div className="text-gray-400 pr-1 pl-1">
                <Search size={20} className="text-[#d4af37]/80" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="شماره انگ را وارد کنید"
                className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none px-2 font-bold text-base text-gray-100 placeholder-gray-500 text-right select-text"
                dir="rtl"
              />
            </div>

            {/* 2. LEFT SIDE (or Bottom on mobile): Action button "استعلام" */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-br from-[#f5df99] via-[#d4af37] to-[#aa8c2c] hover:from-[#fcf0c2] hover:via-[#e6c148] hover:to-[#cfa72f] disabled:from-[#4b4530] disabled:to-[#2e2b1f] text-[#0d0f12] font-semibold text-base py-3.5 sm:py-2.5 md:py-3.5 px-6 md:px-8 rounded-2xl sm:rounded-xl cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_22px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center gap-2 min-w-full sm:min-w-[100px] md:min-w-[130px] justify-center flex-shrink-0 animate-none"
            >
              {loading ? (
                <RefreshCw size={16} className="animate-spin text-black" />
              ) : (
                'استعلام'
              )}
            </button>

          </div>

          {/* Test codes shortcut section has been fully removed under your request */}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-800/40 text-red-300 text-xs rounded-xl flex items-center gap-2 animate-[slideUp_0.2s_ease-out]">
              <AlertTriangle size={14} className="flex-shrink-0" />
              <p className="text-right">{error}</p>
            </div>
          )}
        </form>

        {/* Searching Status Indicator */}
        {loading && (
          <div className="mt-6 p-5 bg-[#121317]/80 border border-[#d4af37]/10 rounded-2xl text-center flex flex-col items-center justify-center gap-3 animate-pulse">
            <RefreshCw size={24} className="animate-spin text-[#d4af37]" />
            <p className="text-xs text-[#d4af37] font-medium font-sans">
              اتصال به پایگاه داده مرکزی آزمایشگاهی...
            </p>
            <span className="text-[10px] text-gray-500">
              در حال تطبیق با استانداردهای کوپلاسیون و بررسی هولوگرام امنیت
            </span>
          </div>
        )}

        {/* Quick Result Badge (Succinct success feedback) */}
        {!loading && foundCert && (
          <div className="mt-6 p-4 bg-green-950/20 border border-green-800/20 text-green-300 text-xs rounded-2xl flex items-center justify-between animate-[slideUp_0.3s_ease-out]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-400" />
              <div className="text-right">
                <p className="font-bold text-green-200">کد تاییدیه {foundCert.id} معتبر است</p>
                <p className="text-[10px] text-gray-400">{foundCert.itemType} | {farsiDigits(foundCert.weight)} گرم</p>
              </div>
            </div>
            <button
              onClick={clearInquiry}
              className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-2 py-1 rounded border border-gray-700 cursor-pointer"
            >
              پاک کردن
            </button>
          </div>
        )}

        {/* Beautiful Custom Error Card for Unregistered Codes */}
        {!loading && showNotFound && (
          <div className="mt-6 bg-gradient-to-br from-[#2a1215] to-[#121317] border border-red-500/35 rounded-2xl p-5 md:p-6 text-right space-y-4 animate-[slideUp_0.3s_ease-out] relative overflow-hidden shadow-[0_15px_30px_rgba(239,68,68,0.1)]">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-start gap-3 border-b border-red-955/20 pb-3">
              <div className="p-2 bg-red-950/50 border border-red-800/40 rounded-xl text-red-400 flex-shrink-0">
                <AlertTriangle size={20} className="animate-pulse" />
              </div>
              <div className="space-y-1 flex-grow">
                <h3 className="text-sm font-extrabold text-red-200">کد انگ در پایگاه داده ثبت نیست!</h3>
                <p className="text-[10px] text-gray-400">آزمایشگاه عیارسنجی عسکرنژاد</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowNotFound(false)}
                className="text-xs text-gray-500 hover:text-gray-300 p-1 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-300 leading-relaxed font-sans font-medium">
              <p>
                کد وارد شده <strong className="text-red-400 font-mono font-bold bg-red-950/80 border border-red-900/30 px-2.5 py-0.5 rounded text-sm select-all">{farsiDigits(searchedCode)}</strong> معتبر نبوده و در پایگاه داده مرکزی عسکرنژاد ثبت نشده است. ساخت گواهینامه یا مهر حک شده روی این کالا با استانداردهای رسمی مطابقت ندارد.
              </p>
              
              <div className="bg-[#121318]/70 p-3 rounded-xl border border-gray-800/80 space-y-1.5 text-[11px] text-gray-450">
                <p className="font-bold text-gray-200">راهنمای رفع مشکل:</p>
                <ul className="list-disc list-inside space-y-1 pr-1">
                  <li>بررسی کنید حروف را با کلام صحیح یا لاتین اشتباه تایپ نکرده باشید.</li>
                  <li>شماره انگ معمولاً تلفیقی از حروف انگلیسی و اعداد عیاری است (مثال: G750).</li>
                  <li>در صورت اطمینان، با شماره تلفن مستقیم پشتیبانی ما تماس بگیرید.</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1 font-sans">
              <button
                type="button"
                onClick={() => {
                  setShowNotFound(false);
                  const s = document.querySelector('input[type="text"]') as HTMLInputElement;
                  s?.focus();
                  s?.select();
                }}
                className="flex-1 text-center bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-300 hover:text-red-200 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
              >
                تصحیح شماره انگ
              </button>
              {showPhone ? (
                <a
                  href="tel:09137209387"
                  className="flex-1 text-center bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 text-emerald-300 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 block"
                  dir="ltr"
                >
                  ۰۹۱۳۷۲۰۹۳۸۷ <span className="text-[10px] text-emerald-400 font-normal font-sans">(تماس مستقیم)</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPhone(true)}
                  className="flex-1 text-center bg-gray-850 hover:bg-gray-800 border border-gray-750 text-gray-300 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  ارتباط با کارشناس آزمایشگاه
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
