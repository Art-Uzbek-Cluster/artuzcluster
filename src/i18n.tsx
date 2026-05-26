import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Locale = 'uz' | 'ru' | 'en';
type Theme = 'dark' | 'light';

// Background colors for different themes
const BG_COLORS = {
  light: [
    'rgba(245, 240, 255, 0.95)', // lavender
    'rgba(240, 248, 255, 0.95)', // alice blue
    'rgba(245, 245, 220, 0.95)', // beige
    'rgba(240, 255, 240, 0.95)', // honeydew
    'rgba(255, 250, 240, 0.95)', // floral white
  ],
  dark: [
    'rgba(20, 15, 40, 0.98)',    // deep purple
    'rgba(15, 25, 40, 0.98)',    // deep blue
    'rgba(25, 20, 35, 0.98)',    // plum dark
    'rgba(18, 22, 45, 0.98)',    // navy dark
    'rgba(30, 18, 40, 0.98)',    // indigo dark
    'rgba(20, 30, 40, 0.98)',    // slate dark
  ],
};

type Translation = typeof translations.uz;

const translations = {
    uz: {
    header: {
      logo: 'ART Uzbekistan Cluster',
      nav: {
        about: 'Klaster haqida',
        directions: 'Yo\'nalishlar',
        projects: 'Loyihalar',
        partners: 'Hamkorlar',
        news: 'Yangiliklar',
        contact: 'Aloqa',
      },
      login: 'Kirish',
      register: 'Ro\'yxatdan o\'tish',
      logout: 'Chiqish',
      greeting: 'Salom,',
      theme: {
        light: 'Kunduz',
        dark: 'Kecha',
      },
      language: 'Til',
      themeSwitch: 'Mavzu',
    },
    home: {
      hero: {
        eyebrow: 'SAN\'AT KLasteri',
        title: 'ART UzbekCluster',
        description:
          'Festivallar, rezidentliklar, ta\'lim dasturlari va madaniy loyihalarni birlashtiruvchi ijodiy tashabbuslarni rivojlantirish platformasi.',
        detailsBtn: 'Batafsil',
        actionBtn: 'Ariza berish',
        cards: [
          {
            title: 'Vatan. San\'at. Men.',
            description: 'Ijodning yangi formatlari va mintaqaviy loyihalarni qo\'llab-quvvatlash.',
          },
          {
            title: 'Yashash. Ijod qilish. Sevish.',
          },
          {
            title: 'Chegarasiz san\'at',
          },
        ],
      },
      about: {
        eyebrow: 'ART UzbekCluster — BU',
        title: 'Yosh ijodkorlar uchun multi-format san\'at klasteri',
        cards: [
          {
            title: 'Joylar',
            description:
              "Butun mamlakatdan ekspertlar va ishtirokchilar uchun ta'lim, ijodiy va jamoat maydonchalari.",
          },
          {
            title: 'Dasturlar',
            description:
              "Akademiya, yozgi maktablar, festivallar, rezidentliklar, madaniy va media loyihalari.",
          },
          {
            title: 'Hamjamiyat',
            description:
              "Turli yo'nalishlarda ishlaydigan ijodiy jamoalar, ekspertlar, aktyorlar va tashkilotchilar tarmog'i.",
          },
        ],
      },
      directions: {
        eyebrow: 'YO\'NALISHLAR',
        title: 'San\'at klasteri yo\'nalishlari',
        items: [
          {
            title: 'Ta\'lim va rivojlanish',
            description:
              'Ijodiy sanoatlar akademiyasi, menejerlar maktabi, yosh liderlar uchun dasturlar.',
          },
          {
            title: 'Ijodkorlar uchun imkoniyatlar',
            description:
              'Rezidentliklar, grantlar, festivallar va mualliflik loyihalarini targ\'ib qilish uchun platformalar.',
          },
          {
            title: 'Festivallar va tadbirlar',
            description:
              'Qora dengiz qirg\'og\'ida va mintaqaviy joylarda katta madaniy tadbirlar.',
          },
          {
            title: 'Turizm va yashash',
            description:
              'San\'at qishlog\'i, qulay rezidentliklar va ijodiy hayot uchun joylar.',
          },
        ],
      },
      projects: {
        eyebrow: 'LOYIHALAR',
        title: 'Klaster ichida nima rivojlanadi',
        items: [
          {
            title: 'Musiqiy leybl',
            subtitle: 'Yosh musiqachilarni qo\'llab-quvvatlash',
          },
          {
            title: '«ART UzbekCluster» jurnali',
            subtitle: 'Madaniyat va san\'at haqida yoshlar mediasi',
          },
          {
            title: 'San\'at.Yoshlik',
            subtitle: 'Zamonaviy ijodkorlar uchun intellektual brend',
          },
          {
            title: 'Teatr loyihalari',
            subtitle: 'Zamonaviy hikoyalar haqida kuchli performanslar',
          },
        ],
      },
      famousArtists: {
        eyebrow: 'MASHHUR IJODKORLAR',
        title: 'Mashhur O‘zbek Ijodkorlari',
        detailsBtn: 'Batafsil',
      },
      experts: {
        eyebrow: 'MEHMONLAR VA EKSPERTLAR',
        title: 'Madaniyatni rivojlantiruvchi yuzlar',
        items: [
          'Sergey Kiriенко',
          'Sergey Bezrukov',
          'Vladimir Mashkov',
          'Kirill Krok',
          'Artemiy Lebedev',
          'Andrey Zolotarev',
          'Aleksandr Mazhuga',
        ],
      },
      partners: {
        eyebrow: 'HAMKORLAR',
        title: 'Kim ishtirok etishi mumkin',
        items: [
          { name: 'Universitetlar' },
          { name: 'Maktablar' },
          { name: 'Dizaynerlar' },
          { name: 'Sanʼatkorlar' },
          { name: 'Muzeylar' },
          { name: 'Startaplar' },
          { name: 'Investorlar' },
        ],
      },
      stats: [
        { value: '89', label: 'hududlar' },
        { value: '3 500+', label: 'ekspertlar' },
        { value: '270 000+', label: 'ishtirokchilar' },
      ],
      news: {
        eyebrow: 'YANGILIKLAR',
        title: 'Oxirgi yangiliklar',
        items: [
          {
            title: '#O\'ZIJODIYAT dasturiga ro\'yxatdan o\'tish ochiq',
            date: '2026 yil 29 aprel',
          },
          {
            title: '«Megaanom» akademiyasi yangi oqimni ishga tushiradi',
            date: '2026 yil 27 aprel',
          },
          {
            title: 'Ijodiy hamjamiyat tadbirlar tarmog\'ini kengaytiradi',
            date: '2026 yil 23 aprel',
          },
        ],
      },
      footer: {
        contact: 'Aloqa',
        address: 'Manzil',
        email: 'help@millyart.cluster',
        phone: '8 (800) 551-44-40',
        city: 'g. Moskva, B. Trehsviatitelskiy per., d. 2/1',
        region: 'Respublika Krym, g. Sudak, art-klaster "ART UzbekCluster"',
      },
    },
    login: {
      eyebrow: 'Kirish',
      title: 'ART UzbekCluster ga kiring',
      description:
        'Pochta yoki ijtimoiy tarmoqlar orqali tezda avtorizatsiya qiling va ijodiy hamjamiyatga qo\'shiling.',
      email: 'Elektron pochta',
      password: 'Parol',
      submit: 'Kirish',
      submitting: 'Kirish...',
      or: 'yoki',
      telegram: 'Telegram',
      google: 'Google',
      mailru: 'Mail.ru',
      registerLink: 'Ro\'yxatdan o\'ting',
      noAccount: 'Hisobingiz yo\'qmi?',
      errorMissing: 'Iltimos, barcha maydonlarni to\'ldiring',
      errorInvalid: 'Noto\'g\'ri email yoki parol',
      success: 'Kirish muvaffaqiyatli amalga oshirildi!',
    },
    register: {
      eyebrow: 'Ro\'yxatdan o\'ting',
      title: 'ART UzbekCluster ga xush kelibsiz',
      description: 'Profil yarating va ijodiy hamjamiyatda o\'z yo\'lingizni boshlang.',
      username: 'Foydalanuvchi nomi',
      email: 'Elektron pochta',
      password: 'Parol',
      confirmPassword: 'Parolni tasdiqlang',
      submit: 'Ro\'yxatdan o\'ting',
      submitting: 'Ro\'yxatdan o\'ting...',
      haveAccount: 'Hisobingiz bormi?',
      loginLink: 'Kirish',
      errorPasswordMismatch: 'Parollar mos kelmaydi',
      errorUsername: 'Foydalanuvchi nomi kamida 3 ta belgidan iborat bo\'lishi kerak',
    },
  },
    ru: {
    header: {
      logo: 'ART Uzbekistan Cluster',
      nav: {
        about: 'О кластере',
        directions: 'Направления',
        projects: 'Проекты',
        partners: 'Партнёры',
        news: 'Новости',
        contact: 'Контакты',
      },
      login: 'Вход',
      register: 'Регистрация',
      logout: 'Выход',
      greeting: 'Привет,',
      theme: {
        light: 'День',
        dark: 'Ночь',
      },
      language: 'Язык',
      themeSwitch: 'Тема',
    },
    home: {
      hero: {
        eyebrow: 'АРТ-КЛАСТЕР',
        title: 'ART UzbekCluster',
        description:
          'Платформа для развития творческих инициатив, объединяющая фестивали, резиденции, образовательные программы и культурные проекты.',
        detailsBtn: 'Подробнее',
        actionBtn: 'Подать заявку',
        cards: [
          {
            title: 'Родина. Искусство. Я.',
            description: 'Новые форматы творчества и поддержки региональных проектов.',
          },
          {
            title: 'Жить. Творить. Любить.',
          },
          {
            title: 'Искусство без границ',
          },
        ],
      },
      about: {
        eyebrow: 'ART UzbekCluster — ЭТО',
        title: 'Мультиформатный арт-кластер для молодых творцов',
        cards: [
          {
            title: 'Пространства',
            description:
              'Образовательные, творческие и общественные площадки для экспертов и участников со всей страны.',
          },
          {
            title: 'Программы',
            description:
              'Академия, летние школы, фестивали, резиденции, культурные и медийные проекты.',
          },
          {
            title: 'Сообщество',
            description:
              'Сеть творческих команд, экспертов, артистов и организаторов, работающих в разных направлениях.',
          },
        ],
      },
      directions: {
        eyebrow: 'НАПРАВЛЕНИЯ',
        title: 'Направления арт-кластера',
        items: [
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
        ],
      },
      projects: {
        eyebrow: 'ПРОЕКТЫ',
        title: 'Что развивается внутри кластера',
        items: [
          {
            title: 'Музыкальный лейбл',
            subtitle: 'Поддержка молодых музыкантов',
          },
          {
            title: 'Журнал «ART UzbekCluster»',
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
        ],
      },
      famousArtists: {
        eyebrow: 'ИЗВЕСТНЫЕ ТВОРЦЫ',
        title: 'Известные узбекские художники',
        detailsBtn: 'Подробнее',
      },
      experts: {
        eyebrow: 'ГОСТИ И ЭКСПЕРТЫ',
        title: 'Лица, которые развивают культуру',
        items: [
          'Сергей Кириенко',
          'Сергей Безруков',
          'Владимир Машков',
          'Кирилл Крок',
          'Артемий Лебедев',
          'Андрей Золотарев',
          'Александр Мажуга',
        ],
      },
      partners: {
        eyebrow: 'ПАРТНЁРЫ',
        title: 'Кто может присоединиться',
        items: [
          { name: 'Университеты' },
          { name: 'Школы' },
          { name: 'Дизайнеры' },
          { name: 'Художники' },
          { name: 'Музеи' },
          { name: 'Стартапы' },
          { name: 'Инвесторы' },
        ],
      },
      stats: [
        { value: '89', label: 'регионов' },
        { value: '3 500+', label: 'экспертов' },
        { value: '270 000+', label: 'участников' },
      ],
      news: {
        eyebrow: 'НОВОСТИ',
        title: 'Последние обновления',
        items: [
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
        ],
      },
      footer: {
        contact: 'Контакты',
        address: 'Адрес',
        email: 'help@millyart.cluster',
        phone: '8 (800) 551-44-40',
        city: 'г. Москва, Б. Трехсвятительский пер., д. 2/1',
        region: 'Республика Крым, г. Судак, арт-кластер «ART UzbekCluster»',
      },
    },
    en: {
    header: {
      logo: 'ART Uzbekistan Cluster',
      nav: {
        about: 'About',
        directions: 'Directions',
        projects: 'Projects',
        partners: 'Partners',
        news: 'News',
        contact: 'Contact',
      },
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      greeting: 'Hello,',
      theme: {
        light: 'Day',
        dark: 'Night',
      },
      language: 'Language',
      themeSwitch: 'Theme',
    },
    home: {
      hero: {
        eyebrow: 'ART ECOSYSTEM',
        title: 'ART Uzbekistan Cluster',
        description:
          'A platform for developing art education, creative industries and cultural initiatives across Uzbekistan.',
        detailsBtn: 'Learn more',
        actionBtn: 'Apply now',
        cards: [
          {
            title: 'Homeland. Art. Me.',
            description: 'New formats of creativity and regional support programs.',
          },
          {
            title: 'Live. Create. Belong.',
          },
          {
            title: 'Art without borders',
          },
        ],
      },
      about: {
        eyebrow: 'ART Uzbekistan Cluster — WHAT WE ARE',
        title: 'A multi-format art cluster for emerging creatives',
        cards: [
          {
            title: 'Spaces',
            description:
              'Educational, creative and public venues for participants and experts from across the country.',
          },
          {
            title: 'Programs',
            description:
              'Academy courses, summer schools, festivals, residencies and cultural media projects.',
          },
          {
            title: 'Community',
            description:
              'A network of creative teams, mentors, artists and organizers working across directions.',
          },
        ],
      },
      directions: {
        eyebrow: 'DIRECTIONS',
        title: 'Cluster focus areas',
        items: [
          {
            title: 'Education & development',
            description:
              'Creative industries academy, manager school and leadership programs for youth.',
          },
          {
            title: 'Opportunities for creators',
            description:
              'Residencies, grants, festivals and promotion platforms for author projects.',
          },
          {
            title: 'Festivals & events',
            description:
              'Large-scale cultural events and regional showcases.',
          },
          {
            title: 'Tourism & residency',
            description:
              'Art villages, comfortable residencies and creative living spaces.',
          },
        ],
      },
      projects: {
        eyebrow: 'PROJECTS',
        title: 'What grows inside the cluster',
        items: [
          {
            title: 'Music label',
            subtitle: 'Supporting emerging musicians',
          },
          {
            title: '"ART Uzbekistan" magazine',
            subtitle: 'Youth media about culture and art',
          },
          {
            title: 'Art.Youth',
            subtitle: 'An intellectual brand for contemporary creators',
          },
          {
            title: 'Theatre projects',
            subtitle: 'Strong performances about modern stories',
          },
        ],
      },
      famousArtists: {
        eyebrow: 'FAMOUS CREATORS',
        title: 'Famous Uzbek creators',
        detailsBtn: 'Learn more',
      },
      experts: {
        eyebrow: 'GUESTS & EXPERTS',
        title: 'Faces that shape culture',
        items: [
          'Abdulhaq Abdullayev',
          'Bahodir Jalolov',
          'Vladimir Mashkov',
          'Kirill Krok',
          'Artemy Lebedev',
          'Andrey Zolotarev',
          'Aleksandr Mazhuga',
        ],
      },
      partners: {
        eyebrow: 'PARTNERS',
        title: 'Who can join',
        items: [
          { name: 'Universities' },
          { name: 'Schools' },
          { name: 'Designers' },
          { name: 'Artists' },
          { name: 'Museums' },
          { name: 'Startups' },
          { name: 'Investors' },
        ],
      },
      stats: [
        { value: '89', label: 'regions' },
        { value: '3 500+', label: 'experts' },
        { value: '270 000+', label: 'participants' },
      ],
      news: {
        eyebrow: 'NEWS',
        title: 'Latest updates',
        items: [
          { title: 'Registration opened for #OWNCREATIVITY program', date: '29 April 2026' },
          { title: '"Megaanom" academy launches a new intake', date: '27 April 2026' },
          { title: 'Creative community expands event network', date: '23 April 2026' },
        ],
      },
      footer: {
        contact: 'Contact',
        address: 'Address',
        email: 'help@artcluster.uz',
        phone: '+998 XX XXX XX XX',
        city: 'Tashkent',
        region: 'Republic of Uzbekistan',
      },
    },
    login: {
      eyebrow: 'Login',
      title: 'Sign in to ART Uzbekistan Cluster',
      description:
        'Quickly sign in via email or social networks to join the creative community.',
      email: 'Email',
      password: 'Password',
      submit: 'Sign in',
      submitting: 'Signing in...',
      or: 'or',
      telegram: 'Telegram',
      google: 'Google',
      mailru: 'Mail.ru',
      registerLink: 'Register',
      noAccount: 'No account?',
      errorMissing: 'Please fill all fields',
      errorInvalid: 'Invalid email or password',
      success: 'Signed in successfully!',
    },
    register: {
      eyebrow: 'Register',
      title: 'Welcome to ART Uzbekistan Cluster',
      description: 'Create a profile and start your path in the creative community.',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      submit: 'Register',
      submitting: 'Registering...',
      haveAccount: 'Have an account?',
      loginLink: 'Login',
      errorPasswordMismatch: 'Passwords do not match',
      errorUsername: 'Username should be at least 3 characters',
    },
  },
    login: {
      eyebrow: 'Вход',
      title: 'Войдите в ART UzbekCluster',
      description:
        'Авторизуйтесь быстро через почту или социальные сети, чтобы попасть в творческое сообщество.',
      email: 'Электронная почта',
      password: 'Пароль',
      submit: 'Войти',
      submitting: 'Входим...',
      or: 'или',
      telegram: 'Telegram',
      google: 'Google',
      mailru: 'Mail.ru',
      registerLink: 'Зарегистрируйтесь',
      noAccount: 'Нет аккаунта?',
      errorMissing: 'Пожалуйста, заполните все поля',
      errorInvalid: 'Некорректный email или пароль',
      success: 'Вход выполнен успешно!',
    },
    register: {
      eyebrow: 'Регистрация',
      title: 'Добро пожаловать в ART UzbekCluster',
      description: 'Создайте профиль и начните свой путь в творческом сообществе.',
      username: 'Имя пользователя',
      email: 'Электронная почта',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      submitting: 'Регистрируемся...',
      haveAccount: 'Уже есть аккаунт?',
      loginLink: 'Войти',
      errorPasswordMismatch: 'Пароли не совпадают',
      errorUsername: 'Имя пользователя должно содержать минимум 3 символа',
    },
  },
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleContextValue {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  toggleTheme: () => void;
  t: Translation;
}

const getStorageValue = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  const stored = localStorage.getItem(key);
  return stored ? (stored as unknown as T) : fallback;
};

const getRandomBgColor = (theme: Theme): string => {
  const colors = BG_COLORS[theme];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getStorageValue('app_locale', 'uz'));
  const [theme, setTheme] = useState<Theme>(getStorageValue('app_theme', 'dark'));

  useEffect(() => {
    localStorage.setItem('app_locale', locale);
    localStorage.setItem('app_theme', theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale === 'ru' ? 'ru' : 'uz';
    
    // Change background color when theme changes
    const newColor = getRandomBgColor(theme);
    document.documentElement.style.setProperty('--bg-color-dynamic', newColor);
  }, [locale, theme]);

  const value = useMemo(
    () => ({
      locale,
      theme,
      setLocale,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
      t: translations[locale as keyof typeof translations],
    }),
    [locale, theme]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return context;
}
