document.addEventListener('DOMContentLoaded', function() {
  // ANIMATION UNIQUE AU PREMIER CHARGEMENT
  if (!sessionStorage.getItem('visited')) {
    document.body.classList.add('first-load');
    sessionStorage.setItem('visited', 'true');
    
    // Crée des particules dynamiques
    const particlesContainer = document.querySelector('.intro-particles');
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 3}px;
        height: ${Math.random() * 6 + 3}px;
        background: var(--blanc);
        border-radius: 50%;
        opacity: 0;
        animation: particleFloat ${Math.random() * 2 + 1}s ease-out infinite;
        animation-delay: ${Math.random() * 1}s;
        top: ${Math.random() * 70 + 15}%;
        left: ${Math.random() * 80 + 10}%;
        filter: blur(${Math.random() * 1 + 0.5}px);
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ANIMATION DES BULLES DE COMPÉTENCES
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((bubble, index) => {
    bubble.style.animationDelay = `${index * 0.1}s`;
    
    bubble.addEventListener('mousemove', (e) => {
      const rect = bubble.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      bubble.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    bubble.addEventListener('mouseleave', () => {
      bubble.style.transform = '';
    });
  });

  // POINTS DE FOND ANIMÉS
  const bg = document.querySelector('.particles-bg') || document.querySelector('.liquid-bg') || document.querySelector('.wave-bg');
  if (bg) {
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.className = 'bg-dot';
      dot.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(255,255,255,${Math.random() * 0.08 + 0.02});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${Math.random() * 15 + 5}s linear infinite;
        animation-delay: ${Math.random() * 3}s;
      `;
      bg.appendChild(dot);
    }
  }

  // TRANSITIONS ENTRE PAGES
  document.querySelectorAll('a').forEach(link => {
    if (!link.hash && link.href && !link.classList.contains('no-transition')) {
      link.addEventListener('click', (e) => {
        if (link.target === '_blank') return;
        e.preventDefault();
        document.body.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
          window.location.href = link.href;
        }, 500);
      });
    }
  });

  // SLIDER ALBUMS
  const carousel = document.querySelector('.album-carousel');
  if (carousel) {
    let isDown = false;
    let startX, scrollLeft;

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

    // Navigation par flèches
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (leftArrow && rightArrow) {
      leftArrow.addEventListener('click', () => {
        carousel.scrollBy({ left: -250, behavior: 'smooth' });
      });
      
      rightArrow.addEventListener('click', () => {
        carousel.scrollBy({ left: 250, behavior: 'smooth' });
      });
    }
  }

  // PDF VIEWER
  const url = 'img/storyboardrev.pdf';
  let pdfDoc = null,
      pageNum = 1,
      canvas = document.getElementById('pdf-canvas'),
      ctx = canvas?.getContext('2d');

  if (canvas && ctx) {
    function renderPage(num) {
      pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: 1.2 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        document.getElementById('page-info').textContent = `Page ${num} / ${pdfDoc.numPages}`;
      });
    }

    window.nextPage = function() {
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++;
      renderPage(pageNum);
    };

    window.prevPage = function() {
      if (pageNum <= 1) return;
      pageNum--;
      renderPage(pageNum);
    };

    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      renderPage(pageNum);
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Animation des bulles de compétences
  const bubbles = document.querySelectorAll('.skill-bubble');
  
  bubbles.forEach(bubble => {
    bubble.addEventListener('click', function(e) {
      e.preventDefault();
      this.style.animation = 'bubbleClick 0.4s ease';
      
      setTimeout(() => {
        window.location.href = this.href;
      }, 400);
    });
    
    bubble.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });

  // Autres scripts existants...
  if (!sessionStorage.getItem('visited')) {
    document.body.classList.add('first-load');
    sessionStorage.setItem('visited', 'true');
    
    const particlesContainer = document.querySelector('.intro-particles');
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 3}px;
        height: ${Math.random() * 6 + 3}px;
        background: var(--blanc);
        border-radius: 50%;
        opacity: 0;
        animation: particleFloat ${Math.random() * 2 + 1}s ease-out infinite;
        animation-delay: ${Math.random() * 1}s;
        top: ${Math.random() * 70 + 15}%;
        left: ${Math.random() * 80 + 10}%;
        filter: blur(${Math.random() * 1 + 0.5}px);
      `;
      particlesContainer.appendChild(particle);
    }
  }
});
// Animation supplémentaire au survol du nom
document.querySelector('.name-container').addEventListener('mouseover', function() {
  this.style.animation = 'float 3s ease-in-out infinite';
});

document.querySelector('.name-container').addEventListener('mouseout', function() {
  this.style.animation = 'float 6s ease-in-out infinite';
});
