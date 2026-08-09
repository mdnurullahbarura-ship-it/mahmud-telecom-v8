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