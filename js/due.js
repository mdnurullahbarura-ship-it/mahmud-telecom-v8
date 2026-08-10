// ======================================
// MAHMUD TELECOM
// DUE MANAGEMENT SYSTEM
// PART 17-3
// ======================================


// ======================================
// Local Storage
// ======================================

let dueList =
    JSON.parse(localStorage.getItem("dueList")) || [];

let duePayments =
    JSON.parse(localStorage.getItem("duePayments")) || [];


// ======================================
// Elements
// ======================================

const dueForm =
    document.getElementById("dueForm");

const dueTableBody =
    document.getElementById("dueTableBody");

const duePaymentTableBody =
    document.getElementById("duePaymentTableBody");

const dueSearch =
    document.getElementById("dueSearch");


// ======================================
// Save Due
// ======================================

function saveDue() {

    localStorage.setItem(
        "dueList",
        JSON.stringify(dueList)
    );

}


// ======================================
// Save Payments
// ======================================

function saveDuePayments() {

    localStorage.setItem(
        "duePayments",
        JSON.stringify(duePayments)
    );

}


// ======================================
// Format Money
// ======================================

function formatMoney(amount) {

    return Number(amount || 0)
        .toLocaleString();

}


// ======================================
// Normalize Name
// ======================================

function normalizeName(name) {

    return String(name || "")
        .trim()
        .toLowerCase();

}


// ======================================
// Normalize Phone
// ======================================

function normalizePhone(phone) {

    return String(phone || "")
        .replace(/\D/g, "");

}


// ======================================
// Find Existing Customer Due
// ======================================

function findExistingDue(name, phone) {

    const newName =
        normalizeName(name);

    const newPhone =
        normalizePhone(phone);


    return dueList.find(function(item) {

        const oldName =
            normalizeName(item.name);

        const oldPhone =
            normalizePhone(item.phone);


        // Phone থাকলে Phone দিয়ে মিলানো হবে
        if (newPhone && oldPhone) {

            return newPhone === oldPhone;

        }


        // Phone না থাকলে Name দিয়ে মিলানো হবে
        if (!newPhone && !oldPhone) {

            return newName === oldName;

        }


        return false;

    });

}


// ======================================
// Add Due
// ======================================

if (dueForm) {

    dueForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById("dueCustomerName")
                .value
                .trim();


            const phone =
                document
                .getElementById("dueCustomerPhone")
                .value
                .trim();


            const amount =
                Number(
                    document
                    .getElementById("dueAmount")
                    .value
                );


            const note =
                document
                .getElementById("dueNote")
                .value
                .trim();


            // ==================================
            // Validation
            // ==================================

            if (!name) {

                alert(
                    "⚠️ Customer Name দিন"
                );

                return;

            }


            if (amount <= 0) {

                alert(
                    "⚠️ সঠিক Due Amount দিন"
                );

                return;

            }


            // ==================================
            // Check Existing Customer
            // ==================================

            const existingDue =
                findExistingDue(
                    name,
                    phone
                );


            // ==================================
            // Existing Customer
            // ==================================

            if (existingDue) {

                existingDue.amount =
                    Number(existingDue.amount || 0)
                    + amount;


                // Phone আগে না থাকলে নতুন Phone রাখবে
                if (
                    !existingDue.phone &&
                    phone
                ) {

                    existingDue.phone =
                        phone;

                }


                // নতুন Note থাকলে যোগ করবে
                if (note) {

                    if (existingDue.note) {

                        existingDue.note +=
                            " | " + note;

                    } else {

                        existingDue.note =
                            note;

                    }

                }


                existingDue.updatedDate =
                    new Date()
                    .toLocaleDateString("en-GB");


                saveDue();


                dueForm.reset();


                loadDueList();

                updateDueSummary();


                alert(
                    "✅ আগের Customer-এর Due-এর সাথে টাকা যোগ হয়েছে\n\n" +
                    "Customer: " +
                    existingDue.name +
                    "\nবর্তমান Due: ৳" +
                    formatMoney(
                        existingDue.amount
                    )
                );


                return;

            }


            // ==================================
            // New Customer Due
            // ==================================

            const dueData = {

                id: Date.now(),

                name: name,

                phone: phone,

                amount: amount,

                note: note,

                date:
                    new Date()
                    .toLocaleDateString("en-GB")

            };


            dueList.push(
                dueData
            );


            saveDue();


            dueForm.reset();


            loadDueList();

            updateDueSummary();


            alert(
                "✅ Customer Due যোগ হয়েছে"
            );

        }
    );

}


