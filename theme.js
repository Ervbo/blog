// Shared dark/light mode toggle — used on every page.
(function () {
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', mode);

  function render() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML =
      mode === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  render();

  if (toggle) {
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', mode);
      render();
    });
  }
})();


/* Site-wide "back to ervbo.com" link: injects into the header controls on
   any page that doesn't already have one (i.e., all post pages). */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var controls = document.querySelector('.header-controls');
    if (!controls) return;
    if (controls.querySelector('a[href^="https://ervbo.com"]')) return; // index already has it
    var a = document.createElement('a');
    a.className = 'rss-link';
    a.href = 'https://ervbo.com/';
    a.setAttribute('aria-label', 'Back to ervbo.com');
    a.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg> ervbo.com';
    controls.insertBefore(a, controls.firstChild);
  });
})();
