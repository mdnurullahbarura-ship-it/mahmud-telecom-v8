// ======================================
// MAHMUD TELECOM
// MOBILE RECHARGE SYSTEM
// PART 18-3
// ======================================


// ======================================
// Local Storage
// ======================================

let rechargeList =
    JSON.parse(
        localStorage.getItem("rechargeList")
    ) || [];


// ======================================
// Elements
// ======================================

const rechargeForm =
    document.getElementById("rechargeForm");

const rechargeTableBody =
    document.getElementById(
        "rechargeTableBody"
    );

const rechargeSearch =
    document.getElementById(
        "rechargeSearch"
    );


// ======================================
// Save Recharge
// ======================================

function saveRecharge() {

    localStorage.setItem(
        "rechargeList",
        JSON.stringify(rechargeList)
    );

}


// ======================================
// Format Money
// ======================================

function formatRechargeMoney(amount) {

    return Number(amount || 0)
        .toLocaleString();

}


// ======================================
// Add Recharge
// ======================================

if (rechargeForm) {

    rechargeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const mobile =
                document
                .getElementById(
                    "rechargeMobile"
                )
                .value
                .trim();


            const operator =
                document
                .getElementById(
                    "rechargeOperator"
                )
                .value;


            const amount =
                Number(
                    document
                    .getElementById(
                        "rechargeAmount"
                    )
                    .value
                );


            const customer =
                document
                .getElementById(
                    "rechargeCustomer"
                )
                .value
                .trim();


            const payment =
                document
                .getElementById(
                    "rechargePayment"
                )
                .value;


            const note =
                document
                .getElementById(
                    "rechargeNote"
                )
                .value
                .trim();


            // ==================================
            // Validation
            // ==================================

            if (!mobile) {

                alert(
                    "⚠️ Mobile Number দিন"
                );

                return;

            }


            if (!/^01\d{9}$/.test(mobile)) {

                alert(
                    "⚠️ সঠিক ১১ সংখ্যার Mobile Number দিন"
                );

                return;

            }


            if (!operator) {

                alert(
                    "⚠️ Operator নির্বাচন করুন"
                );

                return;

            }


            if (!amount || amount <= 0) {

                alert(
                    "⚠️ সঠিক Recharge Amount দিন"
                );

                return;

            }


            if (!payment) {

                alert(
                    "⚠️ Payment Method নির্বাচন করুন"
                );

                return;

            }


            // ==================================
            // Current Date & Time
            // ==================================

            const now =
                new Date();


            // ==================================
            // Recharge Data
            // ==================================

            const rechargeData = {

                id: Date.now(),

                mobile: mobile,

                operator: operator,

                amount: amount,

                customer:
                    customer ||
                    "Walk-in Customer",

                payment: payment,

                note: note,

                date:
                    now.toLocaleDateString(
                        "en-GB"
                    ),

                time:
                    now.toLocaleTimeString(
                        "en-US"
                    )

            };


            // ==================================
            // Save
            // ==================================

            rechargeList.push(
                rechargeData
            );


            saveRecharge();


            // ==================================
            // Reset
            // ==================================

            rechargeForm.reset();


            // ==================================
            // Refresh
            // ==================================

            loadRechargeHistory();

            updateRechargeSummary();

            loadOperatorSummary();


            // ==================================
            // Success
            // ==================================

            alert(
                "✅ Recharge সফলভাবে Save হয়েছে\n\n" +
                "Mobile: " +
                mobile +
                "\nOperator: " +
                operator +
                "\nAmount: ৳" +
                formatRechargeMoney(
                    amount
                )
            );

        }
    );

}


// ======================================
// Load Recharge History
// ======================================

