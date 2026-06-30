/**
 * Loading Screen JavaScript
 * Manages page loading state
 */

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) return;
    
    // Hide loading screen when everything is loaded
    window.addEventListener('load', () => {
        // Minimum display time for loading screen (prevents flash)
        const minDisplayTime = 800;
        const startTime = performance.now();
        
        const hideLoading = () => {
            const elapsed = performance.now() - startTime;
            const remaining = Math.max(0, minDisplayTime - elapsed);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
                
                // Trigger entrance animations
                document.body.classList.add('loaded');
            }, remaining);
        };
        
        hideLoading();
    });
    
    // Fallback: hide loading screen after 5 seconds max
    setTimeout(() => {
        if (loadingScreen.parentNode) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.remove(), 500);
        }
    }, 5000);
});

/**
 * Show loading state for async operations
 */
function showLoading(element) {
    const loader = document.createElement('div');
    loader.className = 'inline-loader';
    loader.innerHTML = '<div class="loading-circle" style="width: 20px; height: 20px; border-width: 2px;"></div>';
    loader.style.cssText = 'display: inline-flex; margin-left: 0.5rem;';
    
    element.appendChild(loader);
    element.disabled = true;
    
    return {
        hide: () => {
            loader.remove();
            element.disabled = false;
        }
    };
}