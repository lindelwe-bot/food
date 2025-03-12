export type LanguageCode = 'en' | 'sn' | 'nd' | 'tn' | 'ny' | 've' | 'ts' | 'kck' | 'xh' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ar' | 'hi' | 'sw';

export const languageNames: Record<LanguageCode, string> = {
  en: 'English',
  sn: 'Shona',
  nd: 'Ndebele',
  tn: 'Tonga',
  ny: 'Chewa',
  ve: 'Venda',
  ts: 'Tsonga',
  kck: 'Kalanga',
  xh: 'Xhosa',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ar: 'العربية',
  hi: 'हिन्दी',
  sw: 'Kiswahili'
};

import en from '../translations/en';
import es from '../translations/es';
import sn from '../translations/sn';
import nd from '../translations/nd';

const translations: Record<LanguageCode, typeof en> = {
  en,
  sn,
  nd,
  tn: sn,
  ny: sn,
  ve: sn,
  ts: sn,
  kck: sn,
  xh: sn,
  es,
  fr: en,
  de: en,
  it: en,
  pt: en,
  ru: en,
  zh: en,
  ja: en,
  ar: en,
  hi: en,
  sw: en
};

export default translations; 