// Slider tactile
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.album-carousel');
  
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Rotation des albums
    document.querySelectorAll('.album-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.animation = 'rotate 5s infinite linear';
      });
      item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.animation = 'none';
      });
    });
  }

  // Animations de fond
  if (document.querySelector('.liquid-bg')) {
    const bg = document.querySelector('.liquid-bg');
    const colors = ['rgba(128, 0, 32, 0.3)', 'rgba(168, 50, 70, 0.2)'];
    
    for (let i = 0; i < 15; i++) {
      const blob = document.createElement('div');
      blob.style.cssText = `
        position: absolute;
        width: ${Math.random() * 300 + 100}px;
        height: ${Math.random() * 300 + 100}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() * 50 + 30}%;
        filter: blur(40px);
        opacity: ${Math.random() * 0.5 + 0.1};
        animation: float ${Math.random() * 30 + 15}s infinite ease-in-out;
      `;
      bg.appendChild(blob);
    }
  }
});

// Ajout des animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 20 - 10}deg); }
  }
  
  @keyframes rotate {
    0% { transform: rotateY(0); }
    100% { transform: rotateY(360deg); }
  }
`;
document.head.appendChild(style);
// Navigation par flèches
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.album-carousel');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const albumItems = document.querySelectorAll('.album-item');
  const itemWidth = albumItems[0].offsetWidth + 32; // largeur + gap
  
  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      carousel.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
      });
    });
    
    rightArrow.addEventListener('click', () => {
      carousel.scrollBy({
        left: itemWidth,
        behavior: 'smooth'
      });
    });
  }

  // Rotation des albums au survol
  albumItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('img').style.animation = 'rotate 5s infinite linear';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('img').style.animation = 'none';
    });
  });
});