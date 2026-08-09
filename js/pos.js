// =====================================================
// Mahmud Telecom V8
// POS System
// Part 8B-1
// =====================================================

"use strict";

// ================================
// Local Storage
// ================================

let products =
JSON.parse(localStorage.getItem("products")) || [];

let sales =
JSON.parse(localStorage.getItem("sales")) || [];

let cart = [];

// ================================
// Elements
// ================================

const productList =
document.getElementById("productList");

const cartItems =
document.getElementById("cartItems");

const subTotal =
document.getElementById("subTotal");

const grandTotal =
document.getElementById("grandTotal");

const discount =
document.getElementById("discount");

const searchPOS =
document.getElementById("searchPOS");

const paymentMethod =
document.getElementById("paymentMethod");

const checkoutBtn =
document.getElementById("checkoutBtn");

const invoicePreview =
document.getElementById("invoicePreview");

// ================================
// Currency
// ================================

function money(amount){

    return "৳ " +
    Number(amount || 0).toLocaleString();

}

// ======================================
// Save Current Invoice
// ======================================

const invoiceData = {

    invoiceNo: "INV-" + Date.now(),

    date: sale.date,

    customer: sale.customerName,

    items: sale.items,

    total: sale.total

};

localStorage.setItem(
    "currentInvoice",
    JSON.stringify(invoiceData)
);

// ================================
// Save Products
// ================================

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}// =====================================================
// Load Products
// =====================================================

function loadProducts(keyword = "") {

    if (!productList) return;

    keyword = keyword.toLowerCase().trim();

    productList.innerHTML = "";

    const filteredProducts = products.filter(product => {

        return (
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword)
        );

    });

    if (filteredProducts.length === 0) {

        productList.innerHTML = `
            <p style="text-align:center;padding:30px;color:#777;">
                কোনো পণ্য পাওয়া যায়নি
            </p>
        `;

        return;

    }

    filteredProducts.forEach((product, index) => {

        productList.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image || 'images/no-image.png'}"
                alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.brand}</p>

            <strong>${money(product.sellingPrice)}</strong>

            <p>

                Stock :
                <b>${product.stock}</b>

            </p>

            <button
                class="dashboard-btn"
                onclick="addToCart(${products.indexOf(product)})">

                ➕ Add To Cart

            </button>

        </div>

        `;

    });

}

// =====================================================
// Live Search
// =====================================================

if (searchPOS) {

    searchPOS.addEventListener("keyup", function () {

        loadProducts(this.value);

    });

}

// =====================================================
// Add To Cart
// =====================================================

function addToCart(index) {

    const product = products[index];

    if (!product) return;

    if (Number(product.stock) <= 0) {

        alert("❌ এই পণ্যের স্টক নেই");

        return;

    }

    const found = cart.find(item => item.name === product.name);

    if (found) {

        if (found.qty >= Number(product.stock)) {

            alert("⚠️ স্টকের বেশি বিক্রি করা যাবে না");

            return;

        }

        found.qty++;

    } else {

        cart.push({

            name: product.name,

            price: Number(product.sellingPrice),

            qty: 1,

            stock: Number(product.stock),

            productIndex: index

        });

    }

    renderCart();

}// =====================================================
// Render Cart
// =====================================================

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:30px;color:#777;">
                Cart খালি
            </p>
        `;

        updateTotals();
        return;
    }

    cart.forEach((item, index) => {

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                <small>${money(item.price)}</small>

            </div>

            <div class="cart-controls">

                <button onclick="decreaseQty(${index})">➖</button>

                <span>${item.qty}</span>

                <button onclick="increaseQty(${index})">➕</button>

                <button onclick="removeCartItem(${index})">🗑️</button>

            </div>

        </div>

        `;

    });

    updateTotals();

}

// =====================================================
// Increase Quantity
// =====================================================

function increaseQty(index) {

    if (cart[index].qty >= cart[index].stock) {

        alert("⚠️ স্টকের বেশি বিক্রি করা যাবে না");
        return;

    }

    cart[index].qty++;

    renderCart();

}

// =====================================================
// Decrease Quantity
// =====================================================

function decreaseQty(index) {

    cart[index].qty--;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    renderCart();

}

// =====================================================
// Remove Item
// =====================================================

function removeCartItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// =====================================================
// Update Totals
// =====================================================

function updateTotals() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.qty;

    });

    let discountValue = Number(discount.value || 0);

    if (discountValue > subtotal) {

        discountValue = subtotal;

        discount.value = subtotal;

    }

    const total = subtotal - discountValue;

    subTotal.textContent = money(subtotal);

    grandTotal.textContent = money(total);

}

// =====================================================
// Discount Change
// =====================================================

if (discount) {

    discount.addEventListener("input", function () {

        updateTotals();

    });

}// =====================================================
// Complete Sale
// =====================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", completeSale);

}

function completeSale() {

    if (cart.length === 0) {

        alert("⚠️ Cart খালি।");
        return;

    }

    const customerName =
        document.getElementById("customerName").value.trim() || "Walk-in Customer";

    const customerMobile =
        document.getElementById("customerMobile").value.trim();

    const saleNote =
        document.getElementById("saleNote").value.trim();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const discountAmount = Number(discount.value || 0);

    const total = subtotal - discountAmount;

    // Update Product Stock

    cart.forEach(item => {

        const product = products[item.productIndex];

        if (product) {

            product.stock = Number(product.stock) - item.qty;

        }

    });

    saveProducts();

    // Save Sale

    const sale = {

        id: Date.now(),

        date: new Date().toLocaleString(),

        customerName,

        customerMobile,

        payment: paymentMethod.value,

        note: saleNote,

        items: [...cart],

        subtotal,

        discount: discountAmount,

        total

    };

    sales.push(sale);

    saveSales();

    // Invoice Preview

    let html = `
        <h3>🧾 Mahmud Telecom</h3>
        <hr>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Mobile:</strong> ${customerMobile}</p>
        <p><strong>Payment:</strong> ${paymentMethod.value}</p>
        <hr>
    `;

    cart.forEach(item => {

        html += `
            <p>
                ${item.name}
                × ${item.qty}
                = ${money(item.price * item.qty)}
            </p>
        `;

    });

    html += `
        <hr>
        <p><strong>Subtotal:</strong> ${money(subtotal)}</p>
        <p><strong>Discount:</strong> ${money(discountAmount)}</p>
        <h3>Total: ${money(total)}</h3>
    `;

    invoicePreview.innerHTML = html;

    // Reset

    cart = [];

    renderCart();

    loadProducts();

    discount.value = 0;

    document.getElementById("customerName").value = "";

    document.getElementById("customerMobile").value = "";

    document.getElementById("saleNote").value = "";

    alert("✅ Sale Completed Successfully");
window.location.href = "invoice.html";
}

// =====================================================
// Print Invoice
// =====================================================

const printInvoice =
document.getElementById("printInvoice");

if (printInvoice) {

    printInvoice.addEventListener("click", function () {

        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
            <head>
                <title>Invoice</title>
            </head>
            <body>
                ${invoicePreview.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.print();

    });

}

// =====================================================
// Logout
// =====================================================

const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        localStorage.removeItem("isLoggedIn");

        window.location.href = "login.html";

    });

}

// =====================================================
// Start App
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    loadProducts();

    renderCart();

});