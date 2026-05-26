import { AssayCertificate, ServiceItem } from './types';

export const mockCertificates: Record<string, AssayCertificate> = {
  'A820': {
    id: 'A820',
    certificateNo: 'ATC-2026-8207',
    ownerName: 'گالری طلای استاندارد طهران',
    assayDate: '۱۴۰۵/۰۲/۱۵',
    metalType: 'gold',
    declaredPurity: '۱۸ عیار (۷۵۰)',
    testedPurity: 750.8,
    weight: 24.35,
    inspector: 'ناظر فنی و مسئول کنترل آزمایشگاهی عسکرنژاد',
    status: 'approved',
    itemType: 'ساخت',
    labBranch: 'آزمایشگاه عیار سنجی عسکرنژاد',
    qrValue: 'https://standard-gold-assay.com/cert/ATC-2026-8207',
    remarks: 'فاقد ناخالصی مس و کادمیوم زیاد، ساختار همگن عالی عسکرنژاد.'
  },
  'G750': {
    id: 'G750',
    certificateNo: 'ATC-2026-3194',
    ownerName: 'صنایع دستی زرین مهر',
    assayDate: '۱۴۰۵/۰۳/۰۲',
    metalType: 'gold',
    declaredPurity: '۱۸ عیار (۷۵۰)',
    testedPurity: 750.2,
    weight: 48.12,
    inspector: 'ناظر فنی و مسئول کنترل آزمایشگاهی عسکرنژاد',
    status: 'approved',
    itemType: 'متفرقه',
    labBranch: 'آزمایشگاه عیار سنجی عسکرنژاد',
    qrValue: 'https://standard-gold-assay.com/cert/ATC-2026-3194',
    remarks: 'عیار سنجیده شده با روش ذوب کاملاً منطبق بر استاندارد ملی ۲۶ عسکرنژاد.'
  },
  '999': {
    id: '999',
    certificateNo: 'ATC-2026-9991',
    ownerName: 'شمش ایران زمین',
    assayDate: '۱۴۰۵/۰۱/۲۸',
    metalType: 'gold',
    declaredPurity: '۲۴ عیار (۹۹۹)',
    testedPurity: 999.3,
    weight: 100.00,
    inspector: 'ناظر فنی و مسئول کنترل آزمایشگاهی عسکرنژاد',
    status: 'approved',
    itemType: 'شمش',
    labBranch: 'آزمایشگاه عیار سنجی عسکرنژاد',
    qrValue: 'https://standard-gold-assay.com/cert/ATC-2026-9991',
    remarks: 'صد در صد خالص مناسب انواع ذخایر بانکی و سرمایه‌گذاری.'
  },
  'S925': {
    id: 'S925',
    certificateNo: 'ATC-2026-7241',
    ownerName: 'نقره‌سرای ملل',
    assayDate: '۱۴۰۵/۰۲/۲۰',
    metalType: 'silver',
    declaredPurity: 'نقره استرلینگ (۹۲۵)',
    testedPurity: 925.6,
    weight: 85.60,
    inspector: 'ناظر فنی و مسئول کنترل آزمایشگاهی عسکرنژاد',
    status: 'approved',
    itemType: 'نقره',
    labBranch: 'آزمایشگاه عیار سنجی عسکرنژاد',
    qrValue: 'https://standard-gold-assay.com/cert/ATC-2026-7241',
    remarks: 'سنجش با دستگاه XRF پیشرفته، خلوص نقره تایید شد.'
  }
};

