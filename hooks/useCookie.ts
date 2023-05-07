import { useState, useEffect } from "react";

export const useCookie = (name: string) => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (cookieName: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${cookieName}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
      }
      return null;
    };

    const retrievedCookieValue = getCookie(name);
    if (retrievedCookieValue !== undefined) {
      setCookieValue(retrievedCookieValue);
    }
  }, [name]);

  return cookieValue;
};
