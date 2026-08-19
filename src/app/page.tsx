import AddressCopyButton from "./components/address-copy-button";
import InvitationPanels from "./components/invitation-panels";

export default function Home() {
  return (
    <main className="invitation">
      <section className="invitation__content">
        <p className="invitation__eyebrow">
          2026 한국공학대학교
          <br />
          디자인공학부 제 21회 졸업전시회
        </p>

        <div className="invitation__title-group">
          <h1>sensibility</h1>
          <p>: flexibility through sensibility</p>
        </div>

        <div className="invitation__details">
          <p>26.09.18 - 09.20</p>
          <AddressCopyButton />
        </div>
      </section>

      <InvitationPanels />
    </main>
  );
}
