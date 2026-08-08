const textArray = ["Pasindu      ", "a Full-Stack Dev", "a UI/UX Designer", "a Creator     "];
  const typingDelay = 100;   
  const erasingDelay = 50;   
  const newTextDelay = 2000; 
  let textArrayIndex = 0;
  let charIndex = 0;

  const typewriterElement = document.getElementById("typewriter");

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typewriterElement.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typewriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay + 300);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay);
  });

  function app() {
    return {
      dark: false,
      mm: false,
      sc: false,
      s: 'hero',
  
      init() {
        this.dark = localStorage.getItem('theme') === 'dark' ||
          (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        this.$watch('dark', v => localStorage.setItem('theme', v ? 'dark' : 'light'));
  
        window.addEventListener('scroll', () => {
          this.sc = window.scrollY > 20;
          this.updateSection();
        }, { passive: true });
  
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  
        document.getElementById('yr').textContent = new Date().getFullYear();
      },
  
      updateSection() {
        const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 60;
        if (atBottom) { this.s = 'contact'; return; }
        const ids = ['contact','about','work','services','hero'];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && window.scrollY >= el.offsetTop - 130) { this.s = id; return; }
        }
      }
    }
  }