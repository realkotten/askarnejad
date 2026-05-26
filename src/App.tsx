import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HallmarkInquiry from './components/HallmarkInquiry';
import CertificateModal from './components/CertificateModal';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import AdminDashboard from './components/AdminDashboard';
import { AssayCertificate } from './types';
import { Coins, ChevronDown, ArrowUpCircle } from 'lucide-react';

export default function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<AssayCertificate | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Background gold particles state
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    // Generate gold particles dynamically for premium background ambient
    const initialParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 12,
      size: 2 + Math.random() * 4,
    }));
    setParticles(initialParticles);

    // Track scroll to show return-to-top button
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCertificateFound = (cert: AssayCertificate) => {
    setSelectedCertificate(cert);
  };

  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.scrollY + 650,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen relative bg-[#0a0c0f] text-gray-100 flex flex-col font-sans select-none overflow-x-hidden pb-12">
      
      {/* Decorative Gold Ambient Blurred Glows */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none select-none z-0" />
      <div className="absolute top-[40%] right-[5%] w-96 h-96 rounded-full bg-[#aa8c2c]/5 blur-[140px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#d4af37]/3 blur-[160px] pointer-events-none select-none z-0" />

      {/* Hero Liquid Gold Laboratory Image Banner Background - Fully Blended */}
      <div className="absolute top-0 left-0 right-0 h-[650px] opacity-25 z-0 select-none overflow-hidden mask-image-b">
        <img 
          src="/src/assets/images/gold_assay_lab_bg_1779469758141.png" 
          alt="Gold Refinery Lab Background" 
          className="w-full h-full object-cover scale-105 pointer-events-none select-none filter brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0f]/10 via-[#0a0c0f]/60 to-[#0a0c0f]" />
      </div>

      {/* Floating Animated Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-gradient-to-br from-[#ffd700] to-[#b8860b] rounded-full opacity-40 shadow-[0_0_8px_rgba(212,175,55,0.6)]"
            style={{
              left: `${p.left}%`,
              bottom: `-20px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `gold-drift ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Standard Sticky Header */}
      <Header onAdminClick={() => setShowAdmin(true)} />

      {/* Core Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 select-none relative z-20 space-y-16">
        
        {/* HERO SECTION MATCHING PORTRAIT LAYOUT HERO STYLING */}
        <div 
          id="home"
          className="flex flex-col items-center justify-center text-center pt-8 md:pt-16 pb-6 space-y-8 select-none"
        >
          {/* Main Title Badge */}
          <div className="space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 text-xs font-semibold animate-pulse tracking-wide mb-2 select-none">
              <Coins size={14} />
              سامانه یکپارچه استعلام انگ و عیارسنجی آزمایشگاهی
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight select-none px-2">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f9e8a2] via-[#d4af37] to-[#aa8c2c] drop-shadow-sm select-none leading-tight">
                سامانه رسمی استعلام انگ طلا و نقره
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans font-medium px-4">
              با اطمینان از صحت شماره انگ، خلوص و اصالت قطعه یا پاکت آزمایشگاهی طلا و نقره مطلع شوید. عیارسنجی فوق‌پیشرفته تحت نظارت مسئول فنی آزمایشگاه معتمد استاندارد ملی.
            </p>
          </div>

          {/* Core Glassmorphic Hallmark Inquiry Box */}
          <HallmarkInquiry onCertificateFound={handleCertificateFound} />

          {/* Smooth Scroll visual cue */}
          <div 
            onClick={handleScrollToContent}
            className="flex flex-col items-center gap-1.5 text-xs text-gray-500 hover:text-[#d4af37] transition-all cursor-pointer pt-6 animate-bounce"
          >
            <span>خدمات ما را بررسی فرمایید</span>
            <ChevronDown size={14} />
          </div>

        </div>

        {/* SERVICES SECTION */}
        <div id="services" className="pt-8 select-none">
          <ServicesSection />
        </div>

        {/* ABOUT SECTION */}
        <div id="about" className="pt-8 select-none">
          <AboutSection />
        </div>

        {/* CONTACT SECTION */}
        <div id="contact" className="pt-8 pb-12 select-none">
          <ContactSection />
        </div>

      </main>

      {/* SOLID STATIC MINIMAL FOOTER - NO MENUS */}
      <footer className="w-full bg-[#0a0c0f] border-t border-gray-900 mt-16 select-none relative z-30 py-8 text-center text-gray-500 text-xs space-y-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
          <span className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} National Standard Gold Assay Portal. All Rights Reserved.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdmin(true)}
              className="text-[11px] text-gray-600 hover:text-[#d4af37] cursor-pointer transition-all duration-300 underline underline-offset-2 decoration-dashed"
            >
              سامانه کنترل داخلی (ویژه مدیریت)
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-[10px] text-gray-600 leading-relaxed font-sans">
          آزمایشگاه فوق‌تخصصی عیارسنجی و صنایع ری‌گیری طلا و نقره، تحت نظارت فنی و ممیزی مستقیم مسئول فنی آزمایشگاه معتمد استاندارد ملی کشور.
        </div>
      </footer>

      {/* GORGEOUS HOLOGRAPHIC CERTIFICATE POPUP DIALOG */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          onClose={() => setSelectedCertificate(null)} 
        />
      )}

      {/* SECURE ADMIN ENTRY DASHBOARD PORTAL */}
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-2 rounded-full bg-[#121317]/90 border border-[#d4af37]/35 text-[#d4af37] hover:text-[#f9e8a2] shadow-[0_4px_15px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 transition-all duration-300 z-50 animate-[slideUp_0.2s_ease-out]"
          aria-label="Back to Top"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}

    </div>
  );
}
