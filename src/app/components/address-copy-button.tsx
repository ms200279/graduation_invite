"use client";

import { VENUE } from "../data/invitation";
import { useClipboardToast } from "../hooks/use-clipboard-toast";

export default function AddressCopyButton() {
  const { toastMessage, showToast } = useClipboardToast();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VENUE.address);
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
        aria-label={`${VENUE.address} 복사`}
      >
        <span>
          {VENUE.name} {VENUE.floor}
        </span>
        <svg
          className="invitation__copy-icon"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <rect x="5.25" y="5.25" width="8" height="8" rx="1.5" />
          <path d="M10.75 5.25V4A1.25 1.25 0 0 0 9.5 2.75H4A1.25 1.25 0 0 0 2.75 4v5.5A1.25 1.25 0 0 0 4 10.75h1.25" />
        </svg>
      </button>

      {toastMessage && (
        <div className="invitation__toast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
