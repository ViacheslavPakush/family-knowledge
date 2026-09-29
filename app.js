/* ============================================
   FAMILY KNOWLEDGE — app.js
   ============================================ */

const STATE = {
  currentChild: null,
  currentCategory: null,
  currentQuestion: null,
};

const CHILDREN = [
  {
    id: 1,
    name: 'KAMILA',
    emoji: '👧',
    gender: 'girl',
    birthYear: 2017,
    level: 3,
  },
  {
    id: 2,
    name: 'MAKS',
    emoji: '👦',
    gender: 'boy',
    birthYear: 2013,
    level: 4,
  },
];

function showScreen(id) {
  document.querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function renderProfiles() {
  const list = document.getElementById('profiles-list');
  if (!list) return;
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

function selectChild(child) {
  STATE.currentChild = child;

  const title = document.getElementById('categories-title');
  if (title) title.textContent = `Привіт, ${child.name}! 👋`;

  const badge = document.getElementById('child-level-badge');
  if (badge) badge.textContent = `Рівень ${child.level}`;

  renderCategories(child);
  showScreen('screen-categories');
}

function renderCategories(child) {
  const list = document.getElementById('categories-list');
  if (!list) return;
  list.innerHTML = '';

  CATEGORIES.forEach(cat => {
    if (cat.gender !== 'both' && cat.gender !== child.gender) return;

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

function selectCategory(cat) {
  STATE.currentCategory = cat;

  const title = document.getElementById('questions-title');
  if (title) title.textContent = `${cat.emoji} ${cat.name}`;

  renderQuestions(cat);
  showScreen('screen-questions');
}

function renderQuestions(cat) {
  const list = document.getElementById('questions-list');
  const child = STATE.currentChild;
  if (!list || !child) return;
  list.innerHTML = '';

  const questions = QUESTIONS.filter(q =>
    q.categoryId === cat.id &&
    q.minLevel <= child.level &&
    (q.gender === 'both' || q.gender === child.gender)
  );

  questions.forEach(q => {
    const hasVideo = q.videos && Object.keys(q.videos).length > 0;
    const div = document.createElement('div');
    div.className = 'question-item';
    div.onclick = () => selectQuestion(q);
    div.innerHTML = `
      <div class="question-status">${hasVideo ? '✅' : '⭕'}</div>
      <div class="question-text">${q.question}</div>
      <div class="question-arrow">›</div>
    `;
    list.appendChild(div);
  });
}

function selectQuestion(q) {
  STATE.currentQuestion = q;

  const title = document.getElementById('video-title');
  if (title) title.textContent = q.question;

  const container = document.getElementById('video-container');
  const textEl = document.getElementById('video-text');
  if (!container) return;

  const child = STATE.currentChild;
  const level = child.level;

  const videoUrl = q.videos[level] ||
    q.videos[level - 1] ||
    q.videos[1] ||
    null;

  if (videoUrl) {
    container.innerHTML = `
      <iframe
        src="${videoUrl}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; 
               encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width:100%;height:100%;border:none;border-radius:14px"
      ></iframe>
    `;
    if (textEl) {
      textEl.style.display = q.text ? 'block' : 'none';
      textEl.textContent = q.text || '';
    }
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
    if (textEl) textEl.style.display = 'none';
  }

  showScreen('screen-video');
}

function showAdminLogin() {
  showScreen('screen-admin-login');
}

function checkAdminPassword() {
  const input = document.getElementById('admin-password-input');
  if (input.value === 'ADMIN2024') {
    input.value = '';
    renderAdminPanel();
    showScreen('screen-admin');
  } else {
    alert('Невірний пароль!');
    input.value = '';
  }
}

function renderAdminPanel() {
  const emptyList = document.getElementById('admin-empty-questions');
  if (!emptyList) return;
  emptyList.innerHTML = '';

  const empty = QUESTIONS.filter(q =>
    !q.videos || Object.keys(q.videos).length === 0
  );

  if (empty.length === 0) {
    emptyList.innerHTML = `
      <p style="color:#39ff14">✅ Всі питання мають відео!</p>
    `;
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

  const select = document.getElementById('new-question-category');
  if (select) {
    select.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = `${cat.emoji} ${cat.name}`;
      select.appendChild(option);
    });
  }
}

function addVideoToQuestion(questionId) {
  const url = prompt(
    'Встав посилання для цього питання:'
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

document.addEventListener('DOMContentLoaded', () => {
  renderProfiles();
});
