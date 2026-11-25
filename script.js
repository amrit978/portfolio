
const loaderScreen = document.getElementById("loader-screen");
const HOLD_TIME = 600;                // after the animation ends, keep the finished word on screen for 1s
const TEXT_FADE = 500;                 // then fade the "loading" word out completely (ms)
const SCREEN_FADE = 400;               // then fade the dark screen away to show home (ms)
const letters = loaderScreen.querySelectorAll(".loader span");
let hidden = false;
let pageLoaded = false;
let animationDone = false;
let settled = 0;

function revealHome() {
  if (hidden) return;
  hidden = true;
  loaderScreen.style.transition = `opacity ${SCREEN_FADE}ms ease, visibility ${SCREEN_FADE}ms ease`;
  loaderScreen.classList.add("hide");
  document.body.classList.remove("loading");
  loaderScreen.addEventListener("transitionend", (e) => {
    if (e.target === loaderScreen) loaderScreen.remove();   // ignore events bubbling up from the word
  });
}

// step 2: fade the "loading" word out completely, and only then show home
let exiting = false;
function startExit() {
  if (exiting || hidden) return;
  exiting = true;
  const word = loaderScreen.querySelector(".loader");
  let next = false;
  const done = () => { if (next) return; next = true; revealHome(); };
  word.style.transition = `opacity ${TEXT_FADE}ms ease`;
  word.style.opacity = "0";
  word.addEventListener("transitionend", done, { once: true });
  setTimeout(done, TEXT_FADE + 150);   // fallback if transitionend does not fire
}

// step 1: home is only revealed when BOTH the page has loaded AND the loading animation has finished
function tryReveal() {
  if (pageLoaded && animationDone) setTimeout(startExit, HOLD_TIME);
}

// each letter rises once and then stays in place; when the last one has landed the animation is complete
letters.forEach((letter) => {
  letter.addEventListener("animationiteration", () => {
    letter.style.animationPlayState = "paused";
    settled += 1;
    if (settled === letters.length) {
      animationDone = true;
      tryReveal();
    }
  }, { once: true });
});

// fallback in case animation events never fire (e.g. "reduce motion" turns the animation off)
setTimeout(() => { animationDone = true; tryReveal(); }, 1800);

function onPageLoaded() {
  pageLoaded = true;
  tryReveal();
}

if (document.readyState === "complete") {
  onPageLoaded();
} else {
  window.addEventListener("load", onPageLoaded);
}

setTimeout(revealHome, 8000);          // safety: never leave visitors stuck on a slow load


const links = document.querySelectorAll('.nav-elements a');
const sections = document.querySelectorAll('#home, #about, #skills, #projects, #contact');
const navBar = document.querySelector('.nav-bar');
const navToggle = document.getElementById('nav-toggle');
const compact = window.matchMedia('(max-width: 1100px)');

/* ---- mobile menu toggle ---- */
if (navToggle && navBar) {
  function closeMenu() {
    navBar.classList.remove('menu-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navBar.classList.toggle('menu-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!navBar.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navBar.classList.contains('menu-open')) {
      closeMenu();
    }
  });
}

// Highlight the nav link of the section under a reference line.
// Desktop: the middle of the screen (as before). Small screens: just below
// the fixed nav, because sections are short there.
function updateActiveLink() {
  const line = compact.matches ? navBar.offsetHeight + 30 : window.innerHeight / 2;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let current = null;

  sections.forEach((section) => {
    const r = section.getBoundingClientRect();
    if (r.top <= line && r.bottom > line) current = section;
  });
  if (atBottom) current = sections[sections.length - 1];

  links.forEach((link) => {
    link.classList.toggle('active', !!current && link.getAttribute('href') === '#' + current.id);
  });
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateActiveLink(); ticking = false; });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
updateActiveLink();


/* ---- always start at the top (home) on reload ---- */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function goHome() {
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  window.scrollTo(0, 0);
}

goHome();
window.addEventListener('load', goHome);
window.addEventListener('pageshow', (e) => { if (e.persisted) goHome(); });


/* ---- performance: pause the 3D cube animation while it is off-screen ---- */
const boxes = document.querySelector('.boxes');
if (boxes && 'IntersectionObserver' in window) {
  new IntersectionObserver((entries) => {
    boxes.classList.toggle('is-offscreen', !entries[0].isIntersecting);
  }, { rootMargin: '100px' }).observe(boxes);
}


/* ---- interactive projects showcase switcher ---- */
const projectNavItems = document.querySelectorAll('.project-nav-item');
const projectDisplay = document.getElementById('p-panel');
const projCounter = document.getElementById('proj-counter');
const projTitle = document.getElementById('proj-title');
const projTagline = document.getElementById('proj-tagline');
const projDesc = document.getElementById('proj-desc');
const projTech = document.getElementById('proj-tech');
const projLink = document.getElementById('proj-link');
const projImage = document.getElementById('proj-image');
const projWindowTitle = document.getElementById('proj-window-title');