// ======================================
// Load Due List
// ======================================

function loadDueList(searchText = "") {

    if (!dueTableBody) return;


    dueTableBody.innerHTML = "";


    const search =
        String(searchText || "")
        .toLowerCase()
        .trim();


    const filtered =
        dueList.filter(function(item) {

            const name =
                String(item.name || "")
                .toLowerCase();


            const phone =
                String(item.phone || "")
                .toLowerCase();


            return (
                name.includes(search) ||
                phone.includes(search)
            );

        });


    // ==================================
    // No Data
    // ==================================

    if (filtered.length === 0) {

        dueTableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                    text-align:center;
                    padding:25px;
                    ">

                    কোনো Due Data নেই

                </td>

            </tr>

        `;

        return;

    }


    // ==================================
    // Due Rows
    // ==================================

    filtered.forEach(
        function(item, index) {

            dueTableBody.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${item.name}
                    </td>

                    <td>
                        ${item.phone || "-"}
                    </td>

                    <td>
                        <strong>
                            ৳ ${formatMoney(item.amount)}
                        </strong>
                    </td>

                    <td>
                        ${item.date || "-"}
                    </td>

                    <td>

                        <button
                            type="button"
                            onclick="payDue(${item.id})"
                            class="btn btn-primary">

                            💵 Pay

                        </button>


                        <button
                            type="button"
                            onclick="deleteDue(${item.id})"
                            class="btn btn-danger">

                            🗑️ Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


// ======================================
// Search Due
// ======================================

if (dueSearch) {

    dueSearch.addEventListener(
        "input",
        function() {

            loadDueList(
                dueSearch.value
            );

        }
    );

}


// ======================================
// Pay Due
// ======================================

function payDue(id) {

    const item =
        dueList.find(
            function(due) {

                return due.id === id;

            }
        );


    // ==================================
    // Customer Not Found
    // ==================================

    if (!item) {

        alert(
            "❌ Due Data পাওয়া যায়নি"
        );

        return;

    }


    const currentDue =
        Number(item.amount || 0);


    if (currentDue <= 0) {

        alert(
            "⚠️ এই Customer-এর কোনো Due নেই"
        );

        return;

    }


    // ==================================
    // Payment Input
    // ==================================

    const paymentInput =
        prompt(
            "💵 কত টাকা বাকি আদায় হয়েছে?\n\n" +
            "বর্তমান Due: ৳" +
            formatMoney(currentDue)
        );


    // Cancel
    if (
        paymentInput === null
    ) {

        return;

    }


    const payment =
        Number(
            paymentInput
        );


    // ==================================
    // Validate Payment
    // ==================================

    if (
        !Number.isFinite(payment) ||
        payment <= 0
    ) {

        alert(
            "⚠️ সঠিক Payment Amount দিন"
        );

        return;

    }


    if (payment > currentDue) {

        alert(
            "⚠️ Due-এর চেয়ে বেশি টাকা নেওয়া যাবে না\n\n" +
            "বর্তমান Due: ৳" +
            formatMoney(currentDue)
        );

        return;

    }


    // ==================================
    // Remaining Due
    // ==================================

    const remainingDue =
        currentDue - payment;


    item.amount =
        remainingDue;


    // ==================================
    // Payment History
    // ==================================

    duePayments.push({

        id: Date.now(),

        dueId: item.id,

        name: item.name,

        phone: item.phone || "",

        amount: payment,

        date:
            new Date()
            .toLocaleDateString("en-GB"),

        time:
            new Date()
            .toLocaleTimeString(
                "en-US"
            )

    });


    // ==================================
    // Full Payment
    // ==================================

    if (remainingDue <= 0) {

        dueList =
            dueList.filter(
                function(due) {

                    return due.id !== id;

                }
            );

    }


    // ==================================
    // Save
    // ==================================

    saveDue();

    saveDuePayments();


    // ==================================
    // Refresh
    // ==================================

    loadDueList();

    loadDuePayments();

    updateDueSummary();


    // ==================================
    // Success Message
    // ==================================

    if (remainingDue <= 0) {

        alert(
            "✅ সম্পূর্ণ Due আদায় হয়েছে\n\n" +
            "Customer: " +
            item.name +
            "\nআদায়: ৳" +
            formatMoney(payment) +
            "\nবাকি: ৳0"
        );

    } else {

        alert(
            "✅ Due Payment সফল হয়েছে\n\n" +
            "Customer: " +
            item.name +
            "\nআদায়: ৳" +
            formatMoney(payment) +
            "\nবর্তমান বাকি: ৳" +
            formatMoney(remainingDue)
        );

    }

}


// ======================================
// Delete Due
// ======================================

function deleteDue(id) {

    const item =
        dueList.find(
            function(due) {

                return due.id === id;

            }
        );


    if (!item) {

        alert(
            "❌ Due Data পাওয়া যায়নি"
        );

        return;

    }


    const confirmDelete =
        confirm(
            "⚠️ এই Due মুছে ফেলতে চান?\n\n" +
            "Customer: " +
            item.name +
            "\nDue: ৳" +
            formatMoney(item.amount)
        );


    if (!confirmDelete) {

        return;

    }


    dueList =
        dueList.filter(
            function(due) {

                return due.id !== id;

            }
        );


    saveDue();


    loadDueList();

    updateDueSummary();


    alert(
        "✅ Due মুছে ফেলা হয়েছে"
    );

}


// ======================================
// Load Payment History
// ======================================

function loadDuePayments() {

    if (!duePaymentTableBody) {

        return;

    }


    duePaymentTableBody.innerHTML =
        "";


    // ==================================
    // No Payment Data
    // ==================================

    if (duePayments.length === 0) {

        duePaymentTableBody.innerHTML = `

            <tr>

                <td
                    colspan="3"
                    style="
                    text-align:center;
                    padding:25px;
                    ">

                    কোনো Payment Data নেই

                </td>

            </tr>

        `;

        return;

    }


    // ==================================
    // Recent Payments
    // ==================================

    duePayments
        .slice()
        .reverse()
        .slice(0, 20)
        .forEach(
            function(item) {

                duePaymentTableBody.innerHTML += `

                    <tr>

                        <td>
                            ${item.date || "-"}
                            <br>
                            <small>
                                ${item.time || ""}
                            </small>
                        </td>

                        <td>

                            ${item.name}

                            ${
                                item.phone
                                ? `<br>
                                   <small>
                                   ${item.phone}
                                   </small>`
                                : ""
                            }

                        </td>

                        <td>

                            <strong>
                                ৳ ${formatMoney(item.amount)}
                            </strong>

                        </td>

                    </tr>

                `;

            }
        );

}


// ======================================
// Update Summary
// ======================================

function updateDueSummary() {

    // ==================================
    // Total Due
    // ==================================

    const totalDue =
        dueList.reduce(
            function(total, item) {

                return total +
                    Number(
                        item.amount || 0
                    );

            },
            0
        );


    // ==================================
    // Due Customers
    // ==================================

    const customers =
        dueList.length;


    // ==================================
    // Today's Collection
    // ==================================

    const today =
        new Date()
        .toLocaleDateString("en-GB");


    const todayCollection =
        duePayments
        .filter(
            function(item) {

                return item.date === today;

            }
        )
        .reduce(
            function(total, item) {

                return total +
                    Number(
                        item.amount || 0
                    );

            },
            0
        );


    // ==================================
    // Elements
    // ==================================

    const totalDueElement =
        document.getElementById(
            "totalDue"
        );


    const dueCustomersElement =
        document.getElementById(
            "dueCustomers"
        );


    const todayCollectionElement =
        document.getElementById(
            "todayCollection"
        );


    // ==================================
    // Update UI
    // ==================================

    if (totalDueElement) {

        totalDueElement.innerText =
            "৳" +
            formatMoney(totalDue);

    }


    if (dueCustomersElement) {

        dueCustomersElement.innerText =
            customers;

    }


    if (todayCollectionElement) {

        todayCollectionElement.innerText =
            "৳" +
            formatMoney(
                todayCollection
            );

    }

}



// ======================================
// PRINT DUE REPORT
// ======================================

function printDueReport() {

    const search =
        String(dueSearch ? dueSearch.value : "")
        .toLowerCase()
        .trim();

    const filtered =
        dueList.filter(function(item) {

            const name =
                String(item.name || "")
                .toLowerCase();

            const phone =
                String(item.phone || "")
                .toLowerCase();

            return (
                name.includes(search) ||
                phone.includes(search)
            );

        });

    const total =
        filtered.reduce(function(sum, item) {
            return sum + Number(item.amount || 0);
        }, 0);

    const rows =
        filtered.length
        ? filtered.map(function(item, index) {

            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${escapePrint(item.name)}</td>
                    <td>${escapePrint(item.phone || "-")}</td>
                    <td>৳ ${formatMoney(item.amount)}</td>
                    <td>${escapePrint(item.date || "-")}</td>
                    <td>${escapePrint(item.note || "-")}</td>
                </tr>
            `;

        }).join("")
        : `
            <tr>
                <td colspan="6" style="text-align:center;">
                    কোনো Due Data নেই
                </td>
            </tr>
        `;

    openPrintWindow(
        "Customer Due Report",
        `
        <div class="report-head">
            <h1>Mahmud Telecom</h1>
            <h2>Customer Due Report</h2>
            <p>তারিখ: ${new Date().toLocaleDateString("en-GB")}</p>
            ${search ? `<p>Search: ${escapePrint(search)}</p>` : ""}
        </div>

        <div class="summary">
            <strong>মোট কাস্টমার:</strong> ${filtered.length}
            &nbsp;&nbsp;&nbsp;
            <strong>মোট বকেয়া:</strong> ৳ ${formatMoney(total)}
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>Due</th>
                    <th>Date</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>

        <p class="signature">কাস্টমারের স্বাক্ষর: ____________________</p>
        `
    );
}


