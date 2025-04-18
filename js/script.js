document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu') && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            if (icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Menu page category filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (categoryBtns.length > 0 && menuItems.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide menu items based on category
                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.querySelector('.cart-container');
    const cartItems = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart');
    const totalPrice = document.getElementById('total-price');
    let cart = [];

    // Add item to cart
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const menuItem = this.closest('.menu-item');
                const itemName = menuItem.querySelector('h3').textContent;
                const itemPrice = menuItem.querySelector('.price').textContent;
                const priceValue = parseFloat(itemPrice.replace('$', ''));
                
                // Check if item already exists in cart
                const existingItem = cart.find(item => item.name === itemName);
                
                if (existingItem) {
                    existingItem.quantity++;
                    existingItem.total = existingItem.quantity * existingItem.price;
                } else {
                    cart.push({
                        name: itemName,
                        price: priceValue,
                        quantity: 1,
                        total: priceValue
                    });
                }
                
                updateCart();
                showCart();
            });
        });
    }

    // Update cart display
    function updateCart() {
        if (cartItems) {
            // Clear cart items
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                // Show empty cart message
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                if (totalPrice) totalPrice.textContent = '$0.00';
            } else {
                // Add items to cart
                let total = 0;
                
                cart.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    
                    cartItem.innerHTML = `
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                            <p class="cart-item-price">$${item.total.toFixed(2)}</p>
                        </div>
                        <div class="remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </div>
                    `;
                    
                    cartItems.appendChild(cartItem);
                    total += item.total;
                });
                
                // Update total price
                if (totalPrice) totalPrice.textContent = `$${total.toFixed(2)}`;
                
                // Add remove item event listeners
                const removeButtons = document.querySelectorAll('.remove-item');
                removeButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.splice(index, 1);
                        updateCart();
                    });
                });
            }
        }
    }

    // Show cart
    function showCart() {
        if (cartContainer) {
            cartContainer.classList.add('active');
        }
    }

    // Hide cart when clicking outside
    document.addEventListener('click', function(event) {
        if (cartContainer && cartContainer.classList.contains('active') && 
            !event.target.closest('.cart') && !event.target.closest('.add-to-cart')) {
            cartContainer.classList.remove('active');
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items to proceed.');
            } else {
                alert('Thank you for your order! Your food will be on its way shortly.');
                cart = [];
                updateCart();
                cartContainer.classList.remove('active');
            }
        });
    }
}); 