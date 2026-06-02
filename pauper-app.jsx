// pauper-app.jsx
// Wednesday Pauper Raid — main React app

const { useEffect, useMemo, useRef } = React;

// ============================================================
// Date helpers — next 6 "last Wednesday of the month"
// ============================================================

const MONTHS_LONG = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const MONTHS_SHORT = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

function lastWednesdayOf(year, month) {
  const lastDay = new Date(year, month + 1, 0);
  const dow = lastDay.getDay();
  const offset = (dow - 3 + 7) % 7;
  return new Date(year, month, lastDay.getDate() - offset);
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatLong(date) {
  return `${MONTHS_LONG[date.getMonth()]} ${ordinal(date.getDate())}`;
}
function formatCard(date) {
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
}

function getNextRaids(count) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dates = [];
  let year = now.getFullYear();
  let month = now.getMonth();
  while (dates.length < count) {
    const d = lastWednesdayOf(year, month);
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
      <span className="title-line">Wednesday</span>
      <span className="title-monthly">monthly</span>
      <span className="title-line">Pauper Raid</span>
    </h1>
  );
}

function IlluminatedTitle() {
  // First letter of each word gets the illuminated treatment
  return (
    <h1 className="title illuminated">
      <span className="title-line">
        <span className="init">W</span>
        <span className="word">ednesday</span>
      </span>
      <span className="title-monthly">monthly</span>
      <span className="title-line">
        <span className="init">P</span>
        <span className="word">auper&nbsp;</span>
        <span className="init">R</span>
        <span className="word">aid</span>
      </span>
    </h1>
  );
}

function BannerTitle() {
  return (
    <div className="banner-stack">
      <BlockBanner lines={["WEDNESDAY", "PAUPER RAID"]} />
      <div className="title-monthly banner-monthly">monthly</div>
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
            <img src="foglioblasts.jpg" alt="Two mages duel — fire and storm collide between them"/>
          </div>
        </figure>

        <section className="block">
          <div className="block-body">
            <div className="intro-box">
              <p className="lede">
                A monthly Pauper tournament at <strong>Raid&rsquo;n&rsquo;Trade Karlsruhe</strong>.
              </p>
              <p className="cta-line">
                Next raid: <strong className="next-date">{formatLong(nextRaid)}</strong>.<br/>
                Doors open at <strong>18:00</strong>, first round at <strong>18:30</strong>.
              </p>
            </div>
          </div>
        </section>
      </header>

      <Divider/>

      {/* ───────── Details ───────── */}
      <section id="details" className="block">
        <div className="block-body">
          <h2 className="section-title">The Details</h2>
          <dl className="details">
            <dt>When</dt>
            <dd>The last Wednesday of every month. Doors 18:00, first round <strong>18:30</strong>.</dd>

            <dt>Where</dt>
            <dd>
              <strong>Raid&rsquo;n&rsquo;Trade</strong><br/>
              Schinnrainstra&szlig;e 9<br/>
              76227 Karlsruhe
            </dd>

            <dt>Entry</dt>
            <dd><strong>10&nbsp;&euro;</strong> per player.</dd>

            <dt>Prizes</dt>
            <dd><strong>2 booster packs per player</strong>, distributed by final standing.</dd>

            <dt>Format</dt>
            <dd>Pauper &mdash; commons only, 60-card deck, current banlist.</dd>
          </dl>
        </div>
      </section>

      <Divider/>

      {/* ───────── Schedule ───────── */}
      <section className="block">
        <div className="block-body">
          <h2 className="section-title">Upcoming Raids</h2>
          <ul className="schedule">
            {raids.map((d, i) => (
              <li key={i} className={i === 0 ? 'next' : ''}>
                <span className="sched-tag">
                  {i === 0 ? 'Next' : d.getFullYear()}
                </span>
                {formatCard(d)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Divider/>

      {/* ───────── Footer ───────── */}
      <footer className="footer">
        <p>Wednesday Pauper Raid &middot; hosted at Raid&rsquo;n&rsquo;Trade, Karlsruhe.</p>
      </footer>

      {/* ───────── Tweaks ───────── */}
      <TweaksPanel>
        <TweakSection label="Background"/>
        <TweakSelect
          label="Texture"
          value={t.background}
          options={[
            { value: 'parchment', label: 'Parchment' },
            { value: 'spellbook', label: 'Spellbook' },
            { value: 'tapestry',  label: 'Tapestry'  },
            { value: 'mages',     label: 'Mage Duel' },
          ]}
          onChange={(v) => setTweak('background', v)}
        />

        <TweakSection label="Title treatment"/>
        <TweakRadio
          label="Style"
          value={t.title}
          options={[
            { value: 'fiery',       label: 'Fiery' },
            { value: 'illuminated', label: 'Illuminated' },
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
