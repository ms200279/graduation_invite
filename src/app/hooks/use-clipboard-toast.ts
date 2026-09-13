"use client";

import { useEffect, useRef, useState } from "react";

const TOAST_DURATION = 2200;

export function useClipboardToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, TOAST_DURATION);
  };

  return { toastMessage, showToast };
}