export const servicesData: ServiceItem[] = [
  {
    id: 'cupellation',
    title: 'عیارسنجی دقیق (کوپلاسیون)',
    iconName: 'Scale',
    accuracyTag: '۹۹.۹۹٪ دقت آزمایشگاهی',
    progressPercentage: 100,
    shortDesc: 'تعیین دقیق عیار طلا با استفاده از روش سنتی ری‌گیری و ذوب (کوپلاسیون) مطابق با استانداردهای ملی ایران.',
    fullDesc: 'روش کوپلاسیون (روش خاکستر کردن) استاندارد طلایی و بین‌المللی برای تعیین خلوص و عیار آلیاژهای طلا است. در آزمایشگاه معتمد این آزمون با کوره‌های کالیبره شده با بالاترین دقت انجام می‌شود تا معامله‌گران طلا با آرامش خاطر مبادله کنند.',
    timeEstimate: '۲ تا ۳ ساعت کار کاری'
  },
  {
    id: 'speed',
    title: ' سرعت بالا در ارائه نتایج',
    iconName: 'Timer',
    accuracyTag: 'سرویس اکسپرس و فوری',
    progressPercentage: 85,
    shortDesc: 'فرایند سریع بررسی مقدماتی عیارسنجی با دستگاه‌های پیشرفته XRF بدون کوچک‌ترین تاخیر برای تجار گرامی.',
    fullDesc: 'زمان برای فعالان صنف طلا و نقره حکم پول را دارد. از این رو ما در آزمایشگاه، با فرآیندهای بهینه‌سازی شده و سیستم صف هوشمند، تلاش می‌کنیم تا نتایج اولیه عیارسنجی را ظرف کوتاه‌ترین زمان ممکن ارائه دهیم.',
    timeEstimate: '۳۰ تا ۴۵ دقیقه'
  },
  {
    id: 'accuracy',
    title: 'دقت عالی دستگاه‌های مدرن',
    iconName: 'Microscope',
    accuracyTag: 'کالیبراسیون تخصصی روزانه',
    progressPercentage: 95,
    shortDesc: 'بهره‌گیری از به‌روزترین اسپکترومترهای اسکن اشعه ایکس (XRF) جهت آنالیز غیرمخرب جواهرات زینتی.',
    fullDesc: 'آنالیز اشعه ایکس (XRF) به ما اجازه می‌دهد بدون نیاز به نمونه‌برداری فیزیکی یا تراشیدن قطعه، تمام عناصر تشکیل دهنده یک آلیاژ طلا یا نقره (شامل نقره، مس، روی، نیکل و پالادیوم) را در کمتر از چند دقیقه با ممیزی دیجیتالی استخراج کنیم.',
    timeEstimate: '۱۰ دقیقه'
  },
  {
    id: 'transparency',
    title: 'شفافیت کامل فرایندها',
    iconName: 'Sparkles',
    accuracyTag: 'راستی‌آزمایی آنلاین و فیزیکی',
    progressPercentage: 90,
    shortDesc: 'ثبت و آرشیو نتایج عیارسنجی و قابلیت استعلام همزمان کدهای اختصاصی (انگ) در پورتال آنلاین مشتریان.',
    fullDesc: 'تمام کدهای بررسی شده (انگ) همراه با اطلاعات فیزیکی کالا، وزن رسمی و تصویر نمونه در بانک داده مرکزی ذخیره می‌گردند. هر فردی در هر زمان می‌تواند با اسکن بارکد یا درج شماره انگ فیزیکی از صحت گواهی صادره آگاه شود.',
    timeEstimate: 'آنی (سراسری)'
  },
  {
    id: 'consultation',
    title: 'مشاوره تخصصی و عارضه یابی',
    iconName: 'MessageCircle',
    accuracyTag: 'رایگان برای مراجعین رسمی',
    progressPercentage: 75,
    shortDesc: 'مشاوره فنی در خصوص فرمولاسیون آلیاژها و عیب‌یابی ریخته‌گری مصنوعات طلا و نقره جهت بهبود کیفیت ساخت.',
    fullDesc: 'آیا دستبند یا انگشترهای ساخته شده شما در خط تولید کدر می‌شوند یا عیار نهایی آن‌ها یکنواخت نیست؟ کارشناسان متالورژی ما در بخش مشاوره، عارضه یابی دقیق شمش‌های پایه و فرمول آلیاژسازها را برای کارگاه شما انجام می‌دهند.',
    timeEstimate: 'نیاز به هماهنگی قبلی'
  }
];

export const farsiDigits = (num: number | string): string => {
  const farsiNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/[0-9]/g, (w) => farsiNums[parseInt(w, 10)]);
};

export function generateDynamicCertificate(query: string): AssayCertificate {
  // Normalize the query digits or letters
  const cleanQuery = query.trim().toUpperCase();
  // We pseudo-randomly generate details based on the query to feel completely realistic and beautiful!
  let hash = 0;
  for (let i = 0; i < cleanQuery.length; i++) {
    hash = cleanQuery.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const isGold = hash % 2 === 0;
  const puritiesGold = [750.3, 750.6, 751.1, 750.0, 999.1, 916.4];
  const declaredGoldLabels = ['۱۸ عیار (۷۵۰)', '۱۸ عیار (۷۵۰)', '۱۸ عیار (۷۵۰)', '۱۸ عیار (۷۵۰)', '۲۴ عیار (۹۹۹)', '۲۲ عیار (۹۱۶)'];
  const puritiesSilver = [925.3, 925.8, 999.0, 840.4];
  const declaredSilverLabels = ['نقره استرلینگ (۹۲۵)', 'نقره استرلینگ (۹۲۵)', 'نقره خالص (۹۹۹)', 'نقره عیار پایین (۸۴۰)'];
  
  const purityIdx = Math.abs(hash) % (isGold ? puritiesGold.length : puritiesSilver.length);
  const testedPurity = isGold ? puritiesGold[purityIdx] : puritiesSilver[purityIdx];
  const declaredPurity = isGold ? declaredGoldLabels[purityIdx] : declaredSilverLabels[purityIdx];
  
  const weight = Number((5 + Math.abs(hash % 95) + Math.abs((hash >> 2) % 100) / 100).toFixed(2));
  const inspector = 'مسئول فنی و ناظر رسمی آزمایشگاه عیارسنجی عسکرنژاد';
  
  const itemType = isGold ? 'ساخت' : 'نقره';
    
  // Days ago calculation to make dates feel fresh but dynamic
  const month = (Math.abs(hash >> 5) % 3) + 1;
  const day = (Math.abs(hash >> 6) % 28) + 1;
  const assayDate = `۱۴۰۵/۰${month}/${day < 10 ? '۰' + day : day}`;
  
  return {
    id: cleanQuery,
    certificateNo: `ATC-2026-${Math.abs(hash % 9000) + 1000}`,
    ownerName: `کارگاه طلا و جواهرسازی زرین طهران`,
    assayDate,
    metalType: isGold ? 'gold' : 'silver',
    declaredPurity,
    testedPurity,
    weight,
    inspector,
    status: 'approved',
    itemType,
    labBranch: 'آزمایشگاه عیار سنجی عسکرنژاد',
    qrValue: `https://standard-gold-verify.com/verify/${cleanQuery}`,
    remarks: 'آنالیز ساختار فیزیکی اتمی با روش سنجش کوپلاسیون طلا و تایید کامل عیار درج شده فیزیکی.'
  };
}
