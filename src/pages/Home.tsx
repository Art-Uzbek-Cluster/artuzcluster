import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n';
import { ArtistsSection } from '../components/artists/ArtistsSection';

type ExternalNewsItem = {
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
};

const newsApiFeed: { status: string; totalResults: number; articles: Array<ExternalNewsItem & { source: { id: string | null; name: string }; author: string | null; urlToImage: string | null; content: string }> } = {
  status: 'ok',
  totalResults: 14,
  articles: [
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Caitlin McCabe',
      title: 'S&P 500 Nears Longest Winning Streak Since 2023',
      description: 'U.S. stocks were climbing, bolstered by continued enthusiasm surrounding artificial intelligence, aerospace and other emerging tech.',
      url: 'https://www.wsj.com/finance/oil-climbs-on-u-s-iran-uncertainty-stock-market-rally-holds-da96d8f3',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/X24kuCB0CIVdnrxln9J72g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/e6e8173862e41f9011caf5adae8e6ed1',
      publishedAt: '2026-05-22T16:34:00Z',
      content: "- Spencer Platt/Getty Images\r\nInvestors around the world are in good spirits today, setting the S&P 500 on track to rise for its eighth straight week.\r\nU.S. stocks are climbing, bolstered by continued enth… [+1080 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Sarah Nassauer',
      title: 'Walmart Sales Rise as Higher Fuel Prices Bring More Bargain Hunters',
      description: 'The retailer said shoppers pushed its grocery, general merchandise and online sales higher in the most recent quarter.',
      url: 'https://www.wsj.com/business/retail/walmart-wmt-q1-earnings-report-2027-bf5912d7',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/WZZ6bq5bzcT4I5tpmBOAxQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/f6dd546da0b47a8f4eca7010ae4d8cc5',
      publishedAt: '2026-05-21T12:20:00Z',
      content: "Walmarts U.S. comparable sales grew 4.1% in the latest quarter. - Scott Olson/Getty Images\r\nWalmart said higher fuel prices could bring more shoppers through its doors.\r\nThe retailer reported strong … [+3525 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'John Gruber',
      title: 'WSJ: ‘Google Unveils New Gemini AI Agent for Personal Tasks’',
      description: null,
      url: 'https://www.wsj.com/tech/ai/google-unveils-new-gemini-ai-agent-for-personal-tasks-b8093197?st=BFmPev',
      urlToImage: null,
      publishedAt: '2026-05-21T01:05:14Z',
      content: "Katherine Blunt and Rolfe Winkler, reporting for The Wall Street Journal from Google I/O (gift link):\n\n\n Google is supercharging its Gemini artificial-intelligence model\nto become more competitive in… [+1254 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Peter Rudegeair',
      title: 'Hedge fund Darsana Capital stands to make over $17 billion from SpaceX IPO',
      description: "Darsana Capital's SpaceX stake now makes up nearly 60% of its assets.",
      url: 'https://www.wsj.com/finance/investing/the-little-known-hedge-fund-that-stands-to-make-over-10-billion-on-spacex-44504c7a?mod=hp_lead_pos4',
      urlToImage: 'https://www.nzherald.co.nz/resizer/v2/HEDKYDOAZNA47JU4F4I4KISY.jpg?auth=a160fb69a880c11960655259528a5b8b68373428ea06eae2a47a608fa0164631&width=1200&height=675&quality=70&focal=2248%2C2155&smart=false',
      publishedAt: '2026-05-19T01:13:09Z',
      content: "Darsana got interested in SpaceX after one of its partners, Dan Irom, was looking into publicly traded satellite companies and met with privately held SpaceX as part of his research, the people famil… [+2284 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Caitlin McCabe',
      title: 'Stocks Climb as Investors Focus on AI Trade',
      description: 'U.S. stocks gained, with the Dow industrials surpassing 50,000, as artificial intelligence remained investors’ primary focus.',
      url: 'https://www.wsj.com/finance/u-s-futures-european-markets-rise-on-nvidia-led-rally-trump-xi-summit-eyed-992bf06e',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/FAw41od8wuhUAb2VsUhq.A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/6691b3e4717a8a327670e89f8d369a06',
      publishedAt: '2026-05-14T18:55:00Z',
      content: "- Michael M. Santiago/Getty Images\r\nU.S. stocks are continuing their upswing today.\r\nStocks tied to artificial intelligence remain investors primary focus. Also joining them in the spotlight: Cisco S… [+1192 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Matt Grossman',
      title: 'Retailers’ Sales Growth Cooled Last Month',
      description: 'Retailers’ sales grew by 0.5% last month to $757.1 billion, versus the 1.6% growth recorded in March, the Commerce Department said.',
      url: 'https://www.wsj.com/business/retail/retailers-sales-growth-cooled-last-month-b121db6e',
      urlToImage: 'https://images.wsj.net/im-52845938/social',
      publishedAt: '2026-05-14T13:18:00Z',
      content: "Sales growth slowed for U.S. retailers in April, damped by a cooler increase in gasoline prices as the Iran conflict continued.\r\nRetailers sales grew by 0.5% last month to $757.1 billion, versus the … [+228 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Isabella Simonetti',
      title: 'Versant Shares Surge Premarket as Company Beats Wall Street Expectations',
      description: 'The gain came despite declines in the company’s revenue and net income on lower subscriber numbers and ad sales.',
      url: 'https://www.wsj.com/business/earnings/versant-vsnt-1q-earnings-report-2026-stock-9d6d6e4a',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/xZzriYKDy5qHfhFdnAOnXg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/35ed7a377818a9d1577b523d68789e19',
      publishedAt: '2026-05-14T12:01:00Z',
      content: "Versant is home to cable channels that include CNBC. - Lev Radin/ZUMA Press\r\nVersant Media Group reported lower revenue and profit in its first quarter on lower subscriber numbers and ad sales.\r\n… [+1749 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Eliot Brown and Kosaku Narioka',
      title: 'SoftBank Lands $25 Billion Gain on OpenAI Bet',
      description: 'The Japanese company has issued debt, sold stakes and borrowed to fund bold AI investments.',
      url: 'https://www.wsj.com/business/earnings/softbank-more-than-quadruples-annual-profit-on-44-billion-in-openai-gains-d2bab91f',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/7T5uLqbtQJFierPcOSkfog--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/298b05a647baa461aa3b8ef287bd1841',
      publishedAt: '2026-05-13T12:23:20Z',
      content: "SoftBank stock has climbed sharply this year, driven by expectations for AI-related demand. - Yuichi Yamazaki/AFP/Getty Images\r\nBillionaire Masayoshi Sons megasize bet on OpenAI is powering profit at… [+4017 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'John Gruber',
      title: 'Search Ads as a Vector for Travel Scams',
      description: null,
      url: 'https://www.wsj.com/lifestyle/travel/the-simple-travel-scam-that-cost-a-seasoned-traveler-over-12-000-7d317f20?st=WDTpv5',
      urlToImage: null,
      publishedAt: '2026-05-12T20:22:20Z',
      content: "Dawn Gilbertson, writing for The Wall Street Journal (gift link):\n\n\n Calder says that he tried to rebook at the given link a few times\nbut that it wouldn’t work. He became worried new flight options\n… [+1844 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Ed Ballard',
      title: 'Stock Futures Fall Amid Mideast Stalemate',
      description: 'U.S. stock futures were trading lower, with the Nasdaq 100 falling the most, as investors wait for inflation data.',
      url: 'https://www.wsj.com/finance/oil-rose-on-middle-east-uncertainty-u-s-inflation-eyed-f664c998',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/qawLBzqKtEEqIa_vyJqGIw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/da5e3515e33726a05e988427f',
      publishedAt: '2026-05-12T10:33:00Z',
      content: "- brendan mcdermid/Reuters\r\nThe tech-led stock-market rally is taking a breather as investors wait for inflation data.\r\nU.S. stock futures are trading lower, with contracts pegged to the Nasdaq 100 f… [+967 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Raffaele Huang and Tracy Qu',
      title: 'China to Invest in DeepSeek at $50 Billion Valuation',
      description: 'The money will come from government-backed investors and align the AI startup with Beijing’s push for technology self-sufficiency.',
      url: 'https://www.wsj.com/tech/ai/china-to-invest-in-deepseek-at-50-billion-valuation-045041d0',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/6IVzCxIglPrvYsGlnPie0Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/088c0d1254939a2c67c343d8023572f8',
      publishedAt: '2026-05-06T12:45:00Z',
      content: "DeepSeek is viewed as a national AI champion by China. - Andy Wong/AP\r\nChinas DeepSeek is raising money from government-backed investors, aligning the artificial-intelligence startup with Beijings pu… [+3883 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Vicky Ge Huang',
      title: 'Crypto Exchange Bullish Strikes $4.2 Billion Deal for Transfer Agent in Tokenization Push',
      description: 'Equiniti is one of the world’s biggest transfer agents, offering shareholder services to companies including Berkshire Hathaway.',
      url: 'https://www.wsj.com/finance/currencies/crypto-exchange-bullish-strikes-4-2-billion-deal-for-transfer-agent-in-tokenization-push-4af8f41f',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/JclxDVzAM.6urTIVUDaSyNQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/d8e075445c5c575af40d969d403285d5',
      publishedAt: '2026-05-05T10:00:00Z',
      content: "Tom Farley - Lam Yik/Bloomberg News\r\nBullish, the crypto exchange run by former New York Stock Exchange President Tom Farley, said Tuesday that it has agreed to acquire transfer agent Equiniti for $4… [+2766 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Nicholas G. Miller',
      title: 'Hubbell to Buy NSI Industries for $3 Billion',
      description: 'Hubbell agreed to acquire NSI Industries for $3 billion, aiming to increase its offerings of critical infrastructure to its electrical and utility customers.',
      url: 'https://www.wsj.com/finance/investing/hubbell-to-buy-nsi-industries-for-3-billion-a8dd6e4a',
      urlToImage: 'https://www.s.yimg.com/ny/api/res/1.2/TH0ftKRtGGjqvVGAjPasHA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/f9f7f73094cb730c3d7ae766baa5af83',
      publishedAt: '2026-05-04T11:57:00Z',
      content: "Hubbell agreed to acquire NSI Industries for $3 billion, aiming to increase its offerings of critical infrastructure to its electrical and utility customers. - apu gomes/Agence France-Presse/Getty Im… [+1039 chars]",
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Caitlin McCabe',
      title: 'Stock Futures Hold On to Gains',
      description: 'U.S. stock futures were holding onto recent gains after both the S 500 and Nasdaq composite finished April with their largest monthly gains since 2020.',
      url: 'https://www.wsj.com/finance/stocks/stock-futures-higher-oil-elevated-as-european-and-asian-markets-shut-9a86bd34',
      urlToImage: 'https://s.yimg.com/ny/api/res/1.2/X24kuCB0CIVdnrxln9J72g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/e6e8173862e41f9011caf5adae8e6ed1',
      publishedAt: '2026-05-01T10:54:00Z',
      content: "- Spencer Platt/Getty Images\r\nInvestors are kicking off May on an optimistic note, with U.S. stock futures holding onto recent gains and oil prices steady.\r\nBoth the S&P 500 and Nasdaq composite … [+1233 chars]",
    },
  ],
};

