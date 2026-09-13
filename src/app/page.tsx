import AddressCopyButton from "./components/address-copy-button";
import InvitationPanels from "./components/invitation-panels";
import { INVITATION_HERO } from "./data/invitation";

export default function Home() {
  return (
    <main className="invitation">
      <video
        className="invitation__background"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/mbg.webm" type="video/webm" />
      </video>

      <section className="invitation__content">
        <p className="invitation__eyebrow">
          {INVITATION_HERO.institution}
          <br />
          {INVITATION_HERO.exhibition}
        </p>

        <div className="invitation__title-group">
          <h1>{INVITATION_HERO.title}</h1>
          <p>{INVITATION_HERO.subtitle}</p>
        </div>

        <div className="invitation__details">
          <p>{INVITATION_HERO.dates}</p>
          <AddressCopyButton />
        </div>
      </section>

      <InvitationPanels />
    </main>
  );
}
