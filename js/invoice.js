// =====================================================
// Mahmud Telecom V8
// Invoice Module
// Part 15A-2
// =====================================================

"use strict";

// ======================================
// Elements
// ======================================

const invoiceShopName =
document.getElementById("invoiceShopName");

const invoiceAddress =
document.getElementById("invoiceAddress");

const invoiceMobile =
document.getElementById("invoiceMobile");

const invoiceNo =
document.getElementById("invoiceNo");

const invoiceDate =
document.getElementById("invoiceDate");

const invoiceCustomer =
document.getElementById("invoiceCustomer");

const invoiceItems =
document.getElementById("invoiceItems");

const invoiceTotal =
document.getElementById("invoiceTotal");

const invoiceFooter =
document.getElementById("invoiceFooter");

// ======================================
// Load Shop Settings
// ======================================

function loadShopInfo(){

    const settings = JSON.parse(
        localStorage.getItem("shopSettings")
    ) || {};

    invoiceShopName.textContent =
    settings.shopName || "Mahmud Telecom";

    invoiceAddress.textContent =
    settings.shopAddress || "";

    invoiceMobile.textContent =
    settings.shopMobile || "";

    invoiceFooter.textContent =
    settings.invoiceFooter ||
    "ধন্যবাদ। আবার আসবেন।";

}
// ======================================
// Load Invoice
// ======================================

function loadInvoice(){

    const invoice = JSON.parse(
        localStorage.getItem("currentInvoice")
    );

    if(!invoice){

        invoiceItems.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;padding:20px;color:red;">
                Invoice Data পাওয়া যায়নি।
            </td>
        </tr>`;

        invoiceTotal.textContent = "৳ 0";
        return;
    }

    invoiceNo.textContent =
        invoice.invoiceNo || "-";

    invoiceDate.textContent =
        invoice.date || "-";

    invoiceCustomer.textContent =
        invoice.customer || "Walk-in Customer";

    invoiceItems.innerHTML = "";

    let grandTotal = 0;

    if(Array.isArray(invoice.items)){

        invoice.items.forEach((item,index)=>{

            const qty = Number(item.qty || 1);
            const price = Number(item.price || 0);
            const total = qty * price;

            grandTotal += total;

            invoiceItems.innerHTML += `
            <tr>
                <td>${item.name || "-"}</td>
                <td>${qty}</td>
                <td>৳ ${price.toLocaleString()}</td>
                <td>৳ ${total.toLocaleString()}</td>
            </tr>`;
        });

    }

    if(grandTotal === 0){

        invoiceItems.innerHTML = `
        <tr>
            <td colspan="4" style="text-align:center;padding:20px;">
                কোনো Product পাওয়া যায়নি
            </td>
        </tr>`;
    }

    invoiceTotal.textContent =
        "৳ " + grandTotal.toLocaleString();

}// =====================================================
// Print Invoice
// =====================================================

const printInvoiceBtn =
document.getElementById("printInvoiceBtn");

if(printInvoiceBtn){

    printInvoiceBtn.addEventListener("click",function(){

        // Print Button Hide
        printInvoiceBtn.style.display = "none";

        // Print
        window.print();

        // Show Button Again
        setTimeout(function(){

            printInvoiceBtn.style.display = "inline-block";

        },500);

    });

}

// =====================================================
// Print Style
// =====================================================

const style =
document.createElement("style");

style.innerHTML = `

@media print{

    body{

        margin:0;

        background:#fff;

    }

    .dashboard-btn{

        display:none !important;

    }

    .invoice-container{

        width:100%;

        margin:0;

        padding:10px;

        box-shadow:none;

    }

}

`;

document.head.appendChild(style);

// =====================================================
// Initialize
// =====================================================

document.addEventListener("DOMContentLoaded",function(){

    loadShopInfo();

    loadInvoice();

});

// =====================================================
// End Invoice Module
// =====================================================