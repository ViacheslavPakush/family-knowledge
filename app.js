/* ============================================
   FAMILY KNOWLEDGE — app.js
   ============================================ */

const STATE = {
  currentChild: null,
  currentCategory: null,
  currentQuestion: null,
};

// ── Профілі дітей ──────────────────────────
const CHILDREN = [
  {
    id: 1,
    name: 'KAMILA',
    emoji: '👧',
    gender: 'girl',
    birthYear: 2017,
    level: 3,
    passwords: {
      2: 'СОНЕЧКО',
      3: 'ЗІРКА',
      4: 'МУДРІСТЬ',
      5: 'СВОБОДА',
    }
  },
  {
    id: 2,
    name: 'MAKS',
    emoji: '👦',
    gender: 'boy',
    birthYear: 2013,
    level: 4,
    passwords: {
      2: 'ОРЕЛ',
      3: 'ВОЇН',
      4: 'ЧЕСТЬ',
      5: 'СИЛА',
    }
  },
];

// ── Ініціалізація ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProfiles();
});

// ── Показати екран ─────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Профілі ────────────────────────────────
function renderProfiles() {
  const list = document.getElementById('profiles-list');
  list.innerHTML = '';

  CHILDREN.forEach(child => {
    const age = new Date().getFullYear() - child.birthYear;
    const div = document.createElement('div');
    div.className = 'profile-card';
    div.onclick = () => selectChild(child);
    div.innerHTML = `
      <div class="profile-emoji">${child.emoji}</div>
      <div class="profile-info">
        <div class="profile-name">${child.name}</div>
        <div class="profile-age">${age} років</div>
      </div>
      <div class="profile-level">Рівень ${child.level}</div>
    `;
    list.appendChild(div);
  });
}

// ── Вибір дитини ───────────────────────────
function selectChild(child) {
  STATE.currentChild = child;
  renderCategories(child);
  showScreen('screen-categories');

  const title = document.getElementById('categories-title');
  title.textContent = `Привіт, ${child.name}! 👋`;

  const badge = document.getElementById('child-level-badge');
  badge.textContent = `Рівень ${child.level}`;
}

// ── Категорії ──────────────────────────────
function renderCategories(child) {
  const list = document.getElementById('categories-list');
  list.innerHTML = '';

  CATEGORIES.forEach(cat => {
    // Фільтр по статі
    if (cat.gender !== 'both' && cat.gender !== child.gender) return;

    // Рахуємо доступні питання
    const available = QUESTIONS.filter(q =>
      q.categoryId === cat.id &&
      q.minLevel <= child.level &&
      (q.gender === 'both' || q.gender === child.gender)
    );

    if (available.length === 0) return;

    const hasVideo = available.filter(q =>
      q.videos && Object.keys(q.videos).length > 0
    ).length;

    const div = document.createElement('div');
    div.className = 'category-card';
    div.onclick = () => selectCategory(cat);
    div.innerHTML = `
      <div class="category-emoji">${cat.emoji}</div>
      <div class="category-info">
        <div class="category-name">${cat.name}</div>
        <div class="category-count">
          ${available.length} питань · 
          ${hasVideo} відповідей від тата
        </div>
      </div>
      <div class="category-arrow">›</div>
    `;
    list.appendChild(div);
  });
}

// ── Вибір категорії ────────────────────────
function selectCategory(cat) {
  STATE.currentCategory = cat;
  renderQuestions(cat);
  showScreen('screen-questions');

  document.getElementById('questions-title').textContent =
    `${cat.emoji} ${cat.name}`;
}

// ── Питання ────────────────────────────────
function renderQuestions(cat) {
  const list = document.getElementById('questions-list');
  const child = STATE.currentChild;
  list.innerHTML = '';

  const questions = QUESTIONS.filter(q =>
    q.categoryId === cat.id &&
    q.minLevel <= child.level &&
    (q.gender === 'both' || q.gender === child.gender)
  );

  questions.forEach(q => {
    const hasVideo = q.videos &&
      Object.keys(q.videos).length > 0;

    const div = document.createElement('div');
    div.className = 'question-item';
    div.onclick = () => selectQuestion(q);
    div.innerHTML = `
      <div class="question-status">
        ${hasVideo ? '✅' : '⭕'}
      </div>
      <div class="question-text">${q.question}</div>
      <div class="question-arrow">›</div>
    `;
    list.appendChild(div);
  });
}

