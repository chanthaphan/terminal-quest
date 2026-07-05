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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
