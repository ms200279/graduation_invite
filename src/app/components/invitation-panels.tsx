"use client";

import { useEffect, useState } from "react";
import { INVITATION_PANELS, type PanelId } from "../data/invitation";
import InvitationPanel from "./invitation-panel";

export default function InvitationPanels() {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      {activePanel && (
        <button
          className="invitation__panel-backdrop"
          type="button"
          aria-label="안내 닫기"
          onClick={() => setActivePanel(null)}
        />
      )}

      <nav
        className="invitation__navigation"
        aria-label="전시 안내"
        data-expanded={activePanel ? "true" : "false"}
      >
        {INVITATION_PANELS.map((panel) => {
          const isActive = activePanel === panel.id;
          const isDisabled = activePanel !== null && !isActive;

          return (
            <InvitationPanel
              key={panel.id}
              panel={panel}
              isActive={isActive}
              isDisabled={isDisabled}
              onOpen={setActivePanel}
            />
          );
        })}
      </nav>
    </>
  );
}
