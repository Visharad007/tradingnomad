document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js background
    initParticles();
    
    // Set up plan card interactions
    setupPlanCards();
    
    // Initialize calculator functionality
    initCalculator();
    
    // Set up modal interactions
    setupModals();
    
    // Add smooth scrolling
    setupSmoothScrolling();
    
    // Add animation triggers
    setupAnimations();
    
    // Set up mobile menu
    setupMobileMenu();
    
    // Initialize counter animations
    initCounters();
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
// 2. Plan Cards Interactions
// ======================
function setupPlanCards() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            // Add pulse animation to the tag
            const tag = this.querySelector('.plan-tag');
            if (tag) {
                tag.style.animation = 'pulse 2s infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Remove pulse animation
            const tag = this.querySelector('.plan-tag');
            if (tag) {
                tag.style.animation = '';
            }
        });
        
        // Click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 200);
        });
    });
}

// ======================
// 3. Investment Calculator
// ======================
function initCalculator() {
    const calculator = document.querySelector('.calculator-section');
    if (!calculator) return;
    
    const amountSlider = document.getElementById('investmentAmount');
    const amountDisplay = document.getElementById('amountDisplay');
    const durationSlider = document.getElementById('investmentDuration');
    const durationDisplay = document.getElementById('durationDisplay');
    const planSelect = document.getElementById('planSelect');
    const resultsDisplay = document.getElementById('calculatorResults');
    
    // Format currency for display
    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString('en-IN');
    }
    
    // Update amount display when slider moves
    amountSlider.addEventListener('input', function() {
        const amount = parseInt(this.value);
        amountDisplay.textContent = formatCurrency(amount);
        updateCalculatorResults();
    });
    
    // Update duration display when slider moves
    durationSlider.addEventListener('input', function() {
        const duration = parseInt(this.value);
        durationDisplay.textContent = `${duration} Months`;
        updateCalculatorResults();
    });
    
    // Update results when plan changes
    planSelect.addEventListener('change', updateCalculatorResults);
    
    function updateCalculatorResults() {
        const amount = parseInt(amountSlider.value);
        const plan = planSelect.value;
        const duration = parseInt(durationSlider.value);
        
        let resultText = '';
        let monthlyReturn = 0;
        let totalReturn = 0;
        let term = duration + ' Months';
        
        switch(plan) {
            case 'planA':
                // Wealth Kickstart: 2% interest + 5% capital monthly
                const monthlyCapitalReturn = amount * 0.05;
                monthlyReturn = (amount * 0.02) + monthlyCapitalReturn;
                totalReturn = monthlyReturn * Math.min(duration, 20);
                if (duration > 20) {
                    term = '20 Months (max)';
                }
                break;
            case 'planB':
                // Premium Growth: 3% monthly, capital at end
                monthlyReturn = amount * 0.03;
                totalReturn = (monthlyReturn * Math.min(duration, 18)) + (duration >= 18 ? amount : 0);
                if (duration > 18) {
                    term = '18 Months (max)';
                }
                break;
            case 'planC':
                // VIP Accelerator: 4% monthly + 1% quarterly bonus, capital at end
                monthlyReturn = amount * 0.04;
                const quarters = Math.floor(duration / 3);
                const quarterlyBonus = amount * 0.01 * quarters;
                totalReturn = (monthlyReturn * Math.min(duration, 24)) + quarterlyBonus + (duration >= 24 ? amount : 0);
                if (duration > 24) {
                    term = '24 Months (max)';
                }
                break;
        }
        
        resultText = `
            <div class="calc-result">
                <div class="calc-metric">
                    <span>Monthly Return</span>
                    <strong>${formatCurrency(monthlyReturn)}</strong>
                </div>
                <div class="calc-metric">
                    <span>Total Return</span>
                    <strong>${formatCurrency(totalReturn)}</strong>
                </div>
                <div class="calc-metric">
                    <span>Term Length</span>
                    <strong>${term}</strong>
                </div>
                <div class="calc-metric">
                    <span>Total Profit</span>
                    <strong>${formatCurrency(totalReturn - amount)}</strong>
                </div>
            </div>
        `;
        
        resultsDisplay.innerHTML = resultText;
    }
    
    // Initialize calculator
    updateCalculatorResults();
}

// ======================
// 4. Modal Management
// ======================
function setupModals() {
    // Open modal functions
    window.openPlanAModal = function() {
        showModal('planAModal');
    };
    
    window.openPlanBModal = function() {
        showModal('planBModal');
    };
    
    window.openPlanCModal = function() {
        showModal('planCModal');
    };
    
    window.openSelectedPlanModal = function() {
        const planSelect = document.getElementById('planSelect');
        switch(planSelect.value) {
            case 'planA': openPlanAModal(); break;
            case 'planB': openPlanBModal(); break;
            case 'planC': openPlanCModal(); break;
        }
    };
    
    // Close modal functions
    window.closeModal = function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Close when clicking outside modal content
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus on first interactive element for accessibility
            const focusable = modal.querySelector('button, [href], input, select, textarea');
            if (focusable) focusable.focus();
        }
    }
    
    // Handle investment form submission
    const investmentForm = document.getElementById('investmentForm');
    if (investmentForm) {
        investmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('fullName').value;
            const plan = document.getElementById('selectedPlan').value;
            
            // Show success message
            const modalBody = this.closest('.modal-body');
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle" style="color: #00b894; font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 0.5rem;">Thank you, ${name}!</h3>
                <p style="margin-bottom: 1rem;">Your application for the ${plan} plan has been received.</p>
                <p>Our team will contact you shortly to complete the process.</p>
            `;
            
            // Replace form with success message
            modalBody.innerHTML = '';
            modalBody.appendChild(successMsg);
            
            // Close modal after 5 seconds
            setTimeout(() => {
                closeModal('investmentModal');
            }, 5000);
        });
    }
}

// ======================
// 5. Smooth Scrolling
// ======================
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ======================
// 6. Animations
// ======================
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements with animation class
    document.querySelectorAll('.plan-card, .comparison-section, .timeline-item, .testimonial-card, .stats-bar').forEach(el => {
        observer.observe(el);
    });

    // Add to the existing observer.observe() calls
document.querySelectorAll('.disclosure-card').forEach(el => {
    observer.observe(el);
  });
    
    // Add CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// ======================
// 7. Mobile Menu
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
// 8. Counter Animation
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
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
}