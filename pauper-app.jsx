// pauper-app.jsx
// Pauper Raid am Dienstag — main React app

const { useEffect, useMemo, useRef } = React;

// ============================================================
// Date helpers — next 6 "second Tuesday of the month"
// ============================================================

const MONTHS_LONG = [
  'Januar','Februar','März','April','Mai','Juni',
  'Juli','August','September','Oktober','November','Dezember'
];
const MONTHS_SHORT = [
  'Jan','Feb','Mär','Apr','Mai','Jun',
  'Jul','Aug','Sep','Okt','Nov','Dez'
];

function secondTuesdayOf(year, month) {
  // Find the first Tuesday, then add 7 days.
  const firstDay = new Date(year, month, 1);
  const dow = firstDay.getDay();
  // Days to add to get to the first Tuesday (dow=2).
  const offsetToFirstTue = (2 - dow + 7) % 7;
  return new Date(year, month, 1 + offsetToFirstTue + 7);
}

function formatLong(date) {
  return `${date.getDate()}. ${MONTHS_LONG[date.getMonth()]}`;
}
function formatCard(date) {
  return `${date.getDate()}. ${MONTHS_SHORT[date.getMonth()]}`;
}

function getNextRaids(count) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dates = [];
  let year = now.getFullYear();
  let month = now.getMonth();
  while (dates.length < count) {
    const d = secondTuesdayOf(year, month);
    if (d >= now) dates.push(d);
    month += 1;
    if (month > 11) { month = 0; year += 1; }
  }
  return dates;
}

// ============================================================
// Title treatments
// ============================================================

function FieryTitle() {
  return (
    <h1 className="title fiery">
      <span className="title-line">Pauper Raid</span>
      <span className="title-line">am Dienstag</span>
    </h1>
  );
}

function IlluminatedTitle() {
  // First letter of each word gets the illuminated treatment
  return (
    <h1 className="title illuminated">
      <span className="title-line">
        <span className="init">P</span>
        <span className="word">auper&nbsp;</span>
        <span className="init">R</span>
        <span className="word">aid</span>
      </span>
      <span className="title-line">
        <span className="word">am&nbsp;</span>
        <span className="init">D</span>
        <span className="word">ienstag</span>
      </span>
    </h1>
  );
}

function BannerTitle() {
  return (
    <div className="banner-stack">
      <BlockBanner lines={["PAUPER RAID", "AM DIENSTAG"]} />
    </div>
  );
}

const TITLES = {
  fiery:       FieryTitle,
  illuminated: IlluminatedTitle,
  banner:      BannerTitle,
};

// ============================================================
// Main app
// ============================================================

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const raids = useMemo(() => getNextRaids(6), []);
  const nextRaid = raids[0];

  // Inject mana-pip watermark as a CSS custom property
  useEffect(() => {
    const inkPip = makePipWatermark("rgba(42,32,20,0.55)");
    const goldPip = makePipWatermark("rgba(216,179,90,0.85)");
    document.documentElement.style.setProperty('--pip-watermark', inkPip);
    document.documentElement.style.setProperty('--pip-watermark-gold', goldPip);
  }, []);

  const TitleEl = TITLES[t.title] || FieryTitle;

  const pageClass = `page bg-${t.background}`;

  return (
    <div className={pageClass}>

      {/* ───────── Mage Duel ambient backdrop (real DOM, not pseudo-element)
           — fixed <img> behind everything, with a vignette layer on top.
           background-attachment: fixed is unreliable on mobile Safari and
           sometimes fails in screenshot capture; using real elements works
           everywhere and is also screenshot-able. ───────── */}
      {t.background === 'mages' && (
        <>
          <img className="mages-bg" src="foglioblasts.jpg" alt="" aria-hidden="true"/>
          <div className="mages-vignette" aria-hidden="true"/>
        </>
      )}

      {/* ───────── Top divider ───────── */}
      <Divider/>

      {/* ───────── Hero ───────── */}
      <header className="hero">
        <div className="title-wrap">
          <div className="title-eyebrow">Raid&rsquo;n&rsquo;Trade · Karlsruhe</div>
          <TitleEl/>
        </div>

        <figure className="hero-art">
          <div className="hero-art-frame">
            <img src="foglioblasts.jpg" alt="Zwei Magier im Duell — Feuer und Sturm prallen aufeinander"/>
          </div>
        </figure>

        <section className="block">
          <div className="block-body">
            <div className="intro-box">
              <p className="lede">
                Ein monatliches Pauper-Turnier bei <strong>Raid&rsquo;n&rsquo;Trade Karlsruhe</strong>.
              </p>
              <p className="cta-line">
                Nächster Raid: <strong className="next-date">{formatLong(nextRaid)}</strong>.<br/>
                Einlass ab <strong>18:00</strong>, erste Runde um <strong>18:30</strong>.
              </p>
            </div>
          </div>
        </section>
      </header>

      <Divider/>

      {/* ───────── Details ───────── */}
      <section id="details" className="block">
        <div className="block-body">
          <h2 className="section-title">Die Details</h2>
          <dl className="details">
            <dt>Wann</dt>
            <dd>Jeden zweiten Dienstag im Monat. Einlass 18:00, erste Runde <strong>18:30</strong>.</dd>

            <dt>Wo</dt>
            <dd>
              <strong>Raid&rsquo;n&rsquo;Trade</strong><br/>
              Schinnrainstra&szlig;e 9<br/>
              76227 Karlsruhe
            </dd>

            <dt>Startgeld</dt>
            <dd><strong>10&nbsp;&euro;</strong></dd>

            <dt>Preise</dt>
            <dd><strong>1 Booster pro Win</strong>, mindestens 1 Booster.</dd>

            <dt>Format</dt>
            <dd>Pauper &mdash; nur Commons, 60-Karten-Deck, aktuelle Banlist.</dd>
          </dl>
        </div>
      </section>

      <Divider/>

      {/* ───────── Schedule ───────── */}
      <section className="block">
        <div className="block-body">
          <h2 className="section-title">NEXT RAIDS</h2>
          <ul className="schedule">
            {raids.map((d, i) => (
              <li key={i} className={i === 0 ? 'next' : ''}>
                <span className="sched-tag">{d.getFullYear()}</span>
                {formatCard(d)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Divider/>

      {/* ───────── Footer ───────── */}
      <footer className="footer">
        <p>Pauper Raid am Dienstag &middot; bei Raid&rsquo;n&rsquo;Trade, Karlsruhe.</p>
      </footer>

      {/* ───────── Tweaks ───────── */}
      <TweaksPanel>
        <TweakSection label="Hintergrund"/>
        <TweakSelect
          label="Textur"
          value={t.background}
          options={[
            { value: 'parchment', label: 'Pergament' },
            { value: 'spellbook', label: 'Zauberbuch' },
            { value: 'tapestry',  label: 'Wandteppich'  },
            { value: 'mages',     label: 'Magierduell' },
          ]}
          onChange={(v) => setTweak('background', v)}
        />

        <TweakSection label="Titel-Stil"/>
        <TweakRadio
          label="Stil"
          value={t.title}
          options={[
            { value: 'fiery',       label: 'Feurig' },
            { value: 'illuminated', label: 'Illuminiert' },
            { value: 'banner',      label: 'Banner' },
          ]}
          onChange={(v) => setTweak('title', v)}
        />

      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