type HomeNewsItem = {
  title: string;
  date: string;
  url?: string;
  description?: string;
};

export function Home() {
  const { t } = useLocale();
  const { hero, about, directions, stats, news, footer } = t.home;
  const [activeModal, setActiveModal] = useState<
    'education' | 'opportunities' | 'festivals' | null
  >(null);

  const directionPanels: Record<
    'education' | 'opportunities' | 'festivals',
    {
      title: string;
      items: Array<{ title: string; description?: string }>;
    }
  > = {
    education: {
      title: 'Art Education Lab',
      items: [
        { title: 'Art Education Lab', description: 'pedagogik tajribalar' },
        { title: 'Design Thinking Center', description: 'talaba loyihalari' },
        { title: 'Creative Incubator', description: 'yosh ijodkorlar uchun platforma' },
        { title: 'Cultural Heritage Project', description: 'milliy san’atni rivojlantirish' },
        { title: 'Art & Business Hub', description: 'san’at + tadbirkorlik integratsiyasi' },
      ],
    },
    opportunities: {
      title: 'Imlar qo‘shilishi mumkin',
      items: [
        { title: 'OTMlar' },
        { title: 'maktablar' },
        { title: 'dizaynerlar' },
        { title: 'rassomlar' },
        { title: 'muzeylar' },
        { title: 'startaplar' },
        { title: 'investorlar' },
      ],
    },
    festivals: {
      title: 'Art Festival 2026',
      items: [
        { title: '🎨 Talabalar ko‘rgazmasi' },
        { title: '🧠 Design Thinking workshop' },
        { title: '🌍 Xalqaro hamkorlik loyihasi' },
      ],
    },
  };

  const modalContent = activeModal ? directionPanels[activeModal] : null;

  const externalNews: HomeNewsItem[] = newsApiFeed.articles
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 4)
    .map((item) => ({
      title: item.title,
      date: new Date(item.publishedAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      url: item.url,
      description: item.description || item.content?.slice(0, 120) || '',
    }));

  const newsItems: HomeNewsItem[] = [
    ...news.items.map((item) => ({
      title: item.title,
      date: item.date,
    })),
    ...externalNews,
  ];

  return (
    <main>
      <section className="hero-section" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
            <div className="hero-actions">
              <a href="#about" className="btn-primary">
                {hero.detailsBtn}
              </a>
              <Link to="/register" className="btn-secondary">
                {hero.actionBtn}
              </Link>
            </div>
          </div>

          <div className="hero-cards">
            {hero.cards.map((card) => (
              <div
                key={card.title}
                className={`hero-card ${card.description ? 'hero-card-large' : ''} ${!card.description ? 'accent-card' : ''}`}
              >
                <h3>{card.title}</h3>
                {card.description && <p>{card.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{about.eyebrow}</span>
            <h2>{about.title}</h2>
          </div>
          <div className="info-grid">
            {about.cards.map((card) => (
              <article key={card.title} className="info-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="directions">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{directions.eyebrow}</span>
            <h2>{directions.title}</h2>
          </div>
          <div className="direction-grid">
            {directions.items.slice(0, 3).map((item, index) => (
              <article key={item.title} className="direction-card direction-action-card">
                <h3>{item.title}</h3>
                <button
                  type="button"
                  className="direction-open-button"
                  onClick={() =>
                    setActiveModal(
                      index === 0
                        ? 'education'
                        : index === 1
                        ? 'opportunities'
                        : 'festivals',
                    )
                  }
                >
                  Batafsil
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalContent && (
        <div className="direction-modal-overlay" role="dialog" aria-modal="true">
          <motion.div
            className="direction-modal"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <button className="modal-close" type="button" onClick={() => setActiveModal(null)}>
              ×
            </button>
            <div className="direction-modal-header">
              <span className="eyebrow">{directions.eyebrow}</span>
              <h2>{modalContent.title}</h2>
            </div>
            <ul className="direction-modal-list">
              {modalContent.items.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  {item.description ? <p>{item.description}</p> : null}
                </li>
              ))}
            </ul>
            <button className="direction-modal-close" type="button" onClick={() => setActiveModal(null)}>
              Yopish
            </button>
          </motion.div>
        </div>
      )}

      

      <ArtistsSection />

      <section className="section" id="stats">
        <div className="container stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark" id="news">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{news.eyebrow}</span>
            <h2>{news.title}</h2>
          </div>
          <div className="news-grid">
            {newsItems.map((item, index) => (
              <article key={`${item.title}-${index}`} className="news-card">
                <span>{item.date}</span>
                <h3>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                {item.description && <p>{item.description}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container footer-grid">
          <div>
            <h3>{footer.contact}</h3>
            <p>{footer.email}</p>
            <p>{footer.phone}</p>
          </div>
          <div>
            <h3>{footer.address}</h3>
            <p>{footer.city}</p>
            <p>{footer.region}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
