import React from 'react';
import { Award, Compass, ShieldCheck, Flame, Users, Landmark, LandmarkIcon } from 'lucide-react';
import { farsiDigits } from '../data';

export default function AboutSection() {
  const values = [
    {
      icon: <Award className="text-[#d4af37]" size={22} />,
      title: 'صلاحیت همکار استاندارد',
      desc: 'دارای پروانه همکار رسمی با اداره کل استاندارد کشور جهت صدور انواع کد عیارسنجی (انگ) معتبر در تمام استان‌ها.'
    },
    {
      icon: <Flame className="text-[#d4af37]" size={22} />,
      title: 'ری‌گیری با ذوب استاندارد',
      desc: 'استفاده از به‌روزترین روش حرارتی ذوب با کوره کوپلاسیون جهت تصفیه فیزیکی فلزات گرانبها در دماهای بالای ۱۰۶۴ درجه سانتیگراد.'
    },
    {
      icon: <Users className="text-[#d4af37]" size={22} />,
      title: 'بیش از دو دهه تجربه',
      desc: 'سابقه درخشان در خدمت‌رسانی به صرافان، سازندگان جواهرات خطوط تولید و بازرگانان عمده بازار سنتی طلا همگام با فناوری مدرن.'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 z-10" id="about-component" dir="rtl">
      <div className="relative bg-[#15171d]/85 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#d4af37]/20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pb-5 mb-5 border-b border-[#d4af37]/15">
          <h3 className="text-lg md:text-xl font-bold text-gray-100 font-sans">
            درباره ما
          </h3>
          <span className="text-[10px] sm:text-xs text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded-md border border-[#d4af37]/15 font-bold">
            شناسه ثبت صنفی و مجوزها
          </span>
        </div>

        {/* Narrative bio */}
        <div className="space-y-4 text-right mb-6">
          <p className="text-sm text-gray-200 leading-relaxed">
            <strong>آزمایشگاه عیارسنجی طلا و نقره عسگرنژاد</strong> با هدف ارتقای شفافیت معاملات و اطمینان‌بخشی به صنایع فلزات گرانبهای کشور تاسیس گردیده است. ما متعهد به پیاده‌سازی دقیق ضوابط استاندارد ملی شماره ۲۶ (عیارسنجی طلا) و استاندارد ملی شماره ۱۸ (نقره) در ایران می‌باشیم.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            تمام دستگاه‌های این مرکز به طور منظم کالیبره شده و نتایج آزمون‌های ری‌گیری توسط ناظرین باصلاحیت ارزیابی می‌شود. کدهای صادره آزمایشگاه به عنوان مهر معتبر تجاری در کلیه بازارهای مبادله‌ای طلا مورد شناسایی قرار می‌گیرند.
          </p>
        </div>

        {/* Dynamic highlights Grid */}
        <div className="space-y-4">
          {values.map((v, idx) => (
            <div 
              key={idx}
              className="bg-[#111216]/90 p-4 rounded-2xl border border-gray-900 hover:border-[#d4af37]/10 transition-all duration-300 flex items-start gap-4 text-right"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#1d1f27] to-[#121316] border border-gray-800 flex items-center justify-center">
                {v.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#f9e8a2]">{v.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Official Stats counter decoration */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-gray-800/60 text-center">
          <div>
            <span className="text-xl md:text-2xl font-bold text-[#d4af37] font-serif block">+{farsiDigits(25)}</span>
            <span className="text-[10px] text-gray-500">سال پاسخگویی</span>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-bold text-[#d4af37] font-serif block">+{farsiDigits(150)}K</span>
            <span className="text-[10px] text-gray-500">انگ صادر شده</span>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-bold text-[#d4af37] font-serif block">۹۹.۹۹٪</span>
            <span className="text-[10px] text-gray-500">تاییدیه‌های دقیق</span>
          </div>
        </div>

      </div>
    </div>
  );
}
