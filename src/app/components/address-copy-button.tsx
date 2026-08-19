"use client";

import { useEffect, useRef, useState } from "react";

const VENUE_ADDRESS = "서울특별시 종로구 대학로 57";

export default function AddressCopyButton() {
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
    }, 1800);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VENUE_ADDRESS);
      showToast("클립보드에 복사되었습니다");
    } catch {
      showToast("주소를 복사하지 못했습니다");
    }
  };

  return (
    <>
      <button
        className="invitation__address"
        type="button"
        onClick={copyAddress}
        aria-label={`${VENUE_ADDRESS} 복사`}
      >
        홍익대학교 대학로 아트센터 B2 갤러리 3
      </button>

      {toastMessage && (
        <div className="invitation__toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
