/**
 * Custom Cursor JavaScript
 * Premium cursor effects for desktop
 */

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop with fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Follower with more delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .gallery-item, .portfolio-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(2)`;
            follower.style.transform = `translate(${followerX - 30}px, ${followerY - 30}px) scale(1.5)`;
            follower.style.borderColor = 'var(--primary-blue)';
            follower.style.background = 'rgba(47, 107, 255, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
            follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
            follower.style.borderColor = 'var(--primary-blue)';
            follower.style.background = 'transparent';
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(0.8)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(0.8)`;
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '0.5';
    });
});