// =====================================================
// Mahmud Telecom V8
// Reports Module
// Part 12B-1
// =====================================================

"use strict";

// ======================================
// Local Storage Data
// ======================================

const sales =
JSON.parse(localStorage.getItem("sales")) || [];

const purchases =
JSON.parse(localStorage.getItem("purchases")) || [];

const products =
JSON.parse(localStorage.getItem("products")) || [];

const customers =
JSON.parse(localStorage.getItem("customers")) || [];

const suppliers =
JSON.parse(localStorage.getItem("suppliers")) || [];

// ======================================
// Summary Elements
// ======================================

const reportTotalSales =
document.getElementById("reportTotalSales");

const reportTotalPurchase =
document.getElementById("reportTotalPurchase");

const reportTotalProfit =
document.getElementById("reportTotalProfit");

const reportTotalProducts =
document.getElementById("reportTotalProducts");

const reportTotalCustomers =
document.getElementById("reportTotalCustomers");

const reportTotalSuppliers =
document.getElementById("reportTotalSuppliers");

const lowStockTableBody =
document.getElementById("lowStockTableBody");

// ======================================
// Load Summary
// ======================================

function loadSummary(){

    const totalSales = sales.reduce(

        (sum,item)=>

        sum + Number(item.total || item.amount || 0),

        0

    );

    const totalPurchase = purchases.reduce(

        (sum,item)=>

        sum + Number(item.total || 0),

        0

    );

    const totalProfit = sales.reduce(

    (sum, item) => {

        return sum +
            (
                Number(item.profit) || 0
            );

    },

    0

);

    reportTotalSales.textContent =
    "৳ " + totalSales.toLocaleString();

    reportTotalPurchase.textContent =
    "৳ " + totalPurchase.toLocaleString();

    reportTotalProfit.textContent =
    "৳ " + totalProfit.toLocaleString();

    reportTotalProducts.textContent =
    products.length;

    reportTotalCustomers.textContent =
    customers.length;

    reportTotalSuppliers.textContent =
    suppliers.length;

}// =====================================================
// Low Stock Report
// =====================================================

const recentSalesBody =
document.getElementById("recentSalesBody");

const recentPurchaseBody =
document.getElementById("recentPurchaseBody");

function loadLowStock(){

    if(!lowStockTableBody) return;

    lowStockTableBody.innerHTML = "";

    const lowStockProducts = products.filter(item => {

    const stock =
        Number(item.stock || 0);

    const lowStock =
        Number(item.lowStock) || 5;

    return stock <= lowStock;

});

    if(lowStockProducts.length===0){

        lowStockTableBody.innerHTML = `

        <tr>

            <td colspan="3"
            style="text-align:center;padding:25px;">

                কোনো Low Stock Product নেই

            </td>

        </tr>`;

        return;

    }

    lowStockProducts.forEach((item,index)=>{

        lowStockTableBody.innerHTML +=`

        <tr>

            <td>${index+1}</td>

            <td>${item.name}</td>

            <td>${item.stock}</td>

        </tr>`;

    });

}

// =====================================================
// Recent Sales
// =====================================================

function loadRecentSales(){

    if(!recentSalesBody) return;

    recentSalesBody.innerHTML = "";

    const recent = sales.slice(-10).reverse();

    if(recent.length===0){

        recentSalesBody.innerHTML = `

        <tr>

            <td colspan="4"
            style="text-align:center;padding:25px;">

                কোনো Sales Data নেই

            </td>

        </tr>`;

        return;

    }

    recent.forEach((item,index)=>{

        recentSalesBody.innerHTML +=`

        <tr>

            <td>${index+1}</td>

            <td>${item.date || "-"}</td>

            <td>${item.customer || "Walk-in Customer"}</td>

            <td>৳ ${Number(item.total || item.amount || 0).toLocaleString()}</td>

        </tr>`;

    });

}

// =====================================================
// Recent Purchases
// =====================================================

function loadRecentPurchases(){

    if(!recentPurchaseBody) return;

    recentPurchaseBody.innerHTML = "";

    const recent = purchases.slice(-10).reverse();

    if(recent.length===0){

        recentPurchaseBody.innerHTML = `

        <tr>

            <td colspan="4"
            style="text-align:center;padding:25px;">

                কোনো Purchase Data নেই

            </td>

        </tr>`;

        return;

    }

    recent.forEach((item,index)=>{

        recentPurchaseBody.innerHTML +=`

        <tr>

            <td>${index+1}</td>

            <td>${item.date}</td>

            <td>${item.supplier}</td>

            <td>৳ ${Number(item.total).toLocaleString()}</td>

        </tr>`;

    });

}// =====================================================
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
// Initialize Reports
// =====================================================

document.addEventListener("DOMContentLoaded",function(){

    loadSummary();

    loadLowStock();

    loadRecentSales();

    loadRecentPurchases();

});

// =====================================================
// End of Reports Module
// =====================================================
// ======================================
// REPORT CSV EXPORT
// PART 16-13-1
// ======================================

function downloadCSV(filename, rows) {

    const csvContent = rows
        .map(row =>
            row.map(value => {

                const text =
                    String(value ?? "");

                return `"${text.replace(/"/g, '""')}"`;

            }).join(",")
        )
        .join("\n");


    const blob = new Blob(
        ["\uFEFF" + csvContent],
        {
            type: "text/csv;charset=utf-8;"
        }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}


// ======================================
// Export Sales
// ======================================

const exportSalesBtn =
    document.getElementById("exportSalesBtn");


if (exportSalesBtn) {

    exportSalesBtn.addEventListener(
        "click",
        function () {
const currentSales =
    JSON.parse(localStorage.getItem("sales")) || [];
            if (currentSales.length === 0) {

                alert(
                    "⚠️ কোনো Sales Data নেই"
                );

                return;
            }


            const rows = [

                [
                    "Invoice No",
                    "Date",
                    "Customer",
                    "Total",
                    "Profit"
                ]

            ];


            currentSales.forEach(function (sale) {

                rows.push([

                    sale.invoiceNo || "",

                    sale.date || "",

                    sale.customer ||
                    "Walk-in Customer",

                    Number(
                        sale.total ||
                        sale.amount ||
                        0
                    ),

                    Number(
                        sale.profit || 0
                    )

                ]);

            });


            downloadCSV(
                "Mahmud-Telecom-Sales-Report.csv",
                rows
            );

        }
    );

}


// ======================================
// Export Purchases
// ======================================

const exportPurchaseBtn =
    document.getElementById("exportPurchaseBtn");


if (exportPurchaseBtn) {

    exportPurchaseBtn.addEventListener(
        "click",
        function () {

            if (purchases.length === 0) {

                alert(
                    "⚠️ কোনো Purchase Data নেই"
                );

                return;
            }


            const rows = [

                [
                    "Date",
                    "Supplier",
                    "Total"
                ]

            ];


            purchases.forEach(function (purchase) {

                rows.push([

                    purchase.date || "",

                    purchase.supplier || "",

                    Number(
                        purchase.total || 0
                    )

                ]);

            });


            downloadCSV(
                "Mahmud-Telecom-Purchase-Report.csv",
                rows
            );

        }
    );

}