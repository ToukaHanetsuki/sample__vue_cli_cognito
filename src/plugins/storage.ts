import Cookies, { CookieAttributes } from 'js-cookie';

export const Storage = {

  get(key: string): string|undefined {
    return Cookies.get(key);
  },

  remove(key: string, options?: CookieAttributes): void {
    Cookies.remove(key, options);
  },

  set(key: string, value: string|Record<string, unknown>, options?: CookieAttributes): void {
    Cookies.set(key, value, options);
  }
};