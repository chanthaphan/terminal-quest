/* Terminal Quest — draggable divider that sets the stage/terminal split.
   Adjusts #stage's flex-basis; the WebGL stage's ResizeObserver refits the canvas
   automatically. The chosen ratio is remembered across sessions. */
(function () {
  const KEY = 'terminal-quest-split-v1';
  const MIN = 30, MAX = 78; // % of the main column given to the stage

  function init() {
    const main = document.getElementById('layout-main');
    const stage = document.getElementById('stage');
    const rez = document.getElementById('stage-resize');
    if (!main || !stage || !rez) return;

    const apply = (pct) => { stage.style.flexBasis = Math.max(MIN, Math.min(MAX, pct)).toFixed(1) + '%'; };
    const saved = parseFloat(localStorage.getItem(KEY));
    if (saved >= MIN && saved <= MAX) apply(saved);

    let dragging = false;
    rez.addEventListener('pointerdown', (e) => {
      dragging = true;
      rez.classList.add('dragging');
      rez.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    rez.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const r = main.getBoundingClientRect();
      apply(((e.clientY - r.top) / r.height) * 100);
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      rez.classList.remove('dragging');
      const pct = parseFloat(stage.style.flexBasis);
      if (pct) localStorage.setItem(KEY, pct.toFixed(1));
    };
    rez.addEventListener('pointerup', end);
    rez.addEventListener('pointercancel', end);
    // Double-click resets to the default split.
    rez.addEventListener('dblclick', () => { stage.style.flexBasis = ''; localStorage.removeItem(KEY); });
  }

  // On iOS the on-screen keyboard scrolls the page so only the focused terminal
  // input stays visible and the game vanishes. Instead, shrink the layout to the
  // visual viewport (flex re-distributes: scene + dialog + terminal all stay on
  // screen) and pin the scroll position.
  function initKeyboardFit() {
    const vv = window.visualViewport;
    if (!vv) return;
    const fit = () => {
      const full = window.innerHeight;
      // only intervene when something (the keyboard) actually eats real space
      document.body.style.height = (full - vv.height > 60) ? Math.round(vv.height) + 'px' : '';
      window.scrollTo(0, 0);
    };
    // iOS fires resize DURING the keyboard animation — a single reaction can
    // capture a stale height. Re-check on a settle burst after every trigger.
    let timers = [];
    const settle = () => {
      fit();
      timers.forEach(clearTimeout);
      timers = [150, 400, 800].map((ms) => setTimeout(fit, ms));
    };
    vv.addEventListener('resize', settle);
    vv.addEventListener('scroll', () => window.scrollTo(0, 0));
    // keyboard show/hide follows focus of the terminal input
    document.addEventListener('focusin', settle);
    document.addEventListener('focusout', settle);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { init(); initKeyboardFit(); });
  else { init(); initKeyboardFit(); }
})();
