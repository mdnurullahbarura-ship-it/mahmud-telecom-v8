// =====================================================
// Mahmud Telecom V8
// Suppliers Module
// Part 10B-1
// =====================================================

"use strict";

// ======================================
// Local Storage
// ======================================

let suppliers =
JSON.parse(localStorage.getItem("suppliers")) || [];

let editIndex = -1;

// ======================================
// Elements
// ======================================

const supplierForm =
document.getElementById("supplierForm");

const supplierTableBody =
document.getElementById("supplierTableBody");

const totalSuppliers =
document.getElementById("totalSuppliers");

const searchSupplier =
document.getElementById("searchSupplier");

// ======================================
// Save Suppliers
// ======================================

function saveSuppliers(){

    localStorage.setItem(
        "suppliers",
        JSON.stringify(suppliers)
    );

}

// ======================================
// Load Suppliers
// ======================================

function loadSuppliers(keyword=""){

    if(!supplierTableBody) return;

    supplierTableBody.innerHTML = "";

    keyword = keyword.toLowerCase().trim();

    const list = suppliers.filter(item =>

        item.company.toLowerCase().includes(keyword) ||

        item.name.toLowerCase().includes(keyword) ||

        item.mobile.includes(keyword)

    );

    if(list.length===0){

        supplierTableBody.innerHTML = `

        <tr>

            <td colspan="6"
            style="text-align:center;padding:25px;color:#777;">

                কোনো Supplier পাওয়া যায়নি

            </td>

        </tr>

        `;

        totalSuppliers.textContent = "Total: 0";

        return;

    }

    list.forEach((supplier,index)=>{

        supplierTableBody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${supplier.company}</td>

            <td>${supplier.name}</td>

            <td>${supplier.mobile}</td>

            <td>৳ ${Number(supplier.due || 0).toLocaleString()}</td>

            <td>

                <button
                class="btn-edit"
                onclick="editSupplier(${suppliers.indexOf(supplier)})">

                ✏️

                </button>

                <button
                class="btn-delete"
                onclick="deleteSupplier(${suppliers.indexOf(supplier)})">

                🗑️

                </button>

            </td>

        </tr>

        `;

    });

    totalSuppliers.textContent =
    "Total: " + list.length;

}// =====================================================
// Add / Update Supplier
// =====================================================

if(supplierForm){

    supplierForm.addEventListener("submit",function(e){

        e.preventDefault();

        const supplier={

            company:document.getElementById("supplierCompany").value.trim(),

            name:document.getElementById("supplierName").value.trim(),

            mobile:document.getElementById("supplierMobile").value.trim(),

            email:document.getElementById("supplierEmail").value.trim(),

            address:document.getElementById("supplierAddress").value.trim(),

            due:Number(document.getElementById("supplierDue").value)||0,

            note:document.getElementById("supplierNote").value.trim(),

            createdAt:new Date().toLocaleString()

        };

        if(supplier.company==="" ||
           supplier.name==="" ||
           supplier.mobile===""){

            alert("⚠️ Company, Contact Person এবং Mobile লিখুন");

            return;

        }

        // Duplicate Mobile Check

        const duplicate = suppliers.find((item,index)=>

            item.mobile===supplier.mobile &&
            index!==editIndex

        );

        if(duplicate){

            alert("❌ এই মোবাইল নম্বর ইতিমধ্যে ব্যবহার করা হয়েছে");

            return;

        }

        if(editIndex===-1){

            suppliers.push(supplier);

            alert("✅ Supplier Successfully Added");

        }else{

            suppliers[editIndex]=supplier;

            alert("✅ Supplier Successfully Updated");

            editIndex=-1;

        }

        saveSuppliers();

        loadSuppliers();

        supplierForm.reset();

        document.getElementById("supplierDue").value=0;

    });

}

// =====================================================
// Edit Supplier
// =====================================================

function editSupplier(index){

    const supplier = suppliers[index];

    if(!supplier) return;

    document.getElementById("supplierCompany").value =
    supplier.company;

    document.getElementById("supplierName").value =
    supplier.name;

    document.getElementById("supplierMobile").value =
    supplier.mobile;

    document.getElementById("supplierEmail").value =
    supplier.email || "";

    document.getElementById("supplierAddress").value =
    supplier.address || "";

    document.getElementById("supplierDue").value =
    supplier.due || 0;

    document.getElementById("supplierNote").value =
    supplier.note || "";

    editIndex=index;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}// =====================================================
// Delete Supplier
// =====================================================

function deleteSupplier(index){

    if(!confirm("আপনি কি এই Supplier-কে মুছে ফেলতে চান?")){

        return;

    }

    suppliers.splice(index,1);

    saveSuppliers();

    loadSuppliers();

}

// =====================================================
// Live Search
// =====================================================

if(searchSupplier){

    searchSupplier.addEventListener("keyup",function(){

        loadSuppliers(this.value);

    });

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

});