// ======================================
// PRINT DUE COLLECTION REPORT
// ======================================

function printDuePaymentsReport() {

    const recent =
        duePayments
        .slice()
        .reverse();

    const total =
        recent.reduce(function(sum, item) {
            return sum + Number(item.amount || 0);
        }, 0);

    const rows =
        recent.length
        ? recent.map(function(item, index) {

            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${escapePrint(item.date || "-")}<br>${escapePrint(item.time || "")}</td>
                    <td>${escapePrint(item.name || "-")}</td>
                    <td>${escapePrint(item.phone || "-")}</td>
                    <td>৳ ${formatMoney(item.amount)}</td>
                </tr>
            `;

        }).join("")
        : `
            <tr>
                <td colspan="5" style="text-align:center;">
                    কোনো Payment Data নেই
                </td>
            </tr>
        `;

    openPrintWindow(
        "Due Collection Report",
        `
        <div class="report-head">
            <h1>Mahmud Telecom</h1>
            <h2>Due Collection Report</h2>
            <p>তারিখ: ${new Date().toLocaleDateString("en-GB")}</p>
        </div>

        <div class="summary">
            <strong>মোট আদায়:</strong> ৳ ${formatMoney(total)}
            &nbsp;&nbsp;&nbsp;
            <strong>মোট রেকর্ড:</strong> ${recent.length}
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date / Time</th>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>Paid</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        `
    );
}


// ======================================
// PRINT HELPERS
// ======================================

function escapePrint(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function openPrintWindow(title, content) {

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=1000,height=750"
        );

    if (!printWindow) {

        alert(
            "⚠️ Print window খুলতে পারিনি। Browser-এর popup অনুমতি দিন।"
        );

        return;

    }

    printWindow.document.open();

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escapePrint(title)}</title>
            <style>
                *{box-sizing:border-box}
                body{
                    font-family:"Noto Sans Bengali","Hind Siliguri","SolaimanLipi",Arial,sans-serif;
                    margin:30px;
                    color:#111;
                    background:#fff;
                    line-height:1.5;
                }
                .report-head{
                    text-align:center;
                    margin-bottom:18px;
                }
                .report-head h1{
                    margin:0;
                    font-size:26px;
                }
                .report-head h2{
                    margin:4px 0;
                    font-size:21px;
                }
                .report-head p{
                    margin:3px 0;
                }
                .summary{
                    margin:12px 0 18px;
                    padding:10px;
                    border:1px solid #777;
                }
                table{
                    width:100%;
                    border-collapse:collapse;
                }
                th,td{
                    border:1px solid #333;
                    padding:7px 8px;
                    text-align:left;
                    vertical-align:top;
                }
                th{
                    background:#eee;
                }
                .signature{
                    margin-top:45px;
                    text-align:right;
                }
                @media print{
                    body{margin:12mm}
                }
            </style>
        </head>
        <body>
            ${content}
            <script>
                window.onload = function(){
                    setTimeout(function(){
                        window.print();
                    }, 250);
                };
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}


// ======================================
// Logout
// ======================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "isLoggedIn"
            );

            location.href =
                "login.html";

        }
    );

}



// ======================================
// PRINT BUTTONS
// ======================================

const printDueBtn =
    document.getElementById("printDueBtn");

if (printDueBtn) {

    printDueBtn.addEventListener(
        "click",
        printDueReport
    );

}


const printDuePaymentsBtn =
    document.getElementById("printDuePaymentsBtn");

if (printDuePaymentsBtn) {

    printDuePaymentsBtn.addEventListener(
        "click",
        printDuePaymentsReport
    );

}


// ======================================
// Initial Load
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadDueList();

        loadDuePayments();

        updateDueSummary();

    }
);