document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.collage-container img');
    images.forEach(img => {
        img.style.opacity = 1;
        img.style.transform += ' scale(1.08)';
        img.style.transition = 'opacity 0.7s, transform 0.7s';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = new Map();

    function showCart() {
        const cart = document.getElementById('cart');
        if (cart && !cart.classList.contains('active')) {
            cart.classList.add('active');
            cart.style.display = 'flex'; // Ensure display is set to flex
        }
    }

    // --- CART LOGIC FOR PRODUCTS PAGE ---
    // Load cart from localStorage if present
    let cartArray = JSON.parse(localStorage.getItem('cartPageItems') || '[]');
    cartArray.forEach(item => {
        cartItems.set(item.price, item.qty);
    });

    // Helper to convert cartItems Map to array with name, price, qty, and img
    function getCartArray() {
        const cartArray = [];
        const added = new Set();
        document.querySelectorAll('.product-item').forEach(productItem => {
            const button = productItem.querySelector('.add-to-cart');
            if (!button) return;
            const price = parseFloat(button.getAttribute('data-price'));
            const name = button.getAttribute('data-product');
            const imgElem = productItem.querySelector('img');
            let img = '';
            if (imgElem) {
                img = imgElem.src;
            }
            const key = name + '|' + price;
            // Fix: check by name+price, not just price, so top-selling and main list both work
            if (cartItems.has(key) && !added.has(key)) {
                cartArray.push({ name, price, qty: cartItems.get(key), img });
                added.add(key);
            } else if (cartItems.has(price) && !added.has(key)) {
                // fallback for old logic
                cartArray.push({ name, price, qty: cartItems.get(price), img });
                added.add(key);
            }
        });
        return cartArray;
    }

    // Save cart to localStorage for cart page
    function saveCartToLocalStorage() {
        const cartArray = getCartArray();
        localStorage.setItem('cartPageItems', JSON.stringify(cartArray));
    }

    // Update addToCart to use name+price as key for all products
    function addToCart(price, name) {
        const key = name + '|' + price;
        if (cartItems.has(key)) {
            cartItems.set(key, cartItems.get(key) + 1);
        } else {
            cartItems.set(key, 1);
        }
        updateCart();
        showCart();
        saveCartToLocalStorage();
    }

    function updateCart() {
        const totalSpan = document.getElementById("cart-total");
        const itemCountSpan = document.getElementById("cart-item-count");
        let total = 0;
        let itemCount = 0;

        cartItems.forEach((quantity, key) => {
            // key can be either price (number) or name|price (string)
            let price = 0;
            if (typeof key === 'string' && key.includes('|')) {
                price = parseFloat(key.split('|')[1]);
            } else {
                price = parseFloat(key);
            }
            if (!isNaN(price)) {
                total += price * quantity;
            }
            itemCount += quantity;
        });

        totalSpan.textContent = total;
        itemCountSpan.textContent = itemCount;
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // Update event listeners to pass name
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            const name = button.getAttribute('data-product');
            addToCart(price, name);
        });
    });
});

document.getElementById('view-cart-button').addEventListener('click', () => {
    alert('Cart functionality is under development!');
});