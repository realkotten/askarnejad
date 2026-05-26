import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, Key, LogOut, Plus, Trash2, Edit, Check, X, 
  Database, Coins, Search, ShieldCheck, Download, Upload, Sparkles, FileText, User
} from 'lucide-react';
import { AssayCertificate } from '../types';
import { dbService } from '../lib/dbService';
import { farsiDigits } from '../data';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Database states
  const [certificates, setCertificates] = useState<AssayCertificate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModeId, setEditModeId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states for adding/editing
  const [hallmarkId, setHallmarkId] = useState('');
  const [certificateNo, setCertificateNo] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [assayDate, setAssayDate] = useState('');
  const [metalType, setMetalType] = useState<'gold' | 'silver'>('gold');
  const [declaredPurity, setDeclaredPurity] = useState('۱۸ عیار (۷۵۰)');
  const [testedPurity, setTestedPurity] = useState<string | number>('750.5');
  const [weight, setWeight] = useState<string | number>('10');
  const [inspector, setInspector] = useState('مسئول فنی و ناظر رسمی آزمایشگاه عیارسنجی');
  const [status, setStatus] = useState<'approved' | 'rejected' | 'pending'>('approved');
  const [itemType, setItemType] = useState('');
  const [labBranch, setLabBranch] = useState('شعبه مرکزی بازار تهران');
  const [remarks, setRemarks] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Extended form fields from reference screenshot
  const [sendSms, setSendSms] = useState(true);
  const [showGoldWeight_reg, setShowGoldWeight_reg] = useState(true);
  const [showCustomerName, setShowCustomerName] = useState(true);
  const [showWeight, setShowWeight] = useState(true);
  const [sampleRegistered, setSampleRegistered] = useState('نمونه خاک شماره ۱');
  const [showSampleWeight, setShowSampleWeight] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [showGoldWeight, setShowGoldWeight] = useState(true);
  const [showPrepTime, setShowPrepTime] = useState(true);
  const [prepTime, setPrepTime] = useState('۲۴ ساعت کاری');
  const [showTitle, setShowTitle] = useState(true);
  const [titleSelect, setTitleSelect] = useState('برگه رسمی آزمایش عیارسنجی طلا و نقره');
  const [wageType, setWageType] = useState<'percentage' | 'fixed'>('percentage');
  const [wageAmount, setWageAmount] = useState('۰.۵٪');
  const [documentType, setDocumentType] = useState<'hallmark' | 'packet'>('hallmark');
  const [packetNumber, setPacketNumber] = useState('');

  // Default credentials
  const CORRECT_USERNAME = 'admin';
  const CORRECT_PASSCODE = '18750';

  useEffect(() => {
    // Check if previously logged in (including permanent local storage)
    const adminSession = localStorage.getItem('askarnejad_admin_logged_perm') || sessionStorage.getItem('askarnejad_admin_logged');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await loadCertificates();
        resetForm();
      }
    })();
  }, [isAuthenticated]);

  const loadCertificates = async () => {
    try {
      setCertificates(await dbService.getAllCertificates());
    } catch (e) {
      console.error('Failed to load certificates', e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === CORRECT_USERNAME && password === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      // Permanent storage for auto-login to prevent constant credentials prompts as requested by the user
      localStorage.setItem('askarnejad_admin_logged_perm', 'true');
      sessionStorage.setItem('askarnejad_admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('نام کاربری یا کلمه عبور مدیریت نامعتبر است.');
      setPassword('');
      setTimeout(() => setLoginError(''), 4000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('askarnejad_admin_logged');
    localStorage.removeItem('askarnejad_admin_logged_perm');
    setUsername('');
    setPassword('');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportSuccess('');
    setImportError('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const importedData = JSON.parse(text);

        let importedList: AssayCertificate[] = [];
        if (Array.isArray(importedData)) {
          importedList = importedData;
        } else if (typeof importedData === 'object' && importedData !== null) {
          importedList = Object.values(importedData);
        } else {
          throw new Error('ساختار فایل پشتیبان نامعتبر است.');
        }

        const isValid = importedList.every(c => c && typeof c === 'object' && ('id' in c || 'certificateNo' in c));
        if (!isValid) {
          throw new Error('فایل انتخاب شده حاوی اطلاعات معتبر شناسنامه نمی‌باشد.');
        }

        for (const cert of importedList) {
          const cleanId = (cert.id || cert.certificateNo).trim().toUpperCase();
          const normalized: AssayCertificate = {
            ...cert,
            id: cleanId,
          };
          await dbService.saveCertificate(normalized);
        }

        setImportSuccess(`تعداد ${farsiDigits(importedList.length)} شناسنامه با موفقیت وارد پایگاه داده گردید.`);
        await loadCertificates();
        
        setTimeout(() => {
          setImportSuccess('');
        }, 4000);
      } catch (err: any) {
        setImportError(err?.message || 'خطا در خواندن فایل پشتیبان.');
        setTimeout(() => {
          setImportError('');
        }, 5000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const resetForm = () => {
    setHallmarkId('');
    // Auto-generate a beautiful certificate number
    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    setCertificateNo(`ATC-2026-${randomSerial}`);
    setOwnerName('گالری طلا و جواهرآلات زرین');
    
    // Automatically retrieve current Shami date or default to 1405
    const today = new Date();
    // Simple mock converter for Persian year 1405
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `۰${month}` : `${month}`;
    const formattedDay = day < 10 ? `۰${day}` : `${day}`;
    setAssayDate(`۱۴۰۵/${formattedMonth}/${formattedDay}`);
    
    setMetalType('gold');
    setDeclaredPurity('۱۸ عیار (۷۵۰)');
    setTestedPurity('750.5');
    setWeight('12.5');
    setInspector('مسئول فنی و ناظر رسمی آزمایشگاه عیارسنجی عسکرنژاد');
    setStatus('approved');
    setItemType('ساخت');
    setLabBranch('آزمایشگاه عیار سنجی عسکرنژاد');
    setRemarks('آنالیز دقیق ساختاری و ذوب با متد کوپلاسیون رسمی عسکرنژاد.');
    setEditModeId(null);
    setFormError('');

    // Reset screenshot properties
    setSendSms(true);
    setShowGoldWeight_reg(true);
    setShowCustomerName(true);
    setShowWeight(true);
    setSampleRegistered('نمونه خاک شماره ۱');
    setShowSampleWeight(true);
    setShowActive(true);
    setShowGoldWeight(true);
    setShowPrepTime(true);
    setPrepTime('۲۴ ساعت کاری');
    setShowTitle(true);
    setTitleSelect('برگه رسمی آزمایش عیارسنجی طلا و نقره');
    setWageType('percentage');
    setWageAmount('۰.۵٪');
    setDocumentType('hallmark');
    setPacketNumber('');
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!hallmarkId.trim()) {
      setFormError('لطفاً شماره انگ طلا را وارد کنید.');
      return;
    }

    const cleanId = hallmarkId.trim().toUpperCase();

    // Verify if it exists when creating new (not editing)
    if (!editModeId) {
      const existing = await dbService.getCertificate(cleanId);
      if (existing) {
        setFormError(`کد انگ ${cleanId} از قبل در پایگاه داده وجود دارد.`);
        return;
      }
    }

    const testedPurityNum = typeof testedPurity === 'number' ? testedPurity : parseFloat(toEnglishDigits(testedPurity.toString())) || 0;
    const weightNum = typeof weight === 'number' ? weight : parseFloat(toEnglishDigits(weight.toString())) || 0;

    if (testedPurityNum <= 0 || weightNum <= 0) {
      setFormError('لطفاً عیار سنجیده شده و وزن کالا را به عنوان عدد معتبر وارد کنید.');
      return;
    }

    const newCert: AssayCertificate = {
      id: cleanId,
      certificateNo,
      ownerName,
      assayDate,
      metalType,
      declaredPurity,
      testedPurity: testedPurityNum,
      weight: weightNum,
      inspector,
      status,
      itemType,
      labBranch,
      qrValue: `https://askarnejad-gold.com/verify/${cleanId}`,
      remarks: remarks || undefined,

      // Screenshot-introduced variables
      sendSms,
      showGoldWeight_reg,
      showCustomerName,
      showWeight,
      sampleRegistered,
      showSampleWeight,
      showActive,
      showGoldWeight,
      showPrepTime,
      prepTime,
      showTitle,
      titleSelect,
      wageType,
      wageAmount,
      documentType,
      packetNumber
    };

    try {
      await dbService.saveCertificate(newCert);
      setFormSuccess(editModeId ? 'اطلاعات گواهی با موفقیت بروزرسانی شد.' : 'اطلاعات طلای تست شده با موفقیت در دیتابیس ذخیره شد.');
      await loadCertificates();
      
      setTimeout(() => {
        setFormSuccess('');
        resetForm();
      }, 2000);
    } catch (e) {
      setFormError('خطا در ذخیره اطلاعات. لطفا دوباره تلاش کنید.');
    }
  };

  const handleEdit = (cert: AssayCertificate) => {
    setEditModeId(cert.id);
    setHallmarkId(cert.id);
    setCertificateNo(cert.certificateNo);
    setOwnerName(cert.ownerName);
    setAssayDate(cert.assayDate);
    setMetalType(cert.metalType);
    setDeclaredPurity(cert.declaredPurity);
    setTestedPurity(cert.testedPurity.toString());
    setWeight(cert.weight.toString());
    setInspector(cert.inspector);
    setStatus(cert.status);
    setItemType(cert.itemType);
    setLabBranch(cert.labBranch);
    setRemarks(cert.remarks || '');

    // Set interactive options with elegant defaults
    setSendSms(cert.sendSms ?? true);
    setShowGoldWeight_reg(cert.showGoldWeight_reg ?? true);
    setShowCustomerName(cert.showCustomerName ?? true);
    setShowWeight(cert.showWeight ?? true);
    setSampleRegistered(cert.sampleRegistered ?? 'نمونه خاک شماره ۱');
    setShowSampleWeight(cert.showSampleWeight ?? true);
    setShowActive(cert.showActive ?? true);
    setShowGoldWeight(cert.showGoldWeight ?? true);
    setShowPrepTime(cert.showPrepTime ?? true);
    setPrepTime(cert.prepTime ?? '۲۴ ساعت کاری');
    setShowTitle(cert.showTitle ?? true);
    setTitleSelect(cert.titleSelect ?? 'برگه رسمی آزمایش عیارسنجی طلا و نقره');
    setWageType(cert.wageType ?? 'percentage');
    setWageAmount(cert.wageAmount ?? '۰.۵٪');
    setDocumentType(cert.documentType ?? 'hallmark');
    setPacketNumber(cert.packetNumber ?? '');

    // Scroll form into view
    document.getElementById('admin-form-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`آیا از حذف دائم اطلاعات کد انگ ${id} از دیتابیس مراجعین آزمایشگاه اطمینان دارید؟`)) {
      try {
        await dbService.deleteCertificate(id);
        await loadCertificates();
      } catch (e) {
        console.error('Failed to delete', e);
      }
    }
  };

  const exportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(certificates, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `askarnejad_database_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Numerals Normalizers for seamless search across Persian and Western digits
  const toEnglishDigits = (s: string) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  const toFarsiDigits = (s: string) => s.replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);

  const filteredCerts = certificates.filter(cert => {
    if (!searchQuery.trim()) return true;
    const qLower = searchQuery.toLowerCase();
    const qEng = toEnglishDigits(qLower);
    const qFar = toFarsiDigits(qLower);

    const matches = (target: string) => {
      const tLower = target.toLowerCase();
      return tLower.includes(qLower) || tLower.includes(qEng) || tLower.includes(qFar);
    };

    return (
      matches(cert.id) ||
      matches(cert.ownerName) ||
      matches(cert.itemType) ||
      matches(cert.certificateNo) ||
      matches(cert.assayDate)
    );
  });

  // Match and highlight search term in text returning safe JSX
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return <span>{text}</span>;

    const qLower = query.toLowerCase();
    const qEng = toEnglishDigits(qLower);
    const qFar = toFarsiDigits(qLower);

    // Keep unique search terms and escape regex characters to prevent syntax issues
    const escapeRegex = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const terms = Array.from(new Set([qLower, qEng, qFar].filter(Boolean))).map(escapeRegex);
    
    if (terms.length === 0) return <span>{text}</span>;

    try {
      const regex = new RegExp(`(${terms.join('|')})`, 'gi');
      const parts = text.split(regex);
      
      return (
        <span>
          {parts.map((part, i) => {
            const isMatch = regex.test(part);
            return isMatch ? (
              <mark 
                key={i} 
                className="bg-[#d4af37]/30 text-[#fff] rounded px-0.5 font-bold border border-[#d4af37]/25 mx-0.5 select-all"
              >
                {part}
              </mark>
            ) : (
              <span key={i}>{part}</span>
            );
          })}
        </span>
      );
    } catch (e) {
      return <span>{text}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0c0f]/98 backdrop-blur-lg flex flex-col font-sans select-none" dir="rtl">
      
      {/* Decorative Golden Accent Lines */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#aa8c2c]" />

      {/* Header of the full screen portal */}
      <header className="bg-[#12141a]/95 border-b border-[#d4af37]/15 py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1d1f27] to-[#121316] border border-[#d4af37]/30 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <Database className="text-[#d4af37]" size={20} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-100">
              سامانه مدیریت آزمایشگاه عیارسنجی
            </h1>
            <p className="text-[10px] text-gray-400 font-medium">پورتال اختصاصی و امنیتی ثبت نتایج ری‌گیری طلا و نقره</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-2 rounded-lg bg-gray-950/80 hover:bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all cursor-pointer"
          title="بازگشت به سایت اصلی"
        >
          <X size={20} />
        </button>
      </header>

      {/* 1. AUTHENTICATION PROTECTION VIEW */}
      {!isAuthenticated ? (
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md glass-panel relative p-8 rounded-3xl border border-[#d4af37]/25 bg-[#12141a]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#d4af37]/5 blur-[45px]" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-[#aa8c2c]/5 blur-[45px]" />

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="text-[#d4af37] animate-pulse" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-100">درگاه ورود امنیتی مدیریت</h2>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                این بخش انحصاراً در اختیار مدیریت و ناظر فنی آزمایشگاه جهت ثبت اسناد و پاسخ عیارسنجی می‌باشد.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs text-gray-400 block pr-1 font-bold">نام کاربری مدیریت:</label>
                <div className="relative flex items-center">
                  <span className="absolute right-3.5 text-[#d4af37]">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="نام کاربری (admin)"
                    className="w-full pl-4 pr-10 py-3 bg-[#181a22] border border-[#d4af37]/15 hover:border-[#d4af37]/35 focus:border-[#d4af37] rounded-xl text-center font-bold text-gray-100 placeholder-gray-600 focus:outline-none transition-all select-text font-sans text-sm"
                    dir="ltr"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5 text-right">
                <label className="text-xs text-gray-400 block pr-1 font-bold">کلمه عبور امنیتی:</label>
                <div className="relative flex items-center">
                  <span className="absolute right-3.5 text-[#d4af37]">
                    <Key size={16} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور مدیریت"
                    className="w-full pl-4 pr-10 py-3 bg-[#181a22] border border-[#d4af37]/15 hover:border-[#d4af37]/35 focus:border-[#d4af37] rounded-xl text-center font-bold tracking-widest text-gray-100 placeholder-gray-650 focus:outline-none transition-all select-text text-sm"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Login credentials screen cleared of plain sight hints for security */}

              {loginError && (
                <div className="p-3 bg-red-950/40 border border-red-900/35 text-red-300 text-xs rounded-xl flex items-center gap-2">
                  <X size={14} className="flex-shrink-0" />
                  <p className="flex-grow text-right">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#f5df99] via-[#d4af37] to-[#aa8c2c] text-[#0d0f12] font-extrabold py-3 rounded-xl cursor-pointer hover:from-[#fcf0c2] hover:via-[#e6c148] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 text-xs font-sans"
              >
                <ShieldCheck size={16} />
                تایید اعتبار و ورود امن
              </button>
            </form>
          </div>
        </div>
      ) : (
        
        // 2. MAIN ADMIN DASHBOARD INTERFACE
        <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* LEFT SIDE/PANEL (Inputs FORM): Coordinates 5 of 12 width on Large view */}
          <div className="lg:col-span-5 space-y-6" id="admin-form-container">
            
            {/* Form Glass Card */}
            <div className="glass-panel p-6 border border-[#d4af37]/25 rounded-2xl bg-[#12141a]/90 space-y-5 relative">
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#d4af37]/10 blur-[50px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-gray-850 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-gray-100 flex items-center gap-2">
                  <Plus className="text-[#d4af37]" size={16} />
                  {editModeId ? 'ویرایش شناسنامه فنی انگ' : 'ثبت اطلاعات انگ آزمایشگاهی جدید'}
                </h3>
                <button 
                  type="button"
                  onClick={resetForm} 
                  className="text-[11px] text-gray-500 hover:text-[#d4af37] font-semibold border border-transparent hover:border-[#d4af37]/20 px-2.5 py-1 rounded-lg transition-all"
                >
                  پاک کردن فرم
                </button>
              </div>

              <form onSubmit={handleAddCertificate} className="space-y-6">
                
                {/* 1. MAIN SPECIFICATION SECTION */}
                <div className="space-y-4 bg-[#111319]/40 p-4 rounded-2xl border border-gray-800/50">
                  <div className="text-xs text-[#d4af37] font-bold pb-1 flex items-center gap-1.5 border-b border-gray-800/60 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    ثبت مشخصات و اطلاعات پایه
                  </div>
                  
                  {/* Hallmark ID */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 block pr-0.5 font-bold">شماره انگ (مهر قطعه):</label>
                    <input
                      type="text"
                      value={hallmarkId}
                      onChange={(e) => setHallmarkId(e.target.value)}
                      placeholder="مثال: A820, T920"
                      className="w-full px-3 py-2 bg-[#161820] border border-gray-800 focus:border-[#d4af37] rounded-xl text-gray-100 font-bold tracking-wider text-center focus:outline-none transition-all placeholder-gray-700 select-text text-sm"
                      dir="ltr"
                      disabled={!!editModeId}
                    />
                    {editModeId && <span className="text-[9px] text-gray-500 block pr-1">شماره انگ غیرقابل تغییر است.</span>}
                  </div>

                  {/* Customer Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 block pr-0.5 font-bold">نام مشتری:</label>
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="مثال: گالری طلا عسکرنژاد"
                      className="w-full px-3 py-2 bg-[#161820] border border-gray-800 focus:border-[#d4af37] rounded-xl text-gray-250 text-xs focus:outline-none transition-all select-text font-bold"
                    />
                  </div>

                  {/* Lab Name (Constant) */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 block pr-0.5 font-bold">نام آزمایشگاه (ثابت):</label>
                    <input
                      type="text"
                      value="آزمایشگاه عیار سنجی عسکرنژاد"
                      disabled
                      className="w-full px-3 py-2 bg-[#111216] border border-gray-850 rounded-xl text-gray-500 text-xs font-bold focus:outline-none"
                    />
                  </div>

                  {/* Type Select Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 block pr-0.5 font-bold">نوع قطعه / کلا:</label>
                    <select
                      value={itemType}
                      onChange={(e) => {
                        const val = e.target.value;
                        setItemType(val);
                        if (val === 'نقره') {
                          setMetalType('silver');
                          setDeclaredPurity('نقره استرلینگ (۹۲۵)');
                          setTestedPurity('925.0');
                        } else {
                          setMetalType('gold');
                          setDeclaredPurity('۱۸ عیار (۷۵۰)');
                          setTestedPurity('750.5');
                        }
                      }}
                      className="w-full px-2.5 py-2 bg-[#161820] border border-gray-800 focus:border-[#d4af37] rounded-xl text-gray-200 text-xs focus:outline-none transition-all cursor-pointer font-bold"
                    >
                      <option value="ساخت">🛠️ ساخت</option>
                      <option value="متفرقه">⚜️ متفرقه</option>
                      <option value="شمش">🧱 شمش</option>
                      <option value="سکه">🪙 سکه</option>
                      <option value="آبشده">💧 آبشده</option>
                      <option value="نقره">🥈 نقره</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-sans">
                    {/* Tested Purity */}
                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-gray-400 block pr-0.5 font-bold">عیار طلا / خلوص:</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={testedPurity}
                        onChange={(e) => setTestedPurity(e.target.value)}
                        placeholder="عیار (مثال: ۷۵۰.۵)"
                        className="w-full px-3 py-2 bg-[#161820] border border-gray-800 focus:border-[#d4af37] rounded-xl text-[#d4af37] font-mono font-bold text-xs text-center focus:outline-none transition-all select-text"
                        dir="ltr"
                      />
                    </div>

                    {/* Weight (Sample Weight) */}
                    <div className="space-y-1 text-right">
                      <label className="text-[10px] text-gray-400 block pr-0.5 font-bold">وزن نمونه (گرم):</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="وزن (مثال: ۱۲.۵)"
                        className="w-full px-3 py-2 bg-[#161820] border border-gray-800 focus:border-[#d4af37] rounded-xl text-gray-100 font-mono font-bold text-xs text-center focus:outline-none transition-all select-text"
                        dir="ltr"
                      />
                    </div>
                  </div>

                </div>

                {/* Status Logs */}
                {formError && (
                  <div className="p-3 bg-red-950/30 border border-red-900/40 text-red-300 text-xs rounded-xl flex items-center gap-2">
                    <X size={14} className="flex-shrink-0" />
                    <p className="flex-grow text-right">{formError}</p>
                  </div>
                )}
                
                {formSuccess && (
                  <div className="p-3 bg-green-950/30 border border-green-900/40 text-green-300 text-xs rounded-xl flex items-center gap-2">
                    <ShieldCheck size={14} className="flex-shrink-0 text-green-400" />
                    <p className="flex-grow text-right text-green-200">{formSuccess}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#aa8c2c] text-black font-semibold py-3 rounded-xl cursor-pointer hover:from-[#fff] transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.15)] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-sans"
                >
                  {editModeId ? (
                    <>
                      <Check size={16} />
                      ذخیره تغییرات گواهی
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      ثبت شماره انگ و الصاق به دیتابیس آنلاین
                    </>
                  )}
                </button>

              </form>
            </div>
            
          </div>

          {/* RIGHT SIDE (Active Database Tables): Coordinates 7 of 12 width */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Database stats box */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#12141a]/90 border border-[#d4af37]/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-gray-500 block">کل انگ‌های ثبت شده:</span>
                <span className="text-xl font-bold font-mono text-[#d4af37] block mt-1">{farsiDigits(certificates.length)}</span>
              </div>
              <div className="bg-[#12141a]/90 border border-[#d4af37]/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-gray-500 block">طلای تایید شده (Approved):</span>
                <span className="text-xl font-bold font-mono text-green-400 block mt-1">
                  {farsiDigits(certificates.filter(c => c.metalType === 'gold' && c.status === 'approved').length)}
                </span>
              </div>
              <div className="bg-[#12141a]/90 border border-[#d4af37]/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-gray-500 block">نقره تایید شده (Silver):</span>
                <span className="text-xl font-bold font-mono text-blue-400 block mt-1">
                  {farsiDigits(certificates.filter(c => c.metalType === 'silver' && c.status === 'approved').length)}
                </span>
              </div>
            </div>

            {/* List Table Glass Panel */}
            <div className="glass-panel p-6 border border-gray-900 rounded-2xl bg-[#12141a]/90 flex-grow flex flex-col min-w-0">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-850 pb-4 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-100 flex items-center gap-1.5">
                    <Coins className="text-[#d4af37]" size={16} />
                    لیست و وضعیت اسناد پایگاه داده
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium">امکان حذف، ویرایش یا جسجتوی آنی در اطلاعات مراجعین</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportBackup}
                    accept=".json"
                    className="hidden"
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/25 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    <Upload size={12} />
                    ایمپورت دیتابیس (JSON)
                  </button>
                  <button 
                    type="button"
                    onClick={exportBackup}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-300 bg-gray-900 hover:bg-gray-850 border border-gray-800 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    <Download size={12} />
                    خروجی دیتابیس (JSON)
                  </button>
                </div>
              </div>

              {/* Import status logs */}
              {importSuccess && (
                <div className="mb-4 p-3 bg-green-950/30 border border-green-905 text-green-300 text-xs rounded-xl flex items-center gap-2 animate-[slideUp_0.2s_ease-out]">
                  <ShieldCheck size={14} className="flex-shrink-0 text-green-400" />
                  <p className="flex-grow text-right font-medium">{importSuccess}</p>
                </div>
              )}
              {importError && (
                <div className="mb-4 p-3 bg-red-950/35 border border-red-900/40 text-red-300 text-xs rounded-xl flex items-center gap-2 animate-[slideUp_0.2s_ease-out]">
                  <X size={14} className="flex-shrink-0 text-red-400" />
                  <p className="flex-grow text-right font-medium">{importError}</p>
                </div>
              )}

              {/* Fast Database Search Bar */}
              <div className="relative mb-4 flex items-center">
                <span className="absolute right-3.5 text-gray-500">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  placeholder="جستجو با کد انگ طلا، نام مالک، نوع قطعه..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-[#181a22] border border-gray-800 hover:border-gray-755 focus:border-[#d4af37] rounded-xl text-xs text-gray-200 focus:outline-none transition-all placeholder-gray-600 select-text"
                />
              </div>

              {/* List container */}
              <div className="flex-grow overflow-x-auto min-h-[300px] overflow-y-auto max-h-[500px] space-y-3.5 select-all pr-1">
                {filteredCerts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 space-y-2">
                    <FileText size={32} className="text-gray-700" />
                    <p className="text-xs text-gray-500 font-medium">هیچ سندی با معیارهای جستجو در پایگاه داده پیدا نشد.</p>
                  </div>
                ) : (
                  filteredCerts.map((cert) => (
                    <div 
                      key={cert.id}
                      className="group relative flex items-center justify-between p-4 rounded-xl bg-[#181a22] border border-gray-900 hover:border-[#d4af37]/20 transition-all duration-300 min-w-0"
                    >
                      {/* Left Side (in RTL): Action buttons for delete & edit */}
                      <div className="flex items-center gap-2 flex-shrink-0 ml-1">
                        {deleteConfirmId === cert.id ? (
                          <div className="flex items-center gap-1.5 bg-red-950/40 border border-red-900/40 p-1 rounded-lg animate-pulse" onClick={(e) => e.stopPropagation()}>
                            <span className="text-[10px] text-red-400 font-bold px-1.5 font-sans">حذف؟</span>
                            <button
                              type="button"
                              onClick={async (e) => {
                                e.stopPropagation();
                                await dbService.deleteCertificate(cert.id);
                                await loadCertificates();
                                setDeleteConfirmId(null);
                              }}
                              className="w-6 h-6 rounded bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all cursor-pointer"
                              title="بله، حذف کن"
                            >
                              <Check size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(null);
                              }}
                              className="w-6 h-6 rounded bg-gray-900 hover:bg-gray-850 text-gray-400 flex items-center justify-center transition-all cursor-pointer"
                              title="لغو"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEdit(cert)}
                              className="w-8 h-8 rounded-lg outline-none border border-gray-800 hover:border-[#d4af37]/40 bg-gray-900/60 text-[#d4af37] flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                              title="ویرایش این سند"
                            >
                              <Edit size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(cert.id)}
                              className="w-8 h-8 rounded-lg outline-none border border-gray-800 hover:border-red-900 bg-gray-900/60 text-red-400 hover:text-red-500 flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                              title="حذف دائمی از دیتابیس"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Right Elements (Grouped safely inside RTL layout) */}
                      <div className="flex items-center gap-3.5 text-right min-w-0 flex-1 ml-3">
                        {/* Hallmark Code Circle Badge */}
                        <div className="w-12 h-12 flex-shrink-0 flex flex-col justify-center items-center rounded-xl bg-[#0d0e12] border border-[#d4af37]/20 group-hover:border-[#d4af37]/50 transition-colors">
                          <span className="text-[9px] text-[#d4af37] font-sans font-bold uppercase tracking-wider">انگ</span>
                          <span className="text-xs font-bold text-gray-100 font-sans tracking-wide">{highlightText(cert.id, searchQuery)}</span>
                        </div>

                        <div className="flex flex-col min-w-0 text-right space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-gray-200 truncate pr-0.5">{highlightText(cert.ownerName, searchQuery)}</span>
                            {cert.metalType === 'gold' ? (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#ffd700]/10 text-[#d4af37] border border-[#ffd700]/15 font-bold font-sans">طلا</span>
                            ) : (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/10 text-blue-400 border border-blue-900/15 font-bold font-sans">نقره</span>
                            )}
                            {cert.status === 'approved' && (
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-950 text-green-400 font-bold">عیار تأییدشده</span>
                            )}
                          </div>
                          
                          <span className="text-[10px] text-gray-400 block truncate">{highlightText(cert.itemType, searchQuery)} | {farsiDigits(cert.weight)} گرم • عیار آزمایشگاه: <span className="font-sans font-semibold text-[#d4af37]">{cert.testedPurity}</span></span>
                          <span className="text-[9px] text-gray-600 block font-mono">سند: {highlightText(cert.certificateNo, searchQuery)} | تاریخ: {highlightText(cert.assayDate, searchQuery)}</span>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Quick action logout option */}
            <div className="flex justify-between items-center text-xs text-gray-600 bg-gray-950/20 p-4 border border-gray-900 rounded-2xl">
              <span>مدیریت فعال: پورتال ناظر فنی آزمایشگاه</span>
              <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-950 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-all font-semibold cursor-pointer"
              >
                <LogOut size={12} />
                خروج امن مأمور فنی
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
