// Effet liquide pour l'accueil
document.addEventListener('DOMContentLoaded', function() {
  // Animation fond liquide (accueil)
  if (document.querySelector('.liquid-bg')) {
    const bg = document.querySelector('.liquid-bg');
    const colors = ['rgba(128, 0, 32, 0.3)', 'rgba(168, 50, 70, 0.2)'];
    
    for (let i = 0; i < 15; i++) {
      const blob = document.createElement('div');
      blob.className = 'blob';
      blob.style.width = `${Math.random() * 300 + 100}px`;
      blob.style.height = blob.style.width;
      blob.style.left = `${Math.random() * 100}%`;
      blob.style.top = `${Math.random() * 100}%`;
      blob.style.background = colors[Math.floor(Math.random() * colors.length)];
      blob.style.borderRadius = `${Math.random() * 50 + 30}%`;
      blob.style.filter = 'blur(40px)';
      blob.style.animation = `float ${Math.random() * 30 + 15}s infinite ease-in-out`;
      blob.style.opacity = Math.random() * 0.5 + 0.1;
      bg.appendChild(blob);
    }
  }

  // Animation vagues (réseaux)
  if (document.querySelector('.wave-bg')) {
    const bg = document.querySelector('.wave-bg');
    
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.height = `${Math.random() * 200 + 100}px`;
      wave.style.width = '150%';
      wave.style.bottom = `${Math.random() * 100}%`;
      wave.style.background = `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(128, 0, 32, 0.1)' : 'rgba(168, 50, 70, 0.05)'})`;
      wave.style.animation = `wave ${Math.random() * 20 + 10}s linear infinite`;
      wave.style.animationDelay = `${Math.random() * 5}s`;
      bg.appendChild(wave);
    }
  }

  // Animation particules (discographie)
  if (document.querySelector('.particles-bg')) {
    const bg = document.querySelector('.particles-bg');
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = `${Math.random() * 5 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(128, 0, 32, ${Math.random() * 0.3 + 0.1})`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `move ${Math.random() * 20 + 10}s linear infinite`;
      bg.appendChild(particle);
    }
  }

  // Carrousel d'albums
  if (document.querySelector('.album-carousel')) {
    const carousel = document.querySelector('.album-carousel');
    const items = document.querySelectorAll('.album-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * (250 + 32); // 250px width + 32px gap
      carousel.style.transform = `translateX(${offset}px)`;
    }

    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    // Rotation automatique des albums
    items.forEach(item => {
      const img = item.querySelector('img');
      item.addEventListener('mouseenter', () => {
        img.style.animation = 'rotate 5s infinite linear';
      });
      item.addEventListener('mouseleave', () => {
        img.style.animation = 'none';
      });
    });
  }
});

// Ajout des animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 20 - 10}deg); }
    50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 20 - 10}deg); }
    75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 20 - 10}deg); }
  }
  
  @keyframes wave {
    0% { transform: translateX(-50%) rotate(0deg); }
    100% { transform: translateX(0) rotate(360deg); }
  }
  
  @keyframes move {
    0% { transform: translate(0, 0); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
  }
  
  @keyframes rotate {
    0% { transform: rotateY(0); }
    100% { transform: rotateY(360deg); }
  }
`;
document.head.appendChild(style);