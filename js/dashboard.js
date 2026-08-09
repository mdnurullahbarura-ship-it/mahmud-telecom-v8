// ==========================================
// Mahmud Telecom V8
// Dashboard JS - Part 16-4
// ==========================================


// ==========================================
// Logout
// ==========================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        if (confirm("আপনি কি লগআউট করতে চান?")) {

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("adminName");

            window.location.href = "login.html";

        }

    });

}


// ==========================================
// Load Data
// ==========================================

const products =
    JSON.parse(localStorage.getItem("products")) || [];

const customers =
    JSON.parse(localStorage.getItem("customers")) || [];

const sales =
    JSON.parse(localStorage.getItem("sales")) || [];


// ==========================================
// Dashboard Cards
// ==========================================

const totalProducts =
    document.getElementById("totalProducts");

const totalCustomers =
    document.getElementById("totalCustomers");

const todaySales =
    document.getElementById("todaySales");

const profit =
    document.getElementById("profit");


// Total Products

if (totalProducts) {

    totalProducts.textContent =
        products.length;

}


// Total Customers

if (totalCustomers) {

    totalCustomers.textContent =
        customers.length;

}


// ==========================================
// Sales Calculation
// ==========================================

let totalSale = 0;

let totalProfit = 0;


sales.forEach(function (sale) {

    // নতুন POS System-এর total
    const saleAmount =
        Number(sale.total) ||
        Number(sale.amount) ||
        0;

    totalSale += saleAmount;


    // Profit থাকলে সেটি ব্যবহার
    if (sale.profit !== undefined) {

        totalProfit +=
            Number(sale.profit) || 0;

    }

});


// ==========================================
// Today's Sales
// ==========================================

if (todaySales) {

    todaySales.textContent =
        "৳ " +
        totalSale.toLocaleString();

}


// ==========================================
// Profit
// ==========================================

if (profit) {

    profit.textContent =
        "৳ " +
        totalProfit.toLocaleString();

}


// ==========================================
// Dashboard Date
// ==========================================

const dashboardDate =
    document.getElementById("dashboardDate");


function updateDashboardDate() {

    if (!dashboardDate) return;

    const now = new Date();

    const options = {

        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"

    };

    dashboardDate.textContent =
        now.toLocaleDateString(
            "en-US",
            options
        );

}


updateDashboardDate();


// ==========================================
// Recent Sales
// ==========================================

const salesTable =
    document.getElementById("salesTable");


if (salesTable) {

    salesTable.innerHTML = "";


    if (sales.length === 0) {

        salesTable.innerHTML = `

            <tr>

                <td colspan="3"
                    style="text-align:center;">

                    কোনো বিক্রয়ের তথ্য নেই

                </td>

            </tr>

        `;

    } else {

        // সর্বশেষ ৫টি Sale

        const recentSales =
            sales.slice(-5).reverse();


        recentSales.forEach(function (sale) {

            const amount =
                Number(sale.total) ||
                Number(sale.amount) ||
                0;


            const date =
                sale.date || "-";


            const customer =
                sale.customer ||
                "Cash Customer";


            salesTable.innerHTML += `

                <tr>

                    <td>
                        ${date}
                    </td>

                    <td>
                        ${customer}
                    </td>

                    <td>
                        ৳ ${amount.toLocaleString()}
                    </td>

                </tr>

            `;

        });

    }

}// ==========================================
// LOW STOCK PRODUCTS
// PART 16-7
// ==========================================

const lowStockList =
    document.getElementById("lowStockList");


function loadLowStockProducts() {

    if (!lowStockList) return;


    // Products আবার Load করা
    const currentProducts =
        JSON.parse(
            localStorage.getItem("products")
        ) || [];


    // Low Stock Products বের করা
    const lowStockProducts =
        currentProducts.filter(function (product) {

            const stock =
                Number(product.stock) || 0;

            const lowStock =
                Number(product.lowStock) || 5;

            return stock <= lowStock;

        });


    // কোনো Low Stock না থাকলে
    if (lowStockProducts.length === 0) {

        lowStockList.innerHTML = `

            <div class="empty-low-stock">

                <i class="fas fa-check-circle"></i>

                <p>
                    কোনো Low Stock Product নেই
                </p>

            </div>

        `;

        return;
    }


    // Low Stock List
    lowStockList.innerHTML = "";


    lowStockProducts
        .slice(0, 5)
        .forEach(function (product) {

            const stock =
                Number(product.stock) || 0;


            lowStockList.innerHTML += `

                <div class="low-stock-item">

                    <div class="low-stock-info">

                        <strong>
                            ${product.name || "Unnamed Product"}
                        </strong>

                        <small>
                            ${product.category || "No Category"}
                        </small>

                    </div>

                    <span class="low-stock-count">

                        Stock: ${stock}

                    </span>

                </div>

            `;

        });

}


// Load Low Stock
loadLowStockProducts();