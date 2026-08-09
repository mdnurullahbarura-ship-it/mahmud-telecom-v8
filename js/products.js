// ==========================================
// Mahmud Telecom V8
// Products Management System
// Part 7B-1
// ==========================================

"use strict";

// ==========================================
// Local Storage
// ==========================================

let products =
JSON.parse(localStorage.getItem("products")) || [];

let editIndex = -1;

let deleteIndex = -1;

// ==========================================
// Elements
// ==========================================

const productForm =
document.getElementById("productForm");

const productTableBody =
document.getElementById("productTableBody");

const searchProduct =
document.getElementById("searchProduct");

const filterCategory =
document.getElementById("filterCategory");

const productPreview =
document.getElementById("productPreview");

const productImage =
document.getElementById("productImage");

const deleteModal =
document.getElementById("deleteModal");

const confirmDelete =
document.getElementById("confirmDelete");

const cancelDelete =
document.getElementById("cancelDelete");

// ==========================================
// Save Products
// ==========================================

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

// ==========================================
// Format Currency
// ==========================================

function money(value){

    return "৳ " + Number(value || 0).toLocaleString();

}

// ==========================================
// Stock Status
// ==========================================

function stockStatus(stock, lowStock){

    stock = Number(stock);
    lowStock = Number(lowStock);

    if(stock <= 0){

        return `
        <span class="badge danger">
        Out of Stock
        </span>
        `;

    }

    if(stock <= lowStock){

        return `
        <span class="badge warning">
        Low Stock
        </span>
        `;

    }

    return `
    <span class="badge success">
    In Stock
    </span>
    `;

}// ==========================================
// Add / Update Product
// ==========================================

if(productForm){

productForm.addEventListener("submit",function(e){

e.preventDefault();

const name=
document.getElementById("productName").value.trim();

const category=
document.getElementById("productCategory").value;

const brand=
document.getElementById("productBrand").value.trim();

const purchasePrice=
document.getElementById("purchasePrice").value;

const sellingPrice =
Number(document.getElementById("sellingPrice").value) || 0;

const stock=
document.getElementById("productStock").value;

const lowStock=
document.getElementById("lowStock").value;

const imei=
document.getElementById("productIMEI").value.trim();

let image="";

if(productImage.files.length){

image=
URL.createObjectURL(productImage.files[0]);

}

const product={

name,
category,
brand,
purchasePrice,
sellingPrice,
stock,
lowStock,
imei,
image

};

// ===== Edit =====

if(editIndex>=0){

products[editIndex]=product;

editIndex=-1;

alert("✅ Product Updated Successfully");

}else{

products.push(product);

alert("✅ Product Added Successfully");

}

saveProducts();

renderProducts();

productForm.reset();

productPreview.innerHTML=`
<p style="text-align:center;padding:30px;">
কোনো পণ্য নির্বাচন করা হয়নি
</p>
`;

});

}

// ==========================================
// Edit Product
// ==========================================

function editProduct(index){

const p=products[index];

document.getElementById("productName").value=p.name;

document.getElementById("productCategory").value=p.category;

document.getElementById("productBrand").value=p.brand;

document.getElementById("purchasePrice").value=p.purchasePrice;

document.getElementById("sellingPrice").value=p.sellingPrice;

document.getElementById("productStock").value=p.stock;

document.getElementById("lowStock").value=p.lowStock;

document.getElementById("productIMEI").value=p.imei;

editIndex=index;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

// ==========================================
// Image Preview
// ==========================================

if(productImage){

productImage.addEventListener("change",function(){

const file=this.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(e){

productPreview.innerHTML=`

<img
src="${e.target.result}"
style="
max-width:220px;
border-radius:10px;
display:block;
margin:auto;
">

`;

};

reader.readAsDataURL(file);

});

}// ==========================================
// Delete Product
// ==========================================

function deleteProduct(index){

    deleteIndex = index;

    if(deleteModal){

        deleteModal.style.display = "flex";

    }else{

        if(confirm("আপনি কি পণ্যটি মুছে ফেলতে চান?")){

            products.splice(index,1);

            saveProducts();

            renderProducts();

        }

    }

}

// ==========================================
// Confirm Delete
// ==========================================

if(confirmDelete){

confirmDelete.onclick=function(){

products.splice(deleteIndex,1);

saveProducts();

renderProducts();

deleteModal.style.display="none";

};

}

// ==========================================
// Cancel Delete
// ==========================================

if(cancelDelete){

cancelDelete.onclick=function(){

deleteModal.style.display="none";

};

}

// ==========================================
// Live Search
// ==========================================

if(searchProduct){

searchProduct.addEventListener("keyup",function(){

renderProducts(this.value);

});

}

// ==========================================
// Category Filter
// ==========================================

if(filterCategory){

filterCategory.addEventListener("change",function(){

renderProducts(searchProduct.value);

});

}

// ==========================================
// Product Preview
// ==========================================

function previewProduct(index){

const p=products[index];

productPreview.innerHTML=`

<div class="preview-box">

<img
src="${p.image || 'images/no-image.png'}"
class="preview-image">

<h2>${p.name}</h2>

<p><strong>Category :</strong> ${p.category}</p>

<p><strong>Brand :</strong> ${p.brand}</p>

<p><strong>Purchase :</strong> ${money(p.purchasePrice)}</p>

<p><strong>Sell :</strong> ${money(p.sellingPrice)}</p>

<p><strong>Stock :</strong> ${p.stock}</p>

<p><strong>IMEI :</strong> ${p.imei || "-"}</p>

</div>

`;

}// ==========================================
// Render Products
// ==========================================

function renderProducts(keyword = "") {

    if (!productTableBody) return;

    keyword = keyword.toLowerCase().trim();

    const category = filterCategory ? filterCategory.value : "";

    productTableBody.innerHTML = "";

    let filteredProducts = products.filter(product => {

        const matchKeyword =
            product.name.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword);

        const matchCategory =
            category === "" ||
            product.category === category;

        return matchKeyword && matchCategory;

    });

    if (filteredProducts.length === 0) {

        productTableBody.innerHTML = `
        <tr>
            <td colspan="10" style="text-align:center;padding:25px;">
                📦 কোনো পণ্য পাওয়া যায়নি
            </td>
        </tr>
        `;

        return;

    }

    filteredProducts.forEach((product, index) => {

        productTableBody.innerHTML += `

        <tr onclick="previewProduct(${products.indexOf(product)})">

            <td>${index + 1}</td>

            <td>

                <img
                src="${product.image || 'images/no-image.png'}"
                style="width:55px;height:55px;border-radius:8px;object-fit:cover;">

            </td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>${product.brand}</td>

            <td>${money(product.purchasePrice)}</td>

            <td>${money(product.sellingPrice)}</td>

            <td>${product.stock}</td>

            <td>

                ${stockStatus(product.stock, product.lowStock)}

            </td>

            <td>

                <button
                onclick="event.stopPropagation();editProduct(${products.indexOf(product)})"
                class="btn-edit">

                    ✏️

                </button>

                <button
                onclick="event.stopPropagation();deleteProduct(${products.indexOf(product)})"
                class="btn-delete">

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// Logout
// ==========================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        if (confirm("আপনি কি লগআউট করতে চান?")) {

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("adminName");

            window.location.href = "login.html";

        }

    });

}

// ==========================================
// Start App
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    renderProducts();

});