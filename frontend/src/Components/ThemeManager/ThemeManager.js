const ThemeManager = () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.querySelector('body');
  
    if (localStorage.getItem('themet') === 'dark') {
      body.classList.add('dark-mode');
    }
  
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
  
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('themet', 'dark');
      } else {
        localStorage.setItem('themet', 'light');
      }
    });
  };
  
  export default ThemeManager;