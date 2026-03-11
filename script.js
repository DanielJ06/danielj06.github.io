(() => {
  const root = document.documentElement;

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (TRANSLATIONS[lang][key] !== undefined) {
        el.innerHTML = TRANSLATIONS[lang][key];
      }
    });
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  applyLang(localStorage.getItem('lang') || 'en');

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      localStorage.setItem('lang', selected);
      applyLang(selected);
    });
  });
})();
