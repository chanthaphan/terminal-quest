/* Terminal Quest — i18n: English-keyed dictionary lookup with graceful fallback */
(function () {
  const CLIQ = (window.CLIQ = window.CLIQ || { commands: {}, modules: [] });

  CLIQ.i18n = {
    lang: 'en',
    dicts: {}, // lang -> { 'English source string': 'translation' }

    register(lang, dict) {
      this.dicts[lang] = Object.assign(this.dicts[lang] || {}, dict);
    },

    // Translate a source string. Unknown strings fall back to English,
    // so partially translated realms stay fully playable.
    t(s) {
      if (this.lang === 'en' || s == null) return s;
      const d = this.dicts[this.lang];
      return (d && d[s]) || s;
    },
  };

  // t + {placeholder} filling for dynamic strings
  CLIQ.trf = function (tpl, vars) {
    let s = CLIQ.i18n.t(tpl);
    for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  };

  CLIQ.tr = (s) => CLIQ.i18n.t(s);
})();
