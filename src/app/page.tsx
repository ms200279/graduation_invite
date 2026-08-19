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

        <p className="invitation__details">
          26.09.18 - 09.20
          <br />
          홍익대학교 대학로 아트센터 B2 갤러리 3
        </p>
      </section>

      <nav className="invitation__navigation" aria-label="전시 안내">
        <button type="button">Schedule</button>
        <button type="button">Locate</button>
        <button type="button">Parking</button>
      </nav>
    </main>
  );
}
