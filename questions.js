/* ============================================
   FAMILY KNOWLEDGE — questions.js
   База питань
   ============================================ */

const CATEGORIES = [
  { id: 1, name: 'Світ навколо',          emoji: '🌍', gender: 'both' },
  { id: 2, name: 'Сім\'я та Я',           emoji: '👨‍👩‍👧‍👦', gender: 'both' },
  { id: 3, name: 'Виживання та природа',  emoji: '🔥', gender: 'both' },
  { id: 4, name: 'Розум та розвиток',     emoji: '🧠', gender: 'both' },
  { id: 5, name: 'Гроші та життя',        emoji: '💰', gender: 'both' },
  { id: 6, name: 'Домашні роботи',        emoji: '🏠', gender: 'both' },
  { id: 7, name: 'Тіло та здоров\'я',     emoji: '💪', gender: 'both' },
  { id: 8, name: 'Кохання та стосунки',   emoji: '❤️', gender: 'both' },
  { id: 9, name: 'Тільки дівчинці',       emoji: '👧', gender: 'girl' },
  { id: 10, name: 'Тільки хлопцю',        emoji: '👦', gender: 'boy'  },
];

const QUESTIONS = [
  // 🌍 СВІТ НАВКОЛО
  { id: 1,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому небо синє?',            videos: {}, text: '' },
  { id: 2,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому сонце світить?',         videos: {}, text: '' },
  { id: 3,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому йде дощ?',               videos: {}, text: '' },
  { id: 4,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому змінюються пори року?',  videos: {}, text: '' },
  { id: 5,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому вночі темно?',           videos: {}, text: '' },
  { id: 6,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому море солоне?',           videos: {}, text: '' },
  { id: 7,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Як утворюються хмари?',       videos: {}, text: '' },
  { id: 8,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому буває веселка?',         videos: {}, text: '' },
  { id: 9,  categoryId: 1, gender: 'both', minLevel: 1, question: 'Чому земля кругла?',          videos: {}, text: '' },
  { id: 10, categoryId: 1, gender: 'both', minLevel: 1, question: 'Що таке зірки?',              videos: {}, text: '' },

  // 👨‍👩‍👧‍👦 СІМ'Я ТА Я
  { id: 11, categoryId: 2, gender: 'both', minLevel: 1, question: 'Чому мене так назвали?',          videos: {}, text: '' },
  { id: 12, categoryId: 2, gender: 'both', minLevel: 1, question: 'Звідки я народився?',             videos: {}, text: '' },
  { id: 13, categoryId: 2, gender: 'both', minLevel: 1, question: 'Чому батьки іноді сваряться?',    videos: {}, text: '' },
  { id: 14, categoryId: 2, gender: 'both', minLevel: 1, question: 'Що таке смерть?',                 videos: {}, text: '' },
  { id: 15, categoryId: 2, gender: 'both', minLevel: 1, question: 'Чому люди старіють?',             videos: {}, text: '' },
  { id: 16, categoryId: 2, gender: 'both', minLevel: 2, question: 'Що буде після смерті?',           videos: {}, text: '' },
  { id: 17, categoryId: 2, gender: 'both', minLevel: 1, question: 'Чому деякі діти живуть без тата?',videos: {}, text: '' },
  { id: 18, categoryId: 2, gender: 'both', minLevel: 1, question: 'Що таке війна?',                  videos: {}, text: '' },
  { id: 19, categoryId: 2, gender: 'both', minLevel: 2, question: 'Чому тато на війні?',             videos: {}, text: '' },
  { id: 20, categoryId: 2, gender: 'both', minLevel: 1, question: 'Що таке Батьківщина?',            videos: {}, text: '' },

  // 🔥 ВИЖИВАННЯ ТА ПРИРОДА
  { id: 21, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як розпалити вогонь?',            videos: {}, text: '' },
  { id: 22, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як рубати дрова?',                videos: {}, text: '' },
  { id: 23, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як плавати?',                     videos: {}, text: '' },
  { id: 24, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як орієнтуватись в лісі?',        videos: {}, text: '' },
  { id: 25, categoryId: 3, gender: 'both', minLevel: 2, question: 'Що робити якщо загубився?',       videos: {}, text: '' },
  { id: 26, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як вижити в лісі ніч?',           videos: {}, text: '' },
  { id: 27, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як надати першу допомогу?',       videos: {}, text: '' },
  { id: 28, categoryId: 3, gender: 'both', minLevel: 2, question: 'Як поводитись під час небезпеки?',videos: {}, text: '' },
  { id: 29, categoryId: 3, gender: 'both', minLevel: 1, question: 'Які гриби можна їсти?',           videos: {}, text: '' },
  { id: 30, categoryId: 3, gender: 'both', minLevel: 1, question: 'Як поводитись з тваринами?',      videos: {}, text: '' },

  // 🧠 РОЗУМ ТА РОЗВИТОК
  { id: 31, categoryId: 4, gender: 'both', minLevel: 1, question: 'Як стати розумнішим?',            videos: {}, text: '' },
  { id: 32, categoryId: 4, gender: 'both', minLevel: 1, question: 'Чому треба вчитись?',             videos: {}, text: '' },
  { id: 33, categoryId: 4, gender: 'both', minLevel: 1, question: 'Як запам\'ятовувати краще?',      videos: {}, text: '' },
  { id: 34, categoryId: 4, gender: 'both', minLevel: 2, question: 'Як ставити цілі?',                videos: {}, text: '' },
  { id: 35, categoryId: 4, gender: 'both', minLevel: 1, question: 'Як не боятись?',                  videos: {}, text: '' },
  { id: 36, categoryId: 4, gender: 'both', minLevel: 1, question: 'Як справлятись з невдачею?',      videos: {}, text: '' },
  { id: 37, categoryId: 4, gender: 'both', minLevel: 1, question: 'Що робити коли сумно?',           videos: {}, text: '' },
  { id: 38, categoryId: 4, gender: 'both', minLevel: 1, question: 'Як вибачатись?',                  videos: {}, text: '' },
  { id: 39, categoryId: 4, gender: 'both', minLevel: 2, question: 'Що таке совість?',                videos: {}, text: '' },
  { id: 40, categoryId: 4, gender: 'both', minLevel: 2, question: 'Як говорити правду коли важко?',  videos: {}, text: '' },

  // 💰 ГРОШІ ТА ЖИТТЯ
  { id: 41, categoryId: 5, gender: 'both', minLevel: 1, question: 'Що таке гроші?',                  videos: {}, text: '' },
  { id: 42, categoryId: 5, gender: 'both', minLevel: 2, question: 'Як заробити перші гроші?',        videos: {}, text: '' },
  { id: 43, categoryId: 5, gender: 'both', minLevel: 2, question: 'Як зберігати гроші?',             videos: {}, text: '' },
  { id: 44, categoryId: 5, gender: 'both', minLevel: 3, question: 'Чому одні багаті а інші бідні?',  videos: {}, text: '' },
  { id: 45, categoryId: 5, gender: 'both', minLevel: 2, question: 'Що таке робота і навіщо вона?',   videos: {}, text: '' },

  // 🏠 ДОМАШНІ РОБОТИ
  { id: 46, categoryId: 6, gender: 'both', minLevel: 1, question: 'Як готувати їжу?',                videos: {}, text: '' },
  { id: 47, categoryId: 6, gender: 'both', minLevel: 2, question: 'Як косити траву косою?',          videos: {}, text: '' },
  { id: 48, categoryId: 6, gender: 'both', minLevel: 1, question: 'Як прибирати вдома?',             videos: {}, text: '' },
  { id: 49, categoryId: 6, gender: 'both', minLevel: 2, question: 'Як лагодити речі?',               videos: {}, text: '' },
  { id: 50, categoryId: 6, gender: 'both', minLevel: 2, question: 'Як садити город?',                videos: {}, text: '' },

  // ❤️ КОХАННЯ ТА СТОСУНКИ
  { id: 51, categoryId: 8, gender: 'both', minLevel: 1, question: 'Що таке любов?',                  videos: {}, text: '' },
  { id: 52, categoryId: 8, gender: 'both', minLevel: 2, question: 'Як знайти справжнього друга?',    videos: {}, text: '' },
  { id: 53, categoryId: 8, gender: 'both', minLevel: 3, question: 'Чому люди розлучаються?',         videos: {}, text: '' },
  { id: 54, categoryId: 8, gender: 'both', minLevel: 4, question: 'Звідки беруться діти?',           videos: {}, text: '' },

  // 👧 ТІЛЬКИ ДІВЧИНЦІ
  { id: 55, categoryId: 9, gender: 'girl', minLevel: 3, question: 'Що таке місячні?',                videos: {}, text: '' },
  { id: 56, categoryId: 9, gender: 'girl', minLevel: 2, question: 'Як бути справжньою жінкою?',      videos: {}, text: '' },
  { id: 57, categoryId: 9, gender: 'girl', minLevel: 2, question: 'Чому хлопці такі дивні?',         videos: {}, text: '' },

  // 👦 ТІЛЬКИ ХЛОПЦЮ
  { id: 58, categoryId: 10, gender: 'boy', minLevel: 3, question: 'Що таке честь чоловіка?',         videos: {}, text: '' },
  { id: 59, categoryId: 10, gender: 'boy', minLevel: 2, question: 'Як бути сильним не тільки тілом?',videos: {}, text: '' },
  { id: 60, categoryId: 10, gender: 'boy', minLevel: 3, question: 'Що значить захищати сім\'ю?',     videos: {}, text: '' },
   { id: 61, categoryId: 1, gender: 'both', minLevel: 1, question: 'TEST', videos: { 
    1: 'https://drive.google.com/file/d/1CxthuEzkrrTI-g5nAdU5b5u-jJJN-7nm/preview'
  }, 
  text: '',
},
];
