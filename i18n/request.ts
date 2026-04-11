import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '../i18n';

// ✅ Static imports
import en from '../messages/en.json';
import fr from '../messages/fr.json';

const messagesMap = {
  en,
  fr
};

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale =
    locale && locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: messagesMap[resolvedLocale as keyof typeof messagesMap]
  };
});

