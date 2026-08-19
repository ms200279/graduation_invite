"use client";

import { useEffect, useState } from "react";
import { INVITATION_PANELS, type PanelId } from "../data/invitation";
import LiquidGlass from "./liquid-glass";
import PanelContent from "./panel-content";

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
            <LiquidGlass
              className={`invitation__panel-button invitation__panel-button--${panel.id}`}
              key={panel.id}
              data-active={isActive ? "true" : "false"}
              depth={8}
              strength={24}
              chromaticAberration={0.5}
              filterBuffer={isActive ? 20 : 0}
            >
              <button
                className="invitation__panel-trigger"
                type="button"
                aria-expanded={isActive}
                aria-controls={`${panel.id}-panel`}
                disabled={isDisabled}
                onClick={() => setActivePanel(panel.id)}
              >
                <span className="invitation__panel-label">{panel.label}</span>
              </button>

              <span
                className="invitation__panel-content"
                id={`${panel.id}-panel`}
                aria-hidden={!isActive}
              >
                <span className="invitation__panel-title">{panel.title}</span>
                <PanelContent panelId={panel.id} />
              </span>
            </LiquidGlass>
          );
        })}
      </nav>
    </>
  );
}
