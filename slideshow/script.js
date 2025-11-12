// Peri bacasý resimleri (placeholder - sonra gerçek resimler ekleyeceðiz)
const images = [
    'https://picsum.photos/1920/1080?random=1',
    'https://picsum.photos/1920/1080?random=2', 
    'https://picsum.photos/1920/1080?random=3',
    'https://picsum.photos/1920/1080?random=4',
    'https://picsum.photos/1920/1080?random=5'
];

// Deðiþkenler
let currentIndex = 0;
let isPlaying = true;
let isMuted = true;
let slideInterval;

// DOM elementleri
const slideImage = document.getElementById('slide-image');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const musicBtn = document.getElementById('music-btn');
const backgroundMusic = document.getElementById('background-music');

// Sayfa yüklendiðinde
document.addEventListener('DOMContentLoaded', function() {
    loadSlide(currentIndex);
    startSlideshow();
    
    // Olay dinleyicileri
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    playBtn.addEventListener('click', toggleSlideshow);
    musicBtn.addEventListener('click', toggleMusic);
});

// Slayt yükleme
function loadSlide(index) {
    slideImage.src = images[index];
    slideImage.classList.add('fade-in');
    setTimeout(() => {
        slideImage.classList.remove('fade-in');
    }, 1500);
}

// Sonraki slayt
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    loadSlide(currentIndex);
}

// Önceki slayt  
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    loadSlide(currentIndex);
}

// Slideshow'u baþlat/durdur
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // 5 saniyede bir
    playBtn.textContent = '?? Duraklat';
    isPlaying = true;
}

function stopSlideshow() {
    clearInterval(slideInterval);
    playBtn.textContent = '?? Devam Et';
    isPlaying = false;
}

function toggleSlideshow() {
    if (isPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

// Müzik kontrolü
function toggleMusic() {
    if (isMuted) {
        backgroundMusic.play();
        musicBtn.textContent = '?? Müzik';
        isMuted = false;
    } else {
        backgroundMusic.pause();
        musicBtn.textContent = '?? Müzik';
        isMuted = true;
    }
}

// Klavye kontrolleri
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft': prevSlide(); break;
        case 'ArrowRight': nextSlide(); break;
        case ' ': toggleSlideshow(); break;
        case 'm': toggleMusic(); break;
    }
});

// Dokunmatik kaydýrma (mobil için)
let startX = 0;
document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Minimum kaydýrma mesafesi
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

console.log('?? Þömine & Peri Bacalarý Slideshow Hazýr!');
