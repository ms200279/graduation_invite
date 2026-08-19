import type {
  InvitationPanelData,
  PanelId,
} from "../data/invitation";
import LiquidGlass from "./liquid-glass";
import PanelContent from "./panel-content";

type InvitationPanelProps = {
  panel: InvitationPanelData;
  isActive: boolean;
  isDisabled: boolean;
  onOpen: (panelId: PanelId) => void;
};

const GLASS_SETTINGS = {
  depth: 8,
  strength: 24,
  chromaticAberration: 0.5,
  expandedBuffer: 20,
} as const;

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
      depth={GLASS_SETTINGS.depth}
      strength={GLASS_SETTINGS.strength}
      chromaticAberration={GLASS_SETTINGS.chromaticAberration}
      filterBuffer={isActive ? GLASS_SETTINGS.expandedBuffer : 0}
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
      >
        <span className="invitation__panel-title">{panel.title}</span>
        <PanelContent panelId={panel.id} />
      </span>
    </LiquidGlass>
  );
}
