/* GIDA Labs: additive, opt-in speech accessibility controls. */
(function () {
  'use strict';
  const synth = window.speechSynthesis;
  if (!synth || !window.SpeechSynthesisUtterance) return;
  let utterance = null;
  let lastText = '';
  let lastLang = 'en-US';
  const toolbar = document.createElement('section');
  toolbar.id = 'gida-audio-toolbar';
  toolbar.setAttribute('aria-label', 'Audio accessibility controls');
  toolbar.innerHTML = `<strong>🔊 Audio Accessibility</strong>
    <button type="button" id="gida-read-screen">Read page</button>
    <button type="button" id="gida-read-selection">Read selection</button>
    <button type="button" id="gida-read-focus">Read focused item</button>
    <button type="button" id="gida-audio-pause">Pause / Resume</button>
    <button type="button" id="gida-audio-stop">Stop</button>
    <label for="gida-audio-rate">Speed</label><select id="gida-audio-rate"><option value="0.75">Slow</option><option value="1" selected>Normal</option><option value="1.25">Fast</option></select>
    <label for="gida-audio-lang">Language</label><select id="gida-audio-lang"><option value="en-US">English</option><option value="es-ES">Español</option><option value="ko-KR">한국어</option></select>
    <span id="gida-audio-status" role="status" aria-live="polite">Ready. Select text or use a reading button.</span>`;
  const style = document.createElement('style');
  style.textContent = `#gida-audio-toolbar{padding:10px 14px;background:#e8f1f7;border-top:2px solid #778d99;border-bottom:2px solid #778d99;display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:.85rem;color:#1d4f75}#gida-audio-toolbar button{margin:0;padding:6px 9px}#gida-audio-toolbar select{padding:5px;border:1px solid #778d99;background:#fff}#gida-audio-status{flex-basis:100%;font-size:.8rem;color:#40525b}#gida-audio-toolbar button:focus-visible,#gida-audio-toolbar select:focus-visible{outline:3px solid #c38300;outline-offset:2px}`;
  document.head.appendChild(style);
  const windowEl = document.querySelector('.window');
  if (!windowEl) return;
  windowEl.parentNode.insertBefore(toolbar, windowEl);
  const status = message => { document.getElementById('gida-audio-status').textContent = message; };
  function speak(text, lang) {
    const clean = (text || '').replace(/\s+/g, ' ').trim();
    if (!clean) { status('No readable text found.'); return; }
    synth.cancel();
    lastText = clean;
    lastLang = lang || document.getElementById('gida-audio-lang').value;
    utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lastLang;
    utterance.rate = Number(document.getElementById('gida-audio-rate').value);
    utterance.onstart = () => status('Reading aloud.');
    utterance.onend = () => status('Reading complete.');
    utterance.onerror = e => { if (e.error !== 'interrupted' && e.error !== 'canceled') status('Speech unavailable: ' + e.error); };
    synth.speak(utterance);
  }
  function readableText(el) {
    if (!el) return '';
    const copy = el.cloneNode(true);
    copy.querySelectorAll('script,style,button,select,input,textarea,[hidden],[aria-hidden="true"],.feedback,.correct,.incorrect').forEach(n => n.remove());
    return copy.textContent || '';
  }
  document.getElementById('gida-read-screen').addEventListener('click', () => speak(readableText(document.getElementById('screen'))));
  document.getElementById('gida-read-selection').addEventListener('click', () => speak(String(window.getSelection() || '')));
  let focused = null;
  document.addEventListener('focusin', e => { if (!toolbar.contains(e.target)) focused = e.target; });
  document.getElementById('gida-read-focus').addEventListener('click', () => {
    const el = focused;
    const text = el && (el.getAttribute('aria-label') || el.value || readableText(el));
    speak(text);
  });
  document.getElementById('gida-audio-pause').addEventListener('click', () => {
    if (synth.paused) { synth.resume(); status('Reading resumed.'); }
    else if (synth.speaking) { synth.pause(); status('Reading paused.'); }
    else if (lastText) speak(lastText, lastLang);
  });
  document.getElementById('gida-audio-stop').addEventListener('click', () => { synth.cancel(); status('Reading stopped.'); });
  window.addEventListener('pagehide', () => synth.cancel());
})();
