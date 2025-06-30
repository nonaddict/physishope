// Enhanced script with better error handling and animations
const API_BASE_URL = 'https://sql-backend-production-6b3b.up.railway.app/get-all-products/display_products';

// Utility function to create product cards with enhanced styling
function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";
    
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    
    const content = document.createElement("div");
    content.className = "product-card-content";
    
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    
    const link = document.createElement("a");
    link.className = "display-products-link";
    link.href = product.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View on eBay";
    
    content.appendChild(price);
    content.appendChild(link);
    article.appendChild(image);
    article.appendChild(content);
    
    return article;
}

// Enhanced loading state
function showLoadingState() {
    const container = document.querySelector('.sample-products');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid var(--primary-blue); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 1rem; color: var(--text-medium);">Loading amazing products...</p>
            </div>
        `;
    }
}

// Enhanced error state
function showErrorState() {
    const container = document.querySelector('.sample-products');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">😔</div>
                <h3 style="color: var(--text-dark); margin-bottom: 0.5rem;">Oops! Something went wrong</h3>
                <p style="color: var(--text-medium); margin-bottom: 1rem;">We couldn't load the products right now.</p>
                <button onclick="loadProducts()" style="background: var(--primary-blue); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer;">Try Again</button>
            </div>
        `;
    }
}

// Main function to load products
async function loadProducts() {
    const container = document.querySelector('.sample-products');
    if (!container) return;
    
    showLoadingState();
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error('Invalid data format received');
        }
        
        // Clear loading state
        container.innerHTML = '';
        
        // Display up to 6 products
        const productsToShow = data.data.slice(0, 6);
        
        if (productsToShow.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <p style="color: var(--text-medium);">No products available at the moment.</p>
                </div>
            `;
            return;
        }
        
        // Create and append product cards with staggered animation
        productsToShow.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(productCard);
        });
        
    } catch (error) {
        console.error('Error loading products:', error);
        showErrorState();
    }
}

// Enhanced mobile menu functionality
function initializeMobileMenu() {
    const details = document.querySelector("details");
    const summary = document.querySelector("summary");
    
    if (!details || !summary) return;
    
    summary.addEventListener("click", (e) => {
        e.preventDefault();
        details.classList.toggle("open");
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!details.contains(e.target) && details.classList.contains("open")) {
            details.classList.remove("open");
        }
    });
    
    // Close menu when pressing Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && details.classList.contains("open")) {
            details.classList.remove("open");
        }
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add CSS for loading animation
function addLoadingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addLoadingStyles();
    initializeMobileMenu();
    initializeSmoothScroll();
    loadProducts();
});

// Add intersection observer for animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.product-card, .hero-header, .sub-header').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations after a short delay
setTimeout(initializeScrollAnimations, 500);