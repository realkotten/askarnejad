import React from 'react';
import { Phone, Clock, Coins } from 'lucide-react';
import { farsiDigits } from '../data';

interface HeaderProps {
  onAdminClick?: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const currentTime = new Date();
  
  // Format current time in dynamic Farsi hours and minutes for real luxury
  const hours = farsiDigits(currentTime.getHours().toString().padStart(2, '0'));
  const minutes = farsiDigits(currentTime.getMinutes().toString().padStart(2, '0'));

  return (
    <header className="w-full z-50 sticky top-0 bg-[#0d0f12]/90 backdrop-blur-md border-b border-[#d4af37]/15">
      {/* We use dir="ltr" on this inner bar to guarantee Logo is on the Left, and other links align correctly */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" dir="ltr">
        
        {/* Left Side (in LTR context): Brand Vector Logo */}
        <div 
          onClick={onAdminClick}
          className="flex items-center gap-3 cursor-pointer select-none group"
          title="ورود به بخش مدیریت مراجعین"
        >
          {/* Logo vector icon wrapper */}
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#1c1d22] to-[#121316] rounded-xl border border-[#d4af37]/35 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#d4af37]/70 transition-all duration-300">
            <Coins className="text-[#d4af37] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Brand Name Text */}
          <div className="flex flex-col text-left">
            <span className="text-lg sm:text-xl font-bold tracking-wider font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#f5df99] via-[#d4af37] to-[#b3953b] select-none uppercase leading-tight">
              Askarnejad
            </span>
            <span className="text-[9px] text-gray-450 tracking-tight leading-none font-medium mt-0.5" dir="rtl">
              سامانه استعلام انگ طلا و نقره
            </span>
          </div>
        </div>

        {/* Right Side: Phone Quick Dial & Clock (visible on desktop + responsive layout on mobile) */}
        <div className="flex items-center gap-2 sm:gap-4" dir="rtl">
          {/* Live System Time in Persian - hidden on extra small, shown on sm+ */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-gray-400 bg-[#15171d] border border-gray-800 rounded-full px-3 py-1 font-mono">
            <Clock size={12} className="text-[#d4af37]" />
            <span>ساعت: {hours}:{minutes}</span>
          </div>
          
          {/* Quick Direct Line - always visible with responsive sizing */}
          <a 
            href="tel:09137209387" 
            className="flex items-center gap-2 text-xs text-[#d4af37] hover:text-[#f9e8a2] bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg border border-[#d4af37]/25 transition-all duration-300"
          >
            <Phone size={11} className="sm:w-3 sm:h-3" />
            <span className="font-mono tracking-tight font-semibold text-[11px] sm:text-xs">۰۹۱۳۷۲۰۹۳۸۷</span>
          </a>
        </div>

      </div>
    </header>
  );
}
