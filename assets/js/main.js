// ===== THEME TOGGLE =====

const htmlEl = document.documentElement;
const themeToggleBtn = document.getElementById('themeToggle');
const THEME_KEY = 'theme';

// 1. При завантаженні сторінки — читаємо тему з localStorage
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === 'light' || savedTheme === 'dark') {
  htmlEl.setAttribute('data-theme', savedTheme);
} else {
  htmlEl.setAttribute('data-theme', 'light');
}

// 2. Оновлюємо іконку на кнопці
function updateThemeIcon() {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const iconSpan = themeToggleBtn.querySelector('.theme-toggle__icon');

  iconSpan.textContent = currentTheme === 'dark' ? '🌙' : '🌞';
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


// ===== LANGUAGE SWITCHER + i18n =====

document.addEventListener("DOMContentLoaded", () => {
  const LANG_KEY = "lang";
  const langButtons = document.querySelectorAll(".lang-option");
  const currentLangEl = document.getElementById("currentLang");
  const switcher = document.getElementById("langSwitcher");
  const switcherBtn = switcher.querySelector(".lang-switcher__button");

  // Мапа прапорів
  const FLAG_MAP = {
    en: "assets/img/united-kingdom-uk-svgrepo-com.svg",
    uk: "assets/img/ukraine-svgrepo-com.svg",
    pl: "assets/img/poland-svgrepo-com.svg",
  };

  // Поточна мова
  let currentLang = localStorage.getItem(LANG_KEY) || "en";

  // Встановлюємо прапор у кнопці
  currentLangEl.innerHTML = `<img src="${FLAG_MAP[currentLang]}" alt="${currentLang} flag">`;

  // Застосовуємо переклад
  applyTranslations(currentLang);

  // Відкриття/закриття меню
  switcherBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    switcher.classList.toggle("open");
  });

  // Закриття при кліку поза меню
  document.addEventListener("click", () => {
    switcher.classList.remove("open");
  });

  // Клік по мові
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;

      currentLang = lang;
      localStorage.setItem(LANG_KEY, lang);

      // Оновлюємо прапор
      currentLangEl.innerHTML = `<img src="${FLAG_MAP[lang]}" alt="${lang} flag">`;

      // Оновлюємо переклад
      applyTranslations(lang);

      switcher.classList.remove("open");
    });
  });
});


// === Функція перекладу ===
function applyTranslations(lang) {
  const langData = translations[lang];
  if (!langData) return;

  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach(el => {
    const key = el.dataset.i18n?.trim();
    const translation = langData[key];

    el.textContent = translation || `[${key}]`;
  });
}


// ===== BURGER MENU =====

const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileLinks = document.querySelectorAll('.mobile-nav__link');

function openMenu() {
  mobileNav.classList.add('open');
  overlay.classList.add('visible');
}

function closeMenu() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('visible');
}

burger.addEventListener('click', openMenu);
mobileNavClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});


// ===== FOOTER EASTER EGG =====

const egg = document.querySelector('.footer-easter-egg');

if (egg) {
  egg.addEventListener('mouseenter', () => {
    egg.dataset.original = egg.textContent;
    egg.textContent = "Okay... maybe one bug. Click me.";
    egg.style.cursor = "pointer";
  });

  egg.addEventListener('mouseleave', () => {
    egg.textContent = egg.dataset.original;
    egg.style.cursor = "default";
  });

  egg.addEventListener('click', () => {
    window.open("https://github.com/DmytroIstratov/qa-portfolio", "_blank");
  });
}





