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

// 4. Lang switcher with i18n

document.addEventListener("DOMContentLoaded", () => {
  const LANG_KEY = "lang";
  const langButtons = document.querySelectorAll(".lang-option");
  const currentLangEl = document.getElementById("currentLang");
  const switcher = document.querySelector(".lang-switcher");
  const switcherBtn = document.querySelector(".lang-switcher__button");

  // Поточна мова
  let currentLang = localStorage.getItem(LANG_KEY) || "en";

  console.log("DOM loaded. Current language:", currentLang);
  applyTranslations(currentLang);

  // === Відкриття/закриття дропдауну ===
  switcherBtn.addEventListener("click", () => {
    switcher.classList.toggle("open");
  });

  // Закриття при кліку поза меню
  document.addEventListener("click", (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove("open");
    }
  });

  // === Обробка кліку по мовам ===
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      console.log("Clicked:", lang);

      currentLang = lang;
      localStorage.setItem(LANG_KEY, lang);
      applyTranslations(lang);

      switcher.classList.remove("open"); // закриваємо меню після вибору
    });
  });

  // === Функція перекладу ===
  function applyTranslations(lang) {
    console.log("Applying language:", lang);
    const langData = translations[lang];

    if (!langData) {
      console.warn("No translations found for:", lang);
      return;
    }

    const elements = document.querySelectorAll("[data-i18n]");
    console.log("Found elements:", elements.length);

    elements.forEach(el => {
      const key = el.dataset.i18n?.trim();
      const translation = langData[key];

      console.log("Key:", key, "| Translation:", translation);

      if (translation) {
        el.textContent = translation;
      } else {
        el.textContent = `[${key}]`;
        console.warn("Missing translation for:", key);
      }
    });

    if (currentLangEl) {
      currentLangEl.textContent = lang.toUpperCase();
    }

    console.log("Translation applied.");
  }
});

// === Бургер меню ===

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

/* Закриваємо меню при кліку на будь-який пункт */
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* Пасхалка */
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




