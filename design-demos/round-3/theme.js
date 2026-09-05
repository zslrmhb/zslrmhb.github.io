// Shared review theme: resolves before paint and remembers explicit choices.
(() => {
  const key = 'hongbin-design-theme';
  const system = matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem(key); } catch {}
  const hasChoice = () => choice === 'light' || choice === 'dark';
  const apply = () => {
    const mode = hasChoice() ? choice : system.matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = mode;
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.textContent = mode === 'dark' ? 'Light ◑' : 'Dark ◐';
      button.setAttribute('aria-label', `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`);
    });
    window.dispatchEvent(new Event('themechange'));
  };
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.addEventListener('click', () => {
        choice = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, choice); } catch {}
        apply();
      });
    });
  });
})();