if (projectNavItems.length && projectDisplay) {
  const projectsData = [
    {
      num: '01 / 04 · pomodoro/',
      title: 'Pomodoro Timer',
      tagline: 'a focus timer that lives on your desktop.',
      desc: 'A simple desktop Pomodoro timer built with C++ and Qt6 Widgets to boost focus and track productivity intervals.',
      tech: ['C++17', 'Qt6 (Widgets)', 'CMake'],
      link: 'https://github.com/amrit978/pomodoro-timer',
      img: 'img/pomodoro-timer_preview.png',
      windowTitle: 'pomodoro-timer.app'
    },
    {
      num: '02 / 04 · wishfor/',
      title: 'Wishfor',
      tagline: 'a quiet room where everyone wears a mask.',
      desc: 'An anonymous peer sanctuary where anyone can share whatever weighs on them without judgment, tracking, or identity exposure.',
      tech: ['Next.js 14', 'TypeScript 5', 'Tailwind CSS', 'Web Audio API', 'Node.js crypto'],
      link: 'https://github.com/amrit978/Wishfor',
      img: 'img/Wishfor_preview.png',
      windowTitle: 'wishfor.sanctuary'
    },
    {
      num: '03 / 04 · tipcalculator/',
      title: 'Tip Calculator',
      tagline: 'real-time bill splitting with dark mode.',
      desc: 'A sleek single-page tip calculator featuring instant real-time bill calculations, custom tipping percentages, and responsive dark mode.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://github.com/amrit978/Tip-Calculator',
      img: 'img/tipcalculator_preview.png',
      windowTitle: 'tip-calculator.web'
    },
    {
      num: '04 / 04 · expensetracker/',
      title: 'Expense Tracker',
      tagline: 'know where your money goes.',
      desc: 'A personal finance web app to record, categorize, and review expenses with date filters and visual budget breakdowns.',
      tech: ['Python', 'Flask', 'SQLite', 'Jinja2', 'HTML5', 'CSS3'],
      link: 'https://github.com/amrit978/Expense-Tracker',
      img: 'img/expensetracker_preview.png',
      windowTitle: 'expense-tracker.py'
    }
  ];

  let activeIndex = 0;
  let isSwitching = false;

  function setProject(index) {
    if (index === activeIndex || isSwitching) return;
    const data = projectsData[index];
    if (!data) return;

    isSwitching = true;
    activeIndex = index;

    // Update nav active states
    projectNavItems.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    // Cross-fade animation
    projectDisplay.classList.add('is-switching');

    setTimeout(() => {
      projCounter.textContent = data.num;
      projTitle.textContent = data.title;
      projTagline.textContent = data.tagline;
      projDesc.textContent = data.desc;
      projLink.href = data.link;
      projWindowTitle.textContent = data.windowTitle;
      projImage.src = data.img;
      projImage.alt = `${data.title} preview`;

      // Render tech pills
      projTech.innerHTML = '';
      data.tech.forEach((t) => {
        const pill = document.createElement('span');
        pill.className = 'tech-pill';
        pill.textContent = t;
        projTech.appendChild(pill);
      });

      projectDisplay.classList.remove('is-switching');
      isSwitching = false;
    }, 180);
  }

  projectNavItems.forEach((btn, idx) => {
    btn.addEventListener('click', () => setProject(idx));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (idx + 1) % projectNavItems.length;
        projectNavItems[next].focus();
        setProject(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (idx - 1 + projectNavItems.length) % projectNavItems.length;
        projectNavItems[prev].focus();
        setProject(prev);
      }
    });
  });
}


/* ---- rotating quotes below contact tagline ---- */
const contactQuoteText = document.getElementById('contact-quote-text');
if (contactQuoteText) {
  const contactQuotes = [
    '"shall we play a game?" - WarGames, 1983.',
    '"welcome to the real world." - The Matrix, 1999',
    '"may the force be with you." - Star Wars, 1977',
    '"sic parvis magna." - Uncharted, 2007',
    '"nothing is true, everything is permitted." - Assassin\'s Creed, 2007',
    '"praise the sun!" - Dark Souls, 2011',
    '"stay awhile and listen." - Diablo, 1996',
    '"hey, you. you\'re finally awake." - Skyrim, 2011'
  ];

  let currentQuoteIndex = 0;
  const FADE_OUT_MS = 450;
  const DISPLAY_MS = 3400;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function cycleQuote() {
    if (prefersReduced.matches) {
      currentQuoteIndex = (currentQuoteIndex + 1) % contactQuotes.length;
      contactQuoteText.textContent = contactQuotes[currentQuoteIndex];
      return;
    }

    contactQuoteText.classList.add('is-fading');
    setTimeout(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % contactQuotes.length;
      contactQuoteText.textContent = contactQuotes[currentQuoteIndex];
      contactQuoteText.classList.remove('is-fading');
    }, FADE_OUT_MS);
  }

  setInterval(cycleQuote, DISPLAY_MS + FADE_OUT_MS);
}



