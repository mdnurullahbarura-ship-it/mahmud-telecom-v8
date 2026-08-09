// =====================================================
// Mahmud Telecom V8
// Customers Module
// Part 9B-1
// =====================================================

"use strict";

// ======================================
// Local Storage
// ======================================

let customers =
JSON.parse(localStorage.getItem("customers")) || [];

let editIndex = -1;

// ======================================
// Elements
// ======================================

const customerForm =
document.getElementById("customerForm");

const customerTableBody =
document.getElementById("customerTableBody");

const totalCustomers =
document.getElementById("totalCustomers");

const searchCustomer =
document.getElementById("searchCustomer");

// ======================================
// Save Customers
// ======================================

function saveCustomers(){

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

}

// ======================================
// Load Customers
// ======================================

function loadCustomers(keyword=""){

    if(!customerTableBody) return;

    customerTableBody.innerHTML="";

    keyword = keyword.toLowerCase().trim();

    const list = customers.filter(customer =>

        customer.name.toLowerCase().includes(keyword) ||

        customer.mobile.includes(keyword)

    );

    if(list.length===0){

        customerTableBody.innerHTML=`

        <tr>

            <td colspan="6"
            style="text-align:center;padding:25px;color:#777;">

                কোনো গ্রাহক পাওয়া যায়নি

            </td>

        </tr>

        `;

        totalCustomers.textContent="Total: 0";

        return;

    }

    list.forEach((customer,index)=>{

        customerTableBody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${customer.name}</td>

            <td>${customer.mobile}</td>

            <td>${customer.email || "-"}</td>

            <td>${customer.address || "-"}</td>

            <td>

                <button
                class="btn-edit"
                onclick="editCustomer(${customers.indexOf(customer)})">

                ✏️

                </button>

                <button
                class="btn-delete"
                onclick="deleteCustomer(${customers.indexOf(customer)})">

                🗑️

                </button>

            </td>

        </tr>

        `;

    });

    totalCustomers.textContent =
    "Total: " + list.length;

}// =====================================================
// Add / Update Customer
// =====================================================

if(customerForm){

    customerForm.addEventListener("submit",function(e){

        e.preventDefault();

        const customer={

            name:document.getElementById("customerName").value.trim(),

            mobile:document.getElementById("customerMobile").value.trim(),

            email:document.getElementById("customerEmail").value.trim(),

            address:document.getElementById("customerAddress").value.trim(),

            note:document.getElementById("customerNote").value.trim(),

            createdAt:new Date().toLocaleString()

        };

        if(customer.name==="" || customer.mobile===""){

            alert("⚠️ নাম এবং মোবাইল নম্বর লিখুন");

            return;

        }

        // Duplicate Mobile Check

        const duplicate = customers.find((item,index)=>

            item.mobile===customer.mobile &&
            index!==editIndex

        );

        if(duplicate){

            alert("❌ এই মোবাইল নম্বর ইতিমধ্যে আছে");

            return;

        }

        if(editIndex===-1){

            customers.push(customer);

            alert("✅ Customer Successfully Added");

        }else{

            customers[editIndex]=customer;

            alert("✅ Customer Successfully Updated");

            editIndex=-1;

        }

        saveCustomers();

        loadCustomers();

        customerForm.reset();

    });

}

// =====================================================
// Edit Customer
// =====================================================

function editCustomer(index){

    const customer = customers[index];

    if(!customer) return;

    document.getElementById("customerName").value =
    customer.name;

    document.getElementById("customerMobile").value =
    customer.mobile;

    document.getElementById("customerEmail").value =
    customer.email || "";

    document.getElementById("customerAddress").value =
    customer.address || "";

    document.getElementById("customerNote").value =
    customer.note || "";

    editIndex=index;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}// =====================================================
// Delete Customer
// =====================================================

function deleteCustomer(index){

    if(!confirm("আপনি কি এই গ্রাহককে মুছে ফেলতে চান?")){

        return;

    }

    customers.splice(index,1);

    saveCustomers();

    loadCustomers();

}

// =====================================================
// Live Search
// =====================================================

if(searchCustomer){

    searchCustomer.addEventListener("keyup",function(){

        loadCustomers(this.value);

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
// App Start
// =====================================================

document.addEventListener("DOMContentLoaded",function(){

    loadCustomers();

});