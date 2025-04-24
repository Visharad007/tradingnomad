document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js background
    initParticles();
    
    // Set up stats counter animation
    initCounters();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Initialize market data and charts
    initCharts();
    
    // Add scroll effect for navigation
    setupNavScroll();
});

// ======================
// 1. Particles Background
// ======================
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6c5ce7" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c5ce7",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// ======================
// 2. Counter Animation
// ======================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    function startCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // Animation duration in ms
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        
        let current = start;
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(counter);
                current = target;
                
                // Add symbols for specific counters
                if (element.getAttribute('data-count') === '85') {
                    element.textContent = Math.floor(current) + '+';
                } else if (element.getAttribute('data-count') === '98') {
                    element.textContent = Math.floor(current) + '%';
                } else {
                    element.textContent = Math.floor(current);
                }
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ======================
// 3. Mobile Menu Setup
// ======================
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}

// ======================
// 4. Navigation Scroll Effect
// ======================
function setupNavScroll() {
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ======================
// 5. Charts and Market Data
// ======================
function initCharts() {
    // Only initialize if charts exist on page
    if (document.getElementById('diversificationChart') && typeof Chart !== 'undefined') {
        // Diversification Pie Chart
        const diversificationCtx = document.getElementById('diversificationChart').getContext('2d');
        new Chart(diversificationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Equities', 'Bonds', 'Commodities', 'REITs', 'Crypto'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#6c5ce7',
                        '#00cec9',
                        '#fd79a8',
                        '#a29bfe',
                        '#ffeaa7'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '70%',
                plugins: { legend: { display: false } }
            }
        });
        
        // Momentum Line Chart
        const momentumCtx = document.getElementById('momentumChart').getContext('2d');
        new Chart(momentumCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    data: [85, 92, 78, 95, 87, 104],
                    borderColor: '#00cec9',
                    backgroundColor: 'rgba(0, 206, 201, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { display: false }, x: { display: false } }
            }
        });
    }

    // Market Data Simulation
    if (document.querySelector('.market-value')) {
        const marketValues = {
            nifty: 22417.45,
            sensex: 73895.54,
            gold: 62385,
            crude: 6745
        };
        
        function updateMarketData() {
            // Simulate market changes
            Object.keys(marketValues).forEach(key => {
                const change = (Math.random() * 2 - 1) * 0.3;
                marketValues[key] *= (1 + change/100);
                
                // Update DOM
                const element = document.querySelector(`.${key}-value`);
                if (element) {
                    if (key === 'nifty' || key === 'sensex') {
                        element.textContent = marketValues[key].toFixed(2);
                    } else {
                        element.textContent = Math.floor(marketValues[key]).toLocaleString();
                    }
                    
                    // Update change indicator
                    const changeElement = element.parentElement.querySelector('.market-change');
                    if (changeElement) {
                        changeElement.textContent = change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
                        changeElement.className = `market-change ${change >= 0 ? 'positive' : 'negative'}`;
                    }
                }
            });
            
            // Update timestamp
            const timeElement = document.getElementById('update-time');
            if (timeElement) {
                timeElement.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }
        }
        
        // Set up refresh button
        const refreshBtn = document.getElementById('refresh-market');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                this.classList.add('rotating');
                setTimeout(() => this.classList.remove('rotating'), 1000);
                updateMarketData();
            });
        }
        
        // Initial update
        updateMarketData();
        
        // Auto-update every 30 seconds
        setInterval(updateMarketData, 30000);
    }
}