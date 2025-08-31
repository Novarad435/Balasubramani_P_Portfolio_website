document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Smooth scroll for links with data-scroll attribute
  document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.slice(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (navLinks?.classList.contains('open')) navLinks.classList.remove('open');
    });
  });

  // Typing effect
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const phrases = ['ECE Student', 'Good Programmer', 'IoT & PCB Designer', 'Full-Stack Developer'];
    let phraseIndex = 0, charIndex = 0, isTyping = true;

    function typeTick() {
      const currentPhrase = phrases[phraseIndex];
      if (isTyping) {
        charIndex++;
        typedEl.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === currentPhrase.length) {
          isTyping = false;
          setTimeout(typeTick, 1200);
          return;
        }
        setTimeout(typeTick, 80);
      } else {
        charIndex--;
        typedEl.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === 0) {
          isTyping = true;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeTick, 200);
          return;
        }
        setTimeout(typeTick, 35);
      }
    }
    typeTick();
  }

  // Reveal on scroll for elements with class 'reveal'
  const reveals = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    const cutoff = window.innerHeight * 0.85;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < cutoff) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Skills bar animation + hover behavior
  const skillsContainer = document.querySelector('.skills-container');
  const skills = document.querySelectorAll('.skill');
  const bars = document.querySelectorAll('.bar');

  function animateBarsOnScroll() {
    if (skillsContainer?.matches(':hover')) return; // skip if hovered to prevent conflicts
    bars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
        bar.setAttribute('aria-valuenow', percent);
      } else {
        bar.style.width = '0';
        bar.setAttribute('aria-valuenow', '0');
      }
    });
  }
  animateBarsOnScroll();
  window.addEventListener('scroll', animateBarsOnScroll);

  // Hover on individual skill name to animate that bar
  skills.forEach(skill => {
    const bar = skill.querySelector('.bar');
    const skillName = skill.querySelector('.skill-name');
    const level = bar?.getAttribute('data-percent') || '0';

    if (skillName && bar) {
      skillName.addEventListener('mouseenter', () => {
        bar.style.width = level + '%';
      });
      skillName.addEventListener('mouseleave', () => {
        if (!skillsContainer?.matches(':hover')) {
          bar.style.width = '0';
        }
      });
    }
  });

  // Hover on skills container to animate all bars
  if (skillsContainer) {
    skillsContainer.addEventListener('mouseenter', () => {
      bars.forEach(bar => {
        const level = bar.getAttribute('data-percent') || '0';
        bar.style.width = level + '%';
      });
    });
    skillsContainer.addEventListener('mouseleave', () => {
      bars.forEach(bar => {
        bar.style.width = '0';
      });
    });
  }

  // Project modal functionality
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalDemo = document.getElementById('modalDemo');
  const modalCode = document.getElementById('modalCode');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.project-card');
      if (!card || !modal) return;
      modalImg.src = card.dataset.img || 'images/placeholder.png';
      modalTitle.textContent = card.dataset.title || 'Project';
      modalDesc.textContent = card.dataset.desc || '';
      modalTech.textContent = card.dataset.tech || '';
      modalDemo.href = card.dataset.demo || '#';
      modalDemo.target = '_blank';
      modalCode.href = card.dataset.code || '#';
      modalCode.target = '_blank';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    if (modalImg) modalImg.src = '';
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  // Contact form simple mailto fallback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name');
      const email = data.get('email');
      const subject = data.get('subject') || 'Portfolio contact';
      const message = data.get('message');
      const mailto = `mailto:yourname@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailto;
    });
  }

  // Small parallax effect on profile image
  const profile = document.getElementById('profileImg');
  if (profile) {
    document.addEventListener('mousemove', e => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) / (w / 30);
      const y = (e.clientY - h / 2) / (h / 30);
      profile.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
  }
});
