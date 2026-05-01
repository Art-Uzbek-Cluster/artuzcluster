import { Link } from 'react-router-dom';

const stats = [
  { value: '89', label: 'регионов' },
  { value: '3 500+', label: 'экспертов' },
  { value: '270 000+', label: 'участников' },
];

const directions = [
  {
    title: 'Обучение и развитие',
    description:
      'Академия творческих индустрий, школа менеджеров, программы для молодых лидеров.',
  },
  {
    title: 'Возможности для творцов',
    description:
      'Резиденции, гранты, фестивали и платформы для продвижения авторских проектов.',
  },
  {
    title: 'Фестивали и события',
    description:
      'Крупные культурные события на берегу Черного моря и в регионах России.',
  },
  {
    title: 'Туризм и проживание',
    description:
      'Арт-поселок, комфортные резиденции и пространства для творческой жизни.',
  },
];

const experts = [
  'Сергей Кириенко',
  'Сергей Безруков',
  'Владимир Машков',
  'Кирилл Крок',
  'Артемий Лебедев',
  'Андрей Золотарев',
  'Александр Мажуга',
];

const projects = [
  {
    title: 'Музыкальный лейбл',
    subtitle: 'Поддержка молодых музыкантов',
  },
  {
    title: 'Журнал «Milly Art. Cluster»',
    subtitle: 'Молодежное медиа о культуре и искусстве',
  },
  {
    title: 'Арт.Молодость',
    subtitle: 'Интеллектуальный бренд для современных творцов',
  },
  {
    title: 'Театральные проекты',
    subtitle: 'Сильные перформансы о современных историях',
  },
];

const news = [
  {
    title: 'Открыта регистрация на программу #СВОёТВОРЧЕСТВО',
    date: '29 апреля 2026',
  },
  {
    title: 'Академия «Меганом» запускает новый поток',
    date: '27 апреля 2026',
  },
  {
    title: 'Творческое сообщество расширяет сетку событий',
    date: '23 апреля 2026',
  },
];

export function Home() {
  return (
    <main>
      <section className="hero-section" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">АРТ-КЛАСТЕР</span>
            <h1>Milly Art. Cluster</h1>
            <p>
              Платформа для развития творческих инициатив, объединяющая фестивали,
              резиденции, образовательные программы и культурные проекты.
            </p>
            <div className="hero-actions">
              <a href="#about" className="btn-primary">
                Подробнее
              </a>
              <Link to="/register" className="btn-secondary">
                Подать заявку
              </Link>
            </div>
          </div>

          <div className="hero-cards">
            <div className="hero-card hero-card-large">
              <h3>Родина. Искусство. Я.</h3>
              <p>Новые форматы творчества и поддержки региональных проектов.</p>
            </div>
            <div className="hero-card">
              <h3>Жить. Творить. Любить.</h3>
            </div>
            <div className="hero-card accent-card">
              <h3>Искусство без границ</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Milly Art. Cluster — ЭТО</span>
            <h2>Мультиформатный арт-кластер для молодых творцов</h2>
          </div>
          <div className="info-grid">
            <article className="info-card">
              <h3>Пространства</h3>
              <p>
                Образовательные, творческие и общественные площадки для экспертов и
                участников со всей страны.
              </p>
            </article>
            <article className="info-card">
              <h3>Программы</h3>
              <p>
                Академия, летние школы, фестивали, резиденции, культурные и
                медийные проекты.
              </p>
            </article>
            <article className="info-card">
              <h3>Сообщество</h3>
              <p>
                Сеть творческих команд, экспертов, артистов и организаторов,
                работающих в разных направлениях.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="directions">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">НАПРАВЛЕНИЯ</span>
            <h2>Направления арт-кластера</h2>
          </div>
          <div className="direction-grid">
            {directions.map((item) => (
              <article key={item.title} className="direction-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">ПРОЕКТЫ</span>
            <h2>Что развивается внутри кластера</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="experts">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">ГОСТИ И ЭКСПЕРТЫ</span>
            <h2>Лица, которые развивают культуру</h2>
          </div>
          <div className="experts-grid">
            {experts.map((name) => (
              <article key={name} className="expert-card">
                {name}
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <span className="eyebrow">НОВОСТИ</span>
            <h2>Последние обновления</h2>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <article key={item.title} className="news-card">
                <span>{item.date}</span>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="footer-contact">
        <div className="container footer-grid">
          <div>
            <h3>Контакты</h3>
            <p>help@millyart.cluster</p>
            <p>8 (800) 551-44-40</p>
          </div>
          <div>
            <h3>Адрес</h3>
            <p>г. Москва, Б. Трехсвятительский пер., д. 2/1</p>
            <p>Республика Крым, г. Судак, арт-кластер «Milly Art. Cluster»</p>
          </div>
        </div>
      </section>
    </main>
  );
}
