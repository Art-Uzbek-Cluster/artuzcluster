export type LocalizedString = {
  uz: string;
  ru: string;
  en: string;
};

export type PlaceData = {
  id: string;
  title: LocalizedString;
  imageUrl: string;
  description: LocalizedString;
  example: LocalizedString;
  result: LocalizedString;
};

export const PLACES_DATA: PlaceData[] = [
  {
    id: 'academy',
    title: { uz: 'Akademiya', ru: 'Академия', en: 'Academy' },
    imageUrl: '/events/rasm1.png',
    description: {
      uz: "Mamlakatning yetakchi ilmiy-ijodiy markazi, tasviriy san'at, dizayn, amaliy va ilmiy san'at sohasida mutaxassislar tayyorlaydi.",
      ru: 'Ведущий научно-творческий центр страны, осуществляющий подготовку специалистов в области изобразительного искусства, дизайна, декоративно-прикладного искусства и искусствоведения.',
      en: 'A leading creative and academic center training specialists in fine arts, design and art studies.',
    },
    example: {
      uz: "O'zbekiston Rasmlar Akademiyasi",
      ru: 'Академия художеств Узбекистана',
      en: 'Academy of Arts of Uzbekistan',
    },
    result: {
      uz: 'Professional rassomlar, dizaynerlar va sanʼatshunoslar tayyorlash.',
      ru: 'Подготовка профессиональных художников, дизайнеров и искусствоведов.',
      en: 'Training professional artists, designers and art historians.',
    },
  },
  {
    id: 'summer-school',
    title: { uz: "Yozgi maktablar", ru: 'Летние школы', en: 'Summer schools' },
    imageUrl: '/events/rasm2.png',
    description: {
      uz: "O'zbekiston va xorij talabalari uchun ta'lim va madaniy maydoncha, tajriba almashinuvi va amaliy ko'nikmalarni rivojlantirishga qaratilgan.",
      ru: 'Образовательная и культурная площадка для студентов Узбекистана и зарубежных стран, направленная на обмен опытом и развитие практических навыков.',
      en: 'An educational and cultural venue for students from Uzbekistan and abroad focused on exchange and practical skills.',
    },
    example: {
      uz: "Xivada xalqaro yozgi maktab",
      ru: 'Международная летняя школа в Хиве',
      en: 'International summer school in Khiva',
    },
    result: {
      uz: 'Xalqaro tajriba orttirish va ishtirokchilarning kasbiy kompetentsiyalarini rivojlantirish.',
      ru: 'Получение международного опыта и развитие профессиональных компетенций участников.',
      en: "Gaining international experience and developing participants' professional competencies.",
    },
  },
  {
    id: 'festivals',
    title: { uz: 'Festivalar', ru: 'Фестивали', en: 'Festivals' },
    imageUrl: '/events/rasm3.png',
    description: {
      uz: 'Xalqaro festival, zamonaviy sanʼat, elektron musiqa va ekologik tashabbuslarni birlashtiradi.',
      ru: 'Международный фестиваль, объединяющий современное искусство, электронную музыку и экологические инициативы.',
      en: 'An international festival combining contemporary art, electronic music and ecological initiatives.',
    },
    example: { uz: "Stihia festivali (Muynaq)", ru: 'Stihia Festival (Муйнак)', en: 'Stihia Festival (Muynak)' },
    result: {
      uz: "Hududning sayyohlik jozibasini oshirish va O'zbekistonning madaniy potentsialini targ'ib qilish.",
      ru: 'Повышение туристической привлекательности региона и популяризация культурного потенциала Узбекистана.',
      en: 'Increasing regional tourism appeal and promoting Uzbekistan’s cultural potential.',
    },
  },
  {
    id: 'residencies',
    title: { uz: 'Rezidentsiyalar', ru: 'Резиденции', en: 'Residencies' },
    imageUrl: '/events/rasm4.png',
    description: {
      uz: "Mahalliy va xorijiy sanʼatkorlarning hamkorlikdagi ijodiy faoliyati uchun platforma.",
      ru: 'Платформа для совместной творческой деятельности местных и зарубежных художников.',
      en: 'A platform for collaborative creative work of local and international artists.',
    },
    example: {
      uz: "Art and Culture Development Foundation rezidentsiya dasturlari",
      ru: 'Резиденциальные программы Art and Culture Development Foundation',
      en: 'Residency programs by Art and Culture Development Foundation',
    },
    result: {
      uz: 'Yangi sanʼat loyihalarini yaratish va xalqaro hamkorlikni rivojlantirish.',
      ru: 'Создание новых художественных проектов и развитие международного сотрудничества.',
      en: 'Creating new art projects and developing international collaboration.',
    },
  },
  {
    id: 'cultural-media',
    title: { uz: 'Madaniy va media loyihalar', ru: 'Культурные и медиа-проекты', en: 'Cultural & media projects' },
    imageUrl: '/events/rasm5.png',
    description: {
      uz: 'Xalqaro loyiha zamonaviy sanʼat, madaniy meros va kreativ industriyalarni birlashtiradi.',
      ru: 'Международный проект, объединяющий современное искусство, культурное наследие и креативные индустрии.',
      en: 'An international project bringing together contemporary art, cultural heritage and creative industries.',
    },
    example: { uz: "Buxoro Biennali", ru: 'Bukhara Biennale', en: 'Bukhara Biennale' },
    result: {
      uz: "Xalqaro imidjni mustahkamlash va O'zbekistonning madaniy obroʻsini oshirish.",
      ru: 'Укрепление международного имиджа и культурного авторитета Узбекистана.',
      en: 'Strengthening international reputation and cultural authority of Uzbekistan.',
    },
  },
];
