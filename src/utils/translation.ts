import _each from 'lodash/each';
import { i18n } from 'boot/i18n';

export function translate(key: string | null | undefined) {
  const { locale, t } = i18n.global;
  return key ? t(key, key, { locale }) : '';
}

export function translateInEn(key: string | null | undefined) {
  const { t } = i18n.global;
  return key ? t(key, key, { locale: 'en' }) : '';
}

export function searchInLocales(key: string, term: string): boolean {
  const { availableLocales, t } = i18n.global;
  let found = false;
  _each(availableLocales, (locale: string) => {
    if (t(key, key, { locale }) === term) {
      found = true;
    }
  });

  return found;
}
