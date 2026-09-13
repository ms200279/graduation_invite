import type {
  InvitationPanelData,
  PanelId,
} from "../data/invitation";
import { LIQUID_GLASS_SETTINGS } from "../config/liquid-glass";
import LiquidGlass from "./liquid-glass";
import PanelContent from "./panel-content";

type InvitationPanelProps = {
  panel: InvitationPanelData;
  isActive: boolean;
  isDisabled: boolean;
  onOpen: (panelId: PanelId) => void;
};

export default function InvitationPanel({
  panel,
  isActive,
  isDisabled,
  onOpen,
}: InvitationPanelProps) {
  const contentId = `${panel.id}-panel`;

  return (
    <LiquidGlass
      className={`invitation__panel-button invitation__panel-button--${panel.id}`}
      data-active={isActive ? "true" : "false"}
      data-mobile-scroll={panel.mobileScrollable ? "true" : undefined}
      filterBuffer={
        isActive
          ? LIQUID_GLASS_SETTINGS.expandedBuffer
          : LIQUID_GLASS_SETTINGS.collapsedBuffer
      }
    >
      <button
        className="invitation__panel-trigger"
        type="button"
        aria-expanded={isActive}
        aria-controls={contentId}
        disabled={isDisabled}
        onClick={() => onOpen(panel.id)}
      >
        <span className="invitation__panel-label">{panel.label}</span>
      </button>

      <span
        className="invitation__panel-content"
        id={contentId}
        aria-hidden={!isActive}
        inert={!isActive}
      >
        <span className="invitation__panel-title">{panel.title}</span>
        <PanelContent panelId={panel.id} />
      </span>
    </LiquidGlass>
  );
}
