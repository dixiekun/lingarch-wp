/**
 * Mega Menu JavaScript - dixie designs
 * Fixes hover issues and provides smooth user experience
 */

document.addEventListener('DOMContentLoaded', function() {
    const megaMenuItems = document.querySelectorAll('.dropdown-parent.mega-menu');
    
    megaMenuItems.forEach(function(menuItem) {
        const megaContent = menuItem.querySelector('.mega-content');
        let hoverTimeout;
        
        if (!megaContent) return;
        
        // Show mega menu on hover
        function showMegaMenu() {
            clearTimeout(hoverTimeout);
            megaContent.style.display = 'block';
            // Force reflow for smooth animation
            megaContent.offsetHeight;
            megaContent.style.opacity = '1';
            megaContent.style.visibility = 'visible';
            megaContent.style.pointerEvents = 'auto';
            megaContent.style.transform = 'translateY(0)';
        }
        
        // Hide mega menu with delay
        function hideMegaMenu() {
            hoverTimeout = setTimeout(function() {
                megaContent.style.opacity = '0';
                megaContent.style.visibility = 'hidden';
                megaContent.style.pointerEvents = 'none';
                megaContent.style.transform = 'translateY(-10px)';
                
                // Hide after animation completes
                setTimeout(function() {
                    if (megaContent.style.opacity === '0') {
                        megaContent.style.display = 'none';
                    }
                }, 200);
            }, 150); // 150ms delay before hiding
        }
        
        // Mouse enter events
        menuItem.addEventListener('mouseenter', showMegaMenu);
        megaContent.addEventListener('mouseenter', showMegaMenu);
        
        // Mouse leave events
        menuItem.addEventListener('mouseleave', hideMegaMenu);
        megaContent.addEventListener('mouseleave', hideMegaMenu);
    });
});