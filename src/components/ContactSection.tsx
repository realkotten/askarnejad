import React from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { farsiDigits } from '../data';

export default function ContactSection() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 z-10" id="contact-component" dir="rtl">
      <div className="relative bg-[#15171d]/85 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#d4af37]/20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pb-5 mb-6 border-b border-[#d4af37]/15">
          <h3 className="text-lg md:text-xl font-bold text-gray-100 font-sans">
            تماس با ما
          </h3>
          <span className="text-[10px] sm:text-xs text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-md border border-[#d4af37]/15 font-bold">
            نشانی رسمی کارگاه و راه‌های پشتیبانی
          </span>
        </div>

        {/* Info Grid - Styled beautifully for mobile first */}
        <div className="grid grid-cols-1 gap-4 text-right font-sans">
          
          {/* Address Box */}
          <div className="bg-[#111216]/90 p-5 rounded-2xl border border-gray-850 hover:border-[#d4af37]/25 transition-all duration-300 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="text-[#d4af37]" size={18} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 block">نشانی دقیق کارگاه عسکرنژاد:</span>
              <span className="text-sm text-gray-200 leading-relaxed block font-semibold">
                سه راه شمال جنوبی بازار حاج آقا علی, بازار کفاش‌ها کاروانسرای گلشن, طبقه اول, کارگاه طلاسازی عسکرنژاد
              </span>
            </div>
          </div>

          {/* Phone Box */}
          <div className="bg-[#111216]/90 p-5 rounded-2xl border border-gray-850 hover:border-[#d4af37]/25 transition-all duration-300 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <Phone className="text-[#d4af37]" size={18} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 block">تلفن مستقیم مسئول فنی:</span>
              <a 
                href="tel:09137209387" 
                className="text-lg font-bold tracking-wider text-[#d4af37] hover:text-[#fcf0c2] transition-colors block font-mono"
              >
                ۰۹۱۳۷۲۰۹۳۸۷
              </a>
            </div>
          </div>

          {/* Clock/Hours Box */}
          <div className="bg-[#111216]/90 p-5 rounded-2xl border border-gray-850 hover:border-[#d4af37]/25 transition-all duration-300 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <Clock className="text-[#d4af37]" size={18} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 block">ساعات فعالیت ری‌گیری و عیارسنجی:</span>
              <span className="text-xs text-gray-300 leading-normal block">شنبه تا چهارشنبه: {farsiDigits('09:00')} صبح الی {farsiDigits('17:00')} عصر</span>
              <span className="text-xs text-gray-300 leading-normal block">پنجشنبه‌ها: {farsiDigits('09:00')} صبح الی {farsiDigits('13:30')} ظهر</span>
            </div>
          </div>

          {/* Email Box */}
          <div className="bg-[#111216]/90 p-5 rounded-2xl border border-gray-850 hover:border-[#d4af37]/25 transition-all duration-300 flex items-start gap-4 min-w-0 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <Mail className="text-[#d4af37]" size={18} />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <span className="text-[10px] text-gray-500 block">مکاتبات دیجیتال:</span>
              <a 
                href="mailto:askarnejadmehdi@gmail.com" 
                className="text-xs sm:text-sm text-gray-300 hover:text-[#d4af37] font-mono tracking-tight block transition-colors break-all select-text"
              >
                askarnejadmehdi@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Security Certificate assurance seal */}
        <div className="mt-8 p-4 bg-[#111216] border border-[#d4af37]/15 rounded-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-right">
            <ShieldCheck size={18} className="text-[#d4af37] flex-shrink-0" />
            <p className="text-[11px] text-gray-400">
              تمام فلزات ارسالی مراجعین با نظارت مستقیم محمد مهدی عسکرنژاد ذوب و ممیزی عیار می‌گردند.
            </p>
          </div>
          <span className="text-[9px] text-[#d4af37] border border-[#d4af37]/20 rounded-full px-2.5 py-0.5 tracking-widest uppercase font-mono">
            Verified Spot
          </span>
        </div>

      </div>
    </div>
  );
}
