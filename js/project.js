document.addEventListener('DOMContentLoaded', function() {
    // Carrossel de imagens
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // Criar dots
    carouselImages.forEach((img, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    let counter = 0;
    const size = carouselImages[0].clientWidth;
    
    // Configuração inicial
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    
    // Botões de navegação
    nextBtn.addEventListener('click', () => {
        if(counter >= carouselImages.length - 1) {
            counter = -1;
        }
        counter++;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        if(counter <= 0) {
            counter = carouselImages.length;
        }
        counter--;
        updateCarousel();
    });
    
    // Auto-play
    let interval = setInterval(() => {
        if(counter >= carouselImages.length - 1) {
            counter = -1;
        }
        counter++;
        updateCarousel();
    }, 5000);
    
    // Pausar no hover
    carouselSlide.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carouselSlide.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            if(counter >= carouselImages.length - 1) {
                counter = -1;
            }
            counter++;
            updateCarousel();
        }, 5000);
    });
    
    function updateCarousel() {
        carouselSlide.style.transition = "transform 0.5s ease";
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if(index === counter) {
                dot.classList.add('active');
            }
        });
    }
    
    function goToSlide(index) {
        counter = index;
        updateCarousel();
    }
    
    // Resetar transição no loop
    carouselSlide.addEventListener('transitionend', () => {
        if(carouselImages[counter].id === 'lastClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - 2;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        
        if(carouselImages[counter].id === 'firstClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - counter;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', () => {
        carouselSlide.style.transition = "none";
        counter = 0;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        setTimeout(() => {
            carouselSlide.style.transition = "transform 0.5s ease";
        }, 100);
    });
});

// Garantir que as imagens respeitem o container
function adjustCarousel() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    document.querySelectorAll('.carousel-slide img').forEach(img => {
        img.style.width = containerWidth + 'px';
    });
}

// Executar no carregamento e no redimensionamento
window.addEventListener('load', adjustCarousel);
window.addEventListener('resize', adjustCarousel);