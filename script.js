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

  const currentLang = () => root.getAttribute('data-lang') || 'en';

  applyLang(localStorage.getItem('lang') || 'en');

  document.querySelectorAll('.copy-email').forEach(btn => {
    let resetTimer = null;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.email).then(() => {
        const label = btn.querySelector('.copy-label');
        if (resetTimer) clearTimeout(resetTimer);

        label.classList.add('fade');
        btn.classList.add('copied');

        setTimeout(() => {
          label.textContent = TRANSLATIONS[currentLang()].cta_email_copied;
          label.classList.remove('fade');
        }, 150);

        resetTimer = setTimeout(() => {
          label.classList.add('fade');
          btn.classList.remove('copied');
          setTimeout(() => {
            label.textContent = TRANSLATIONS[currentLang()].cta_email;
            label.classList.remove('fade');
          }, 150);
        }, 2000);
      });
    });
  });

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.lang;
      localStorage.setItem('lang', selected);
      applyLang(selected);
    });
  });
})();