// ── Вибір питання ──────────────────────────
function selectQuestion(q) {
  STATE.currentQuestion = q;
  showScreen('screen-video');

  document.getElementById('video-title').textContent = q.question;

  const container = document.getElementById('video-container');
  const textEl = document.getElementById('video-text');

  const child = STATE.currentChild;
  const level = child.level;

  // Шукаємо відео для поточного рівня
  const videoUrl = q.videos[level] ||
    q.videos[level - 1] ||
    q.videos[1] ||
    null;

  if (videoUrl) {
    container.innerHTML = `
      <iframe
        src="${videoUrl}"
        frameborder="0"
        allowfullscreen
        style="width:100%;height:100%;border-radius:14px"
      ></iframe>
    `;
    textEl.style.display = q.text ? 'block' : 'none';
    textEl.textContent = q.text || '';
  } else {
    container.innerHTML = `
      <div class="no-video">
        <div class="no-video-emoji">🎬</div>
        <div class="no-video-text">
          Тато ще не записав відповідь<br/>
          на це питання.<br/>
          <strong>Скоро буде!</strong>
        </div>
      </div>
    `;
    textEl.style.display = 'none';
  }
}

// ── Адмін логін ────────────────────────────
function showAdminLogin() {
  showScreen('screen-admin-login');
}

function checkAdminPassword() {
  const input = document.getElementById('admin-password-input');
  // Змін цей пароль на свій!
  if (input.value === 'ADMIN2024') {
    input.value = '';
    renderAdminPanel();
    showScreen('screen-admin');
  } else {
    alert('Невірний пароль!');
    input.value = '';
  }
}

// ── Адмін панель ───────────────────────────
function renderAdminPanel() {
  // Питання без відео
  const emptyList = document.getElementById('admin-empty-questions');
  emptyList.innerHTML = '';

  const empty = QUESTIONS.filter(q =>
    !q.videos || Object.keys(q.videos).length === 0
  );

  if (empty.length === 0) {
    emptyList.innerHTML = `
      <p style="color:#39ff14">
        ✅ Всі питання мають відео!
      </p>`;
    return;
  }

  empty.forEach(q => {
    const cat = CATEGORIES.find(c => c.id === q.categoryId);
    const div = document.createElement('div');
    div.className = 'admin-question-item';
    div.innerHTML = `
      <div class="admin-question-text">
        ${cat ? cat.emoji : ''} ${q.question}
      </div>
      <button class="btn-add-video" 
        onclick="addVideoToQuestion(${q.id})">
        + Відео
      </button>
    `;
    emptyList.appendChild(div);
  });

  // Заповнюємо select категорій
  const select = document.getElementById('new-question-category');
  select.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = `${cat.emoji} ${cat.name}`;
    select.appendChild(option);
  });
}

// ── Додати відео до питання ────────────────
function addVideoToQuestion(questionId) {
  const url = prompt(
    'Встав YouTube посилання для цього питання:\n' +
    '(формат: https://www.youtube.com/embed/VIDEO_ID)'
  );
  if (!url) return;

  const level = prompt('Для якого рівня? (1-5)');
  if (!level) return;

  const q = QUESTIONS.find(q => q.id === questionId);
  if (q) {
    q.videos[parseInt(level)] = url;
    alert('✅ Відео додано!');
    renderAdminPanel();
  }
}

// ── Додати питання ─────────────────────────
function addQuestion() {
  const text = document.getElementById('new-question-text').value.trim();
  const categoryId = parseInt(
    document.getElementById('new-question-category').value
  );
  const gender = document.getElementById('new-question-gender').value;

  if (!text) {
    alert('Введи текст питання!');
    return;
  }

  const newId = Math.max(...QUESTIONS.map(q => q.id)) + 1;

  QUESTIONS.push({
    id: newId,
    categoryId,
    gender,
    minLevel: 1,
    question: text,
    videos: {},
    text: '',
  });

  document.getElementById('new-question-text').value = '';
  alert(`✅ Питання додано!\n"${text}"`);
  renderAdminPanel();
}
