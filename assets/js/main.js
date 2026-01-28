// ===== THEME TOGGLE =====

const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('themeToggle');
const THEME_KEY = 'theme';

// 1. При завантаженні сторінки — читаємо тему з localStorage
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === 'light' || savedTheme === 'dark') {
  htmlEl.setAttribute('data-theme', savedTheme);
} else {
  // дефолт — light
  htmlEl.setAttribute('data-theme', 'light');
}

// 2. Оновлюємо іконку на кнопці
function updateThemeIcon() {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const iconSpan = themeToggleBtn.querySelector('.theme-toggle__icon');

  if (currentTheme === 'dark') {
    iconSpan.textContent = '🌙';
  } else {
    iconSpan.textContent = '🌞';
  }
}

updateThemeIcon();

// 3. Обробник кліку по кнопці
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

  htmlEl.setAttribute('data-theme', nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
  updateThemeIcon();
});

// ===== LANGUAGE SWITCHER =====

const LANG_KEY = "lang";
const langButtons = document.querySelectorAll(".lang-option");
const currentLangEl = document.getElementById("currentLang");

// 1. Завантажуємо мову з localStorage
let currentLang = localStorage.getItem(LANG_KEY) || "en";
applyTranslations(currentLang);

// 2. Обробник кліку по кнопках мов
langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    currentLang = lang;

    localStorage.setItem(LANG_KEY, lang);
    currentLangEl.textContent = lang.toUpperCase();

    applyTranslations(lang);
  });
});

// 3. Функція оновлення тексту на сторінці
function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  currentLangEl.textContent = lang.toUpperCase();
}
