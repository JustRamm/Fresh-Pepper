// Cart Functionality
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCountElement = document.getElementById('cart-count');
if (cartCountElement) cartCountElement.innerText = cartCount;

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Increment cart
        cartCount++;
        localStorage.setItem('cartCount', cartCount);
        if (cartCountElement) cartCountElement.innerText = cartCount;

        // Visual feedback
        const originalText = button.innerText;
        button.innerText = 'Added!';
        button.style.backgroundColor = '#2ecc71'; // Green color for success
        button.disabled = true;

        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = ''; // Reset to default
            button.disabled = false;
        }, 1500);

        // Animate the cart icon
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        }
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Navbar Active State Handler
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    // Determine current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Offset by nav height (approx 100px)
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    // Update active class
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            // Handle Home case specifically if needed, or general logic
            if (current !== '') {
                link.classList.add('active');
            } else if (window.scrollY < 100) {
                // Default to home when at top
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            }
        }
    });

    // Navbar Scroll Effect (Shadow/Height)
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0 5%'; // Ensure padding stays consistent or transitions
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Set initial active state
document.addEventListener('DOMContentLoaded', () => {
    // Trigger scroll event to set initial state
    window.dispatchEvent(new Event('scroll'));
});
