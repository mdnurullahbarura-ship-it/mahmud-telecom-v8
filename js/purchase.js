// =====================================================
// Mahmud Telecom V8
// Purchase Module
// Part 11B-1
// =====================================================

"use strict";

// ======================================
// Local Storage
// ======================================

let purchases =
JSON.parse(localStorage.getItem("purchases")) || [];

let suppliers =
JSON.parse(localStorage.getItem("suppliers")) || [];

let products =
JSON.parse(localStorage.getItem("products")) || [];

// ======================================
// Elements
// ======================================

const purchaseForm =
document.getElementById("purchaseForm");

const purchaseSupplier =
document.getElementById("purchaseSupplier");

const purchaseProduct =
document.getElementById("purchaseProduct");

const purchasePrice =
document.getElementById("purchasePrice");

const purchaseQty =
document.getElementById("purchaseQty");

const purchaseTotal =
document.getElementById("purchaseTotal");

const purchaseDate =
document.getElementById("purchaseDate");

const purchaseTableBody =
document.getElementById("purchaseTableBody");

const totalPurchases =
document.getElementById("totalPurchases");

// ======================================
// Today's Date
// ======================================

if(purchaseDate){

    purchaseDate.value =
    new Date().toISOString().split("T")[0];

}

// ======================================
// Load Suppliers
// ======================================

function loadSuppliers(){
    if(!purchaseSupplier) return;

    readPurchaseData();

    const current = purchaseSupplier.value;

    purchaseSupplier.innerHTML =
        '<option value="">-- Supplier নির্বাচন করুন --</option>';

    const seen = new Set();

    suppliers.forEach(item => {

        let name = "";

        if(typeof item === "string"){
            name = item.trim();
        }else if(item && typeof item === "object"){
            name = String(
                item.company ||
                item.companyName ||
                item.name ||
                item.supplier ||
                item.supplierName ||
                item.contactPerson ||
                ""
            ).trim();
        }

        if(!name || seen.has(name)) return;

        seen.add(name);

        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;

        purchaseSupplier.appendChild(option);
    });

    if(seen.size === 0){
        const option = document.createElement("option");
        option.value = "__add_supplier__";
        option.textContent =
            "➕ Suppliers পেজে আগে Supplier যোগ করুন";

        purchaseSupplier.appendChild(option);
    }

    if(current && seen.has(current)){
        purchaseSupplier.value = current;
    }
}

// ======================================
// Load Products
// ======================================

function loadProducts(){

    if(!purchaseProduct) return;

    purchaseProduct.innerHTML =
    '<option value="">-- Product নির্বাচন করুন --</option>';

    products.forEach(item=>{

        purchaseProduct.innerHTML +=

        `<option value="${item.name}">
            ${item.name}
        </option>`;

    });

}

// ======================================
// Total Calculation
// ======================================

function updateTotal(){

    const price =
    Number(purchasePrice.value) || 0;

    const qty =
    Number(purchaseQty.value) || 0;

    purchaseTotal.value = price * qty;

}

purchasePrice?.addEventListener("input",updateTotal);

purchaseQty?.addEventListener("input",updateTotal);

// ======================================
// Load Purchase History
// ======================================

function loadPurchases(){

    if(!purchaseTableBody) return;

    purchaseTableBody.innerHTML="";

    if(purchases.length===0){

        purchaseTableBody.innerHTML=`

        <tr>

            <td colspan="8"
            style="text-align:center;padding:25px;">

            কোনো Purchase পাওয়া যায়নি

            </td>

        </tr>`;

        totalPurchases.textContent="Total: 0";

        return;

    }

    purchases.forEach((item,index)=>{

        purchaseTableBody.innerHTML +=`

        <tr>

            <td>${index+1}</td>

            <td>${item.date}</td>

            <td>${item.supplier}</td>

            <td>${item.product}</td>

            <td>৳ ${item.price}</td>

            <td>${item.qty}</td>

            <td>৳ ${item.total}</td>

            <td>

                <button
                class="btn-delete"
                onclick="deletePurchase(${index})">

                🗑️

                </button>

            </td>

        </tr>`;

    });

    totalPurchases.textContent =
    "Total: " + purchases.length;

}// =====================================================
// Save Purchase + Stock Update
// =====================================================

if(purchaseForm){

    purchaseForm.addEventListener("submit",function(e){

        e.preventDefault();

        const purchase={

            supplier:purchaseSupplier.value,

            product:purchaseProduct.value,

            price:Number(purchasePrice.value),

            qty:Number(purchaseQty.value),

            total:Number(purchaseTotal.value),

            date:purchaseDate.value,

            note:document.getElementById("purchaseNote").value.trim(),

            createdAt:new Date().toLocaleString()

        };

        if(

            purchase.supplier==="" ||

            purchase.product==="" ||

            purchase.price<=0 ||

            purchase.qty<=0

        ){

            alert("⚠️ সব তথ্য সঠিকভাবে পূরণ করুন");

            return;

        }

        // ======================================
        // Increase Product Stock
        // ======================================

        const productIndex = products.findIndex(item =>

            item.name === purchase.product

        );

        if(productIndex !== -1){

            products[productIndex].stock =

            Number(products[productIndex].stock || 0)

            + purchase.qty;

            localStorage.setItem(

                "products",

                JSON.stringify(products)

            );

        }

        // ======================================
        // Save Purchase
        // ======================================

        purchases.push(purchase);

        localStorage.setItem(

            "purchases",

            JSON.stringify(purchases)

        );

        alert("✅ Purchase Successfully Saved");

        loadPurchases();

        purchaseForm.reset();

        purchaseDate.value =

        new Date().toISOString().split("T")[0];

        purchaseQty.value = 1;

        purchaseTotal.value = 0;

    });

}// =====================================================
// Delete Purchase
// =====================================================

function deletePurchase(index){

    if(!confirm("আপনি কি এই Purchase রেকর্ডটি মুছে ফেলতে চান?")){

        return;

    }

    purchases.splice(index,1);

    localStorage.setItem(
        "purchases",
        JSON.stringify(purchases)
    );

    loadPurchases();

}

// =====================================================
// Logout
// =====================================================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",function(e){

        e.preventDefault();

        localStorage.removeItem("isLoggedIn");

        window.location.href="login.html";

    });

}

// =====================================================
// Initialize
// =====================================================

document.addEventListener("DOMContentLoaded",function(){

    loadSuppliers();

    loadProducts();

    loadPurchases();

    updateTotal();

});
