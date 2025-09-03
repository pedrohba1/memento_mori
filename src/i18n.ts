import en from './locales/en/common.json';
import pt from './locales/pt/common.json';
import { useRouter } from 'next/navigation';

const LOCALES: { [key: string]: { [key: string]: any } } = {
  en,
  pt,
};

export const useI18n = () => {
  const router = useRouter();
  const locale = ((router as any).locale ?? 'en') as string;
  const localeCode = locale.split('-')[0] || locale;
  const messages = LOCALES[locale] ?? LOCALES[localeCode] ?? en;

  const t = (path: string, vars?: Record<string, any>) => {
    const parts = path.split('.');
    let value: any = messages;
    for (const p of parts) {
      if (value == null) break;
      value = value[p];
    }
    let str = typeof value === 'string' ? value : path;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        const placeholder = `{${k}}`;
        str = str.split(placeholder).join(String(v));
      });
    }
    return str;
  };

  return { t, locale };
};