function loadRechargeHistory(
    searchText = ""
) {

    if (!rechargeTableBody) {

        return;

    }


    rechargeTableBody.innerHTML =
        "";


    const search =
        String(searchText || "")
        .toLowerCase()
        .trim();


    const filtered =
        rechargeList.filter(
            function(item) {

                const mobile =
                    String(
                        item.mobile || ""
                    )
                    .toLowerCase();


                const customer =
                    String(
                        item.customer || ""
                    )
                    .toLowerCase();


                const operator =
                    String(
                        item.operator || ""
                    )
                    .toLowerCase();


                return (

                    mobile.includes(search)

                    ||

                    customer.includes(search)

                    ||

                    operator.includes(search)

                );

            }
        );


    // ==================================
    // No Data
    // ==================================

    if (filtered.length === 0) {

        rechargeTableBody.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                    text-align:center;
                    padding:25px;
                    ">

                    কোনো Recharge Data নেই

                </td>

            </tr>

        `;

        return;

    }


    // ==================================
    // History Rows
    // ==================================

    filtered
        .slice()
        .reverse()
        .forEach(
            function(item, index) {

                rechargeTableBody.innerHTML += `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>

                            ${item.date || "-"}

                            <br>

                            <small>
                                ${item.time || ""}
                            </small>

                        </td>

                        <td>
                            ${item.mobile || "-"}
                        </td>

                        <td>
                            ${item.operator || "-"}
                        </td>

                        <td>
                            ${item.customer || "-"}
                        </td>

                        <td>

                            <strong>
                                ৳ ${formatRechargeMoney(
                                    item.amount
                                )}
                            </strong>

                        </td>

                        <td>
                            ${item.payment || "-"}
                        </td>

                        <td>

                            <button
    type="button"
    class="btn btn-primary"
    onclick="printRecharge(${item.id})">

    🖨️ Print

</button>

<button
    type="button"
    class="btn btn-danger"
    onclick="deleteRecharge(${item.id})">

    🗑️ Delete

</button>

                        </td>

                    </tr>

                `;

            }
        );

}


// ======================================
// Search
// ======================================

if (rechargeSearch) {

    rechargeSearch.addEventListener(
        "input",
        function() {

            loadRechargeHistory(
                rechargeSearch.value
            );

        }
    );

}


// ======================================
// Delete Recharge
// ======================================

function deleteRecharge(id) {

    const item =
        rechargeList.find(
            function(recharge) {

                return recharge.id === id;

            }
        );


    if (!item) {

        alert(
            "❌ Recharge Data পাওয়া যায়নি"
        );

        return;

    }


    const confirmDelete =
        confirm(
            "⚠️ এই Recharge Record মুছে ফেলতে চান?\n\n" +
            "Mobile: " +
            item.mobile +
            "\nOperator: " +
            item.operator +
            "\nAmount: ৳" +
            formatRechargeMoney(
                item.amount
            )
        );


    if (!confirmDelete) {

        return;

    }


    rechargeList =
        rechargeList.filter(
            function(recharge) {

                return recharge.id !== id;

            }
        );


    saveRecharge();


    loadRechargeHistory();

    updateRechargeSummary();

    loadOperatorSummary();


    alert(
        "✅ Recharge Record মুছে ফেলা হয়েছে"
    );

}


// ======================================
// Update Main Summary
// ======================================

function updateRechargeSummary() {

    const totalRecharge =
        rechargeList.reduce(
            function(total, item) {

                return total +
                    Number(
                        item.amount || 0
                    );

            },
            0
        );


    const today =
        new Date()
        .toLocaleDateString(
            "en-GB"
        );


    const todayRecharge =
        rechargeList
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


    const transactionCount =
        rechargeList.length;


    const totalRechargeElement =
        document.getElementById(
            "totalRecharge"
        );


    const todayRechargeElement =
        document.getElementById(
            "todayRecharge"
        );


    const totalRechargeCountElement =
        document.getElementById(
            "totalRechargeCount"
        );


    if (totalRechargeElement) {

        totalRechargeElement.innerText =
            "৳" +
            formatRechargeMoney(
                totalRecharge
            );

    }


    if (todayRechargeElement) {

        todayRechargeElement.innerText =
            "৳" +
            formatRechargeMoney(
                todayRecharge
            );

    }


    if (totalRechargeCountElement) {

        totalRechargeCountElement.innerText =
            transactionCount;

    }

}


// ======================================
// Operator Summary Container
// ======================================

function createOperatorSummary() {

    let section =
        document.getElementById(
            "operatorSummarySection"
        );


    if (section) {

        return section;

    }


    section =
        document.createElement(
            "section"
        );


    section.id =
        "operatorSummarySection";


    section.className =
        "dashboard-box";


    section.innerHTML = `

        <h2>
            📊 Operator-wise Recharge
        </h2>

        <div
            id="operatorSummary"
            style="
            display:grid;
            grid-template-columns:
            repeat(auto-fit,minmax(150px,1fr));
            gap:12px;
            margin-top:15px;
            ">

        </div>

    `;


    const main =
        document.querySelector(
            ".main-content"
        );


    if (main) {

        main.appendChild(section);

    }


    return section;

}


// ======================================
// Operator Summary
// ======================================

function loadOperatorSummary() {

    createOperatorSummary();


    const container =
        document.getElementById(
            "operatorSummary"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    const operators = [

        "Grameenphone",

        "Robi",

        "Airtel",

        "Banglalink",

        "Teletalk",

        "Skitto"

    ];


    operators.forEach(
        function(operator) {

            const operatorData =
                rechargeList.filter(
                    function(item) {

                        return (
                            item.operator ===
                            operator
                        );

                    }
                );


            const total =
                operatorData.reduce(
                    function(sum, item) {

                        return sum +
                            Number(
                                item.amount || 0
                            );

                    },
                    0
                );


            const count =
                operatorData.length;


            container.innerHTML += `

                <div
                    class="card"
                    style="
                    min-height:100px;
                    ">

                    <h3>
                        📱 ${operator}
                    </h3>

                    <h2>
                        ৳${formatRechargeMoney(
                            total
                        )}
                    </h2>

                    <small>
                        ${count} Transaction
                    </small>

                </div>

            `;

        }
    );

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

        loadRechargeHistory();

        updateRechargeSummary();

        loadOperatorSummary();

    }
);// ======================================
// RECHARGE RECEIPT / PRINT
// PART 18-4
// ======================================

function printRecharge(id) {

    const item =
        rechargeList.find(
            function(recharge) {

                return recharge.id === id;

            }
        );


    if (!item) {

        alert(
            "❌ Recharge Data পাওয়া যায়নি"
        );

        return;

    }


    const shopName =
        localStorage.getItem("shopName")
        || "Mahmud Telecom";


    const receiptWindow =
        window.open(
            "",
            "_blank",
            "width=400,height=650"
        );


    if (!receiptWindow) {

        alert(
            "⚠️ Print Window খুলতে পারেনি। Browser-এর popup অনুমতি দিন।"
        );

        return;

    }


    receiptWindow.document.write(`

<!DOCTYPE html>

<html lang="bn">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>Recharge Receipt</title>


<style>

body {

    font-family:

        Arial,
        "Noto Sans Bengali",
        sans-serif;

    margin: 0;

    padding: 20px;

    background: #fff;

    color: #222;

}


.receipt {

    width: 100%;

    max-width: 360px;

    margin: auto;

}


.header {

    text-align: center;

    border-bottom: 2px dashed #333;

    padding-bottom: 12px;

    margin-bottom: 15px;

}


.header h2 {

    margin: 0 0 5px;

    font-size: 22px;

}


.header p {

    margin: 3px 0;

    font-size: 13px;

}


.title {

    text-align: center;

    font-size: 18px;

    font-weight: bold;

    margin: 15px 0;

}


.info {

    width: 100%;

    border-collapse: collapse;

}


.info td {

    padding: 7px 3px;

    font-size: 14px;

    border-bottom: 1px dotted #aaa;

}


.info td:first-child {

    font-weight: bold;

    width: 42%;

}


.amount {

    font-size: 22px;

    font-weight: bold;

    text-align: center;

    padding: 15px;

    margin-top: 15px;

    border: 2px solid #222;

}


.footer {

    text-align: center;

    margin-top: 20px;

    padding-top: 12px;

    border-top: 2px dashed #333;

    font-size: 12px;

}


.print-btn {

    display: block;

    margin: 20px auto 0;

    padding: 10px 25px;

    border: none;

    background: #1565c0;

    color: white;

    border-radius: 5px;

    cursor: pointer;

    font-size: 15px;

}


@media print {

    body {

        padding: 0;

    }


    .print-btn {

        display: none;

    }

}

</style>

</head>


<body>


<div class="receipt">


    <div class="header">

        <h2>
            📱 ${shopName}
        </h2>

        <p>
            Mobile Recharge Service
        </p>

    </div>


    <div class="title">

        🧾 Recharge Receipt

    </div>


    <table class="info">


        <tr>

            <td>
                Date
            </td>

            <td>
                ${item.date || "-"}
            </td>

        </tr>


        <tr>

            <td>
                Time
            </td>

            <td>
                ${item.time || "-"}
            </td>

        </tr>


        <tr>

            <td>
                Mobile
            </td>

            <td>
                ${item.mobile || "-"}
            </td>

        </tr>


        <tr>

            <td>
                Operator
            </td>

            <td>
                ${item.operator || "-"}
            </td>

        </tr>


        <tr>

            <td>
                Customer
            </td>

            <td>
                ${item.customer || "Walk-in Customer"}
            </td>

        </tr>


        <tr>

            <td>
                Payment
            </td>

            <td>
                ${item.payment || "-"}
            </td>

        </tr>


        ${
            item.note
            ?

            `

            <tr>

                <td>
                    Note
                </td>

                <td>
                    ${item.note}
                </td>

            </tr>

            `

            :

            ""

        }


    </table>


    <div class="amount">

        Total Recharge:

        ৳${formatRechargeMoney(
            item.amount
        )}

    </div>


    <div class="footer">

        <p>
            ধন্যবাদ আমাদের সেবা গ্রহণ করার জন্য।
        </p>

        <p>
            Mahmud Telecom
        </p>

    </div>


    <button
        class="print-btn"
        onclick="window.print()">

        🖨️ Print Receipt

    </button>


</div>


</body>

</html>

    `);


    receiptWindow.document.close();


    receiptWindow.focus();

}