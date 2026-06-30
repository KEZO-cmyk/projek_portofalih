/**
 * Gallery JavaScript
 * Lightbox and filtering functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initGalleryFilter();
});

let currentImageIndex = 0;
let galleryImages = [];

/**
 * Initialize Lightbox
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox?.querySelector('.lightbox-close');
    const prevBtn = lightbox?.querySelector('.lightbox-prev');
    const nextBtn = lightbox?.querySelector('.lightbox-next');
    
    if (!lightbox) return;
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn?.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
            showPrevImage();
        }
        if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
            showNextImage();
        }
    });
    
    // Navigation
    prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
    
    nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

/**
 * Open Lightbox
 */
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Get all visible gallery items
    const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
    galleryImages = Array.from(visibleItems).map(item => ({
        src: item.querySelector('.gallery-image')?.src || '',
        title: item.querySelector('.gallery-title')?.textContent || ''
    }));
    
    currentImageIndex = index;
    
    if (galleryImages.length === 0) return;
    
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Update Lightbox Image
 */
function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const image = galleryImages[currentImageIndex];
    
    if (!image) return;
    
    // Preload image
    const img = new Image();
    img.onload = () => {
        lightboxImage.src = image.src;
        lightboxCaption.textContent = image.title;
    };
    img.src = image.src;
}

/**
 * Show Previous Image
 */
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

/**
 * Show Next Image
 */
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

/**
 * Initialize Gallery Filter
 */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter items with animation
            galleryItems.forEach((item, index) => {
                const category = item.classList.contains(filter) || filter === 'all';
                
                if (category) {
                    item.classList.remove('hidden');
                    gsap.fromTo(item, 
                        { opacity: 0, scale: 0.8 },
                        { 
                            opacity: 1, 
                            scale: 1, 
                            duration: 0.4, 
                            delay: index * 0.05,
                            ease: 'power3.out'
                        }
                    );
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        onComplete: () => item.classList.add('hidden')
                    });
                }
            });
        });
    });
}