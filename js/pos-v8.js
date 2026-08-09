// =====================================================
// Mahmud Telecom V8
// POS Module
// Part 15C-1
// =====================================================

"use strict";

// ======================================
// Local Storage
// ======================================

let products =
JSON.parse(localStorage.getItem("products")) || [];

let sales =
JSON.parse(localStorage.getItem("sales")) || [];
// ======================================
// Fix Old Products (Run Once)
// ======================================

products.forEach(product => {

    // যদি sellingPrice না থাকে কিন্তু sellPrice থাকে
    if (
        (product.sellingPrice === undefined ||
         product.sellingPrice === null ||
         product.sellingPrice === "") &&
        product.sellPrice !== undefined
    ) {
        product.sellingPrice = Number(product.sellPrice) || 0;
    }

    // যদি price থাকে
    if (
        (product.sellingPrice === undefined ||
         product.sellingPrice === null ||
         product.sellingPrice === "") &&
        product.price !== undefined
    ) {
        product.sellingPrice = Number(product.price) || 0;
    }

    // Number নিশ্চিত করা
    product.sellingPrice = Number(product.sellingPrice) || 0;
    product.purchasePrice = Number(product.purchasePrice) || 0;
    product.stock = Number(product.stock) || 0;

});

// Save Fixed Data
localStorage.setItem(
    "products",
    JSON.stringify(products)
);
let cart = [];

// ======================================
// Elements
// ======================================

const productList =
document.getElementById("productList");

const cartItems =
document.getElementById("cartItems");

const searchInput =
document.getElementById("searchProduct");

const customerName =
document.getElementById("customerName");

const totalAmount =
document.getElementById("grandTotal");

// ======================================
// Save Sales
// ======================================

function saveSales(){

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

}

// ======================================
// Load Products
// ======================================

function loadProducts(list = products){

    if(!productList) return;

    productList.innerHTML = "";

    if(list.length === 0){

        productList.innerHTML = `
        <div class="empty-box">
            কোনো Product পাওয়া যায়নি
        </div>`;

        return;

    }

    list.forEach((product,index)=>{

        productList.innerHTML += `

        <div class="product-card">

            <h3>${product.name}</h3>

            <p>Price : ৳ ${Number(product.sellingPrice).toLocaleString()}</p>

            <p>Stock : ${product.stock}</p>

            <button
            onclick="addToCart(${index})"
            class="dashboard-btn">

                Add To Cart

            </button>

        </div>`;

    });

}

// ======================================
// Search Product
// ======================================

if(searchInput){

    searchInput.addEventListener("input",function(){

        const keyword =
        this.value.toLowerCase();

        const filtered =
        products.filter(item=>

            item.name
            .toLowerCase()
            .includes(keyword)

        );

        loadProducts(filtered);

    });

}// ======================================
// Add To Cart
// ======================================

function addToCart(index){

    const product = products[index];

    if(!product){

        alert("❌ Product পাওয়া যায়নি");

        return;

    }

    const existing = cart.find(item => item.name === product.name);

    if(existing){

        if(existing.qty >= product.stock){

            alert("⚠️ পর্যাপ্ত Stock নেই");

            return;

        }

        existing.qty++;

    }else{

        cart.push({

            id: product.id || Date.now(),

            name: product.name,

            price: Number(product.sellingPrice),

            qty: 1

        });

    }

    updateCart();

}

// ======================================
// Remove From Cart
// ======================================

function removeCartItem(index){

    cart.splice(index,1);

    updateCart();

}

// ======================================
// Change Quantity
// ======================================

function changeQty(index,action){

    if(action==="plus"){

        cart[index].qty++;

    }

    if(action==="minus"){

        cart[index].qty--;

        if(cart[index].qty<=0){

            cart.splice(index,1);

        }

    }

    updateCart();

}

// ======================================
// Update Cart
// ======================================

function updateCart(){

    if(!cartItems) return;

    cartItems.innerHTML="";

    let total=0;

    cart.forEach((item,index)=>{

        const subTotal=item.price*item.qty;

        total+=subTotal;

        cartItems.innerHTML+=`

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                ৳ ${item.price.toLocaleString()} × ${item.qty}

            </div>

            <div class="cart-controls">

                <button onclick="changeQty(${index},'minus')">−</button>

                <button onclick="changeQty(${index},'plus')">+</button>

                <button onclick="removeCartItem(${index})">🗑️</button>

            </div>

        </div>

        `;

    });

    if(totalAmount){

        totalAmount.textContent="৳ "+total.toLocaleString();

    }

}// ======================================
// Checkout
// ======================================

function checkout(){

    // Cart খালি কিনা
    if(cart.length === 0){

        alert("⚠️ Cart খালি!");

        return;
    }


    // Customer
    const customer =
        customerName
            ? customerName.value.trim()
            : "Walk-in Customer";


    // Grand Total
    let grandTotal = 0;


    cart.forEach(item => {

        grandTotal +=
            Number(item.price) *
            Number(item.qty);

    });


    // ==================================
    // Calculate Profit
    // ==================================

    let totalProfit = 0;


    const invoiceItems = cart.map(item => {

        // Original Product খুঁজে বের করা
        const originalProduct =
            products.find(
                product =>
                    product.name === item.name
            );


        // Purchase Price
        const purchasePrice =
            originalProduct
                ? Number(originalProduct.purchasePrice) || 0
                : 0;


        // Selling Price
        const sellingPrice =
            Number(item.price) || 0;


        // Quantity
        const quantity =
            Number(item.qty) || 0;


        // Product Profit
        const itemProfit =
            (sellingPrice - purchasePrice)
            * quantity;


        // Total Profit
        totalProfit += itemProfit;


        return {

            name: item.name,

            qty: quantity,

            price: sellingPrice,

            purchasePrice: purchasePrice,

            profit: itemProfit

        };

    });


    // ==================================
    // Invoice Data
    // ==================================

    const invoiceData = {

        invoiceNo:
            "INV-" + Date.now(),

        date:
            new Date().toLocaleString(),

        customer:
            customer || "Walk-in Customer",

        items:
            invoiceItems,

        total:
            grandTotal,

        profit:
            totalProfit

    };


    // ==================================
    // Save Current Invoice
    // ==================================

    localStorage.setItem(
        "currentInvoice",
        JSON.stringify(invoiceData)
    );


    // ==================================
    // Save Sale
    // ==================================

    sales.push(invoiceData);

    saveSales();


    // ==================================
    // Clear Cart
    // ==================================

    cart = [];

    updateCart();


    // Clear Customer
    if(customerName){

        customerName.value = "";

    }


    // ==================================
    // Success Message
    // ==================================

    alert(
        "✅ Sale Completed Successfully"
    );


    // ==================================
    // Open Invoice
    // ==================================

    window.location.href =
        "invoice.html";

}

// ======================================
// Checkout Button
// ======================================

const checkoutBtn =
document.getElementById("checkoutBtn");

if(checkoutBtn){

    checkoutBtn.addEventListener(

        "click",

        checkout

    );

}

// ======================================
// Initialize
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadProducts();

        updateCart();

    }

);