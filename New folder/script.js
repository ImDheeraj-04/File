document.addEventListener('DOMContentLoaded', function() {
    // Surprise button functionality
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseContent = document.getElementById('surpriseContent');
    
    surpriseBtn.addEventListener('click', function() {
        surpriseContent.classList.toggle('hidden');
        
        if (!surpriseContent.classList.contains('hidden')) {
            // Add celebration effect
            createHearts();
            surpriseBtn.textContent = '🎁 Close Your Gift';
        } else {
            surpriseBtn.textContent = '🎁 Open Your Gift';
        }
    });
    
    // Create floating hearts effect
    function createHearts() {
        const colors = ['#ff6b6b', '#ff8787', '#ffa5a5', '#ffc9c9'];
        const container = document.body;
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💕';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '100%';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.animation = `floatUp ${Math.random() * 3 + 2}s ease-out forwards`;
                
                container.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 100);
        }
    }
    
    // Add CSS animation for floating hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effect to quality items
    const qualityItems = document.querySelectorAll('.quality-item');
    qualityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add typing effect to the main title
    const mainTitle = document.querySelector('.main-title');
    const originalText = mainTitle.textContent;
    mainTitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            mainTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 500);
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
    
    // Add click effect to memory items
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Add pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(pulseStyle);
    
    // Add current date to footer
    const dateElement = document.querySelector('.date');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = `Created with love on ${today.toLocaleDateString('en-US', options)}`;
});
