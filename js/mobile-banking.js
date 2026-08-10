// ======================================================
// MAHMUD TELECOM V8
// MOBILE BANKING SYSTEM
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // ELEMENTS
    // ==================================================

    const form =
        document.getElementById("newMobileTransactionForm");

    const table =
        document.getElementById("mbTransactionTable");

    const noData =
        document.getElementById("mbNoData");

    const search =
        document.getElementById("mbSearch");


    // ==================================================
    // STORAGE
    // ==================================================

    const STORAGE_KEY =
        "mahmudMobileBankingTransactions";


    let transactions =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || [];


    // ==================================================
    // SAVE STORAGE
    // ==================================================

    function saveTransactions() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(transactions)
        );

    }


    // ==================================================
    // MONEY FORMAT
    // ==================================================

    function money(amount) {

        return "৳ " +
            Number(amount || 0)
                .toLocaleString("en-BD");

    }


    // ==================================================
    // DATE
    // ==================================================

    function getDate() {

        const now = new Date();

        return now.toLocaleString("en-BD");

    }


    // ==================================================
    // ACCOUNT BALANCE
    // ==================================================

    function calculateBalances() {

        const balances = {

            bKash: 0,

            Nagad: 0,

            Rocket: 0,

            mCash: 0,

            CellFin: 0,

            "Bank Account": 0,

            Cash: 0

        };


        transactions.forEach(function (item) {

            const account =
                item.account;

            const amount =
                Number(item.amount || 0);


            if (
                !Object.prototype.hasOwnProperty.call(
                    balances,
                    account
                )
            ) {

                return;

            }


            if (
                item.type === "Receive"
            ) {

                balances[account] += amount;

            }


            if (
                item.type === "Payment"
            ) {

                balances[account] -= amount;

            }

        });


        return balances;

    }


    // ==================================================
    // UPDATE BALANCE CARDS
    // ==================================================

    function updateBalances() {

        const balances =
            calculateBalances();


        const bkash =
            document.getElementById(
                "mbBkashBalance"
            );

        const nagad =
            document.getElementById(
                "mbNagadBalance"
            );

        const rocket =
            document.getElementById(
                "mbRocketBalance"
            );

        const mcash =
            document.getElementById(
                "mbMcashBalance"
            );

        const cellfin =
            document.getElementById(
                "mbCellfinBalance"
            );

        const bank =
            document.getElementById(
                "mbBankBalance"
            );

        const cash =
            document.getElementById(
                "mbCashBalance"
            );


        if (bkash) {

            bkash.textContent =
                money(balances.bKash);

        }


        if (nagad) {

            nagad.textContent =
                money(balances.Nagad);

        }


        if (rocket) {

            rocket.textContent =
                money(balances.Rocket);

        }


        if (mcash) {

            mcash.textContent =
                money(balances.mCash);

        }


        if (cellfin) {

            cellfin.textContent =
                money(balances.CellFin);

        }


        if (bank) {

            bank.textContent =
                money(balances["Bank Account"]);

        }


        if (cash) {

            cash.textContent =
                money(balances.Cash);

        }

    }


    // ==================================================
    // RENDER TRANSACTIONS
    // ==================================================

    function renderTransactions(
        keyword = ""
    ) {

        if (!table) {

            return;

        }


        table.innerHTML = "";


        const searchText =
            String(keyword)
                .toLowerCase()
                .trim();


        const filtered =
            transactions.filter(
                function (item) {

                    const text = [

                        item.customer,

                        item.mobile,

                        item.account,

                        item.type,

                        item.service,

                        item.transactionId,

                        item.note

                    ]
                        .join(" ")
                        .toLowerCase();


                    return text.includes(
                        searchText
                    );

                }
            );


        if (
            filtered.length === 0
        ) {

            if (noData) {

                noData.style.display =
                    "block";

            }

            return;

        }


        if (noData) {

            noData.style.display =
                "none";

        }


        filtered.forEach(
            function (item, index) {

                const row =
                    document.createElement("tr");


                const typeClass =
                    item.type === "Receive"
                        ? "receive"
                        : "payment";


                row.innerHTML = `

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${item.date || ""}
                    </td>

                    <td>
                        ${escapeHTML(
                            item.customer
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            item.mobile
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            item.account
                        )}
                    </td>

                    <td class="${typeClass}">
                        ${escapeHTML(
                            item.type
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            item.service
                        )}
                    </td>

                    <td>
                        ${money(
                            item.amount
                        )}
                    </td>

                    <td>
                        ${money(
                            item.charge
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            item.transactionId ||
                            "-"
                        )}
                    </td>

                    <td>

                        <button
                            type="button"
                            class="mb-delete"
                            data-id="${item.id}"
                        >
                            🗑️ Delete
                        </button>

                    </td>

                `;


                table.appendChild(row);

            }
        );


        // ==============================================
        // DELETE BUTTONS
        // ==============================================

        const deleteButtons =
            table.querySelectorAll(
                ".mb-delete"
            );


        deleteButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                this.dataset.id
                            );


                        const confirmDelete =
                            confirm(
                                "এই লেনদেনটি Delete করতে চান?"
                            );


                        if (
                            !confirmDelete
                        ) {

                            return;

                        }


                        transactions =
                            transactions.filter(
                                function (item) {

                                    return item.id !== id;

                                }
                            );


                        saveTransactions();

                        renderTransactions(
                            search
                                ? search.value
                                : ""
                        );

                        updateBalances();

                    }
                );

            }
        );

    }


    // ==================================================
    // FORM SUBMIT
    // ==================================================

    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // ======================================
                // GET VALUES
                // ======================================

                const customer =
                    document
                        .getElementById(
                            "mbCustomer"
                        )
                        .value
                        .trim();


                const mobile =
                    document
                        .getElementById(
                            "mbMobile"
                        )
                        .value
                        .trim();


                const account =
                    document
                        .getElementById(
                            "mbAccount"
                        )
                        .value;


                const type =
                    document
                        .getElementById(
                            "mbType"
                        )
                        .value;


                const service =
                    document
                        .getElementById(
                            "mbService"
                        )
                        .value;


                const amount =
                    Number(
                        document
                            .getElementById(
                                "mbAmount"
                            )
                            .value
                    );


                const charge =
                    Number(
                        document
                            .getElementById(
                                "mbCharge"
                            )
                            .value
                    ) || 0;


                const transactionId =
                    document
                        .getElementById(
                            "mbTransactionId"
                        )
                        .value
                        .trim();


                const note =
                    document
                        .getElementById(
                            "mbNote"
                        )
                        .value
                        .trim();


                // ======================================
                // VALIDATION
                // ======================================

                if (!customer) {

                    alert(
                        "⚠️ Customer Name দিন।"
                    );

                    return;

                }


                if (!mobile) {

                    alert(
                        "⚠️ Mobile Number দিন।"
                    );

                    return;

                }


                if (!account) {

                    alert(
                        "⚠️ Account / Method নির্বাচন করুন।"
                    );

                    return;

                }


                if (!type) {

                    alert(
                        "⚠️ Transaction Type নির্বাচন করুন।"
                    );

                    return;

                }


                if (!service) {

                    alert(
                        "⚠️ Service নির্বাচন করুন।"
                    );

                    return;

                }


                if (
                    !amount ||
                    amount <= 0
                ) {

                    alert(
                        "⚠️ সঠিক Amount দিন।"
                    );

                    return;

                }


                // ======================================
                // CREATE TRANSACTION
                // ======================================

                const transaction = {

                    id:
                        Date.now(),

                    date:
                        getDate(),

                    customer:
                        customer,

                    mobile:
                        mobile,

                    account:
                        account,

                    type:
                        type,

                    service:
                        service,

                    amount:
                        amount,

                    charge:
                        charge,

                    transactionId:
                        transactionId,

                    note:
                        note

                };


                // ======================================
                // ADD
                // ======================================

                transactions.unshift(
                    transaction
                );


                // ======================================
                // SAVE
                // ======================================

                saveTransactions();


                // ======================================
                // UPDATE
                // ======================================

                renderTransactions();

                updateBalances();


                // ======================================
                // RESET FORM
                // ======================================

                form.reset();


                const chargeInput =
                    document.getElementById(
                        "mbCharge"
                    );


                if (chargeInput) {

                    chargeInput.value =
                        "0";

                }


                // ======================================
                // SUCCESS
                // ======================================

                alert(
                    "✅ লেনদেন সফলভাবে Save হয়েছে।"
                );

            }
        );

    }


    // ==================================================
    // SEARCH
    // ==================================================

    if (search) {

        search.addEventListener(
            "input",
            function () {

                renderTransactions(
                    this.value
                );

            }
        );

    }


    // ==================================================
    // ESCAPE HTML
    // ==================================================

    function escapeHTML(value) {

        return String(
            value ?? ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    // ==================================================
    // INITIAL LOAD
    // ==================================================

    renderTransactions();

    updateBalances();

});

// ======================================================
// PRINT TRANSACTION REPORT
// ======================================================
document.addEventListener("DOMContentLoaded", function () {

    const printBtn = document.getElementById("mbPrintBtn");
    const search = document.getElementById("mbSearch");
    const summary = document.getElementById("mbPrintSummary");

    if (!printBtn) return;

    printBtn.addEventListener("click", function () {

        const keyword = search ? search.value.toLowerCase().trim() : "";
        const storageKey = "mahmudMobileBankingTransactions";
        const allTransactions =
            JSON.parse(localStorage.getItem(storageKey) || "[]");

        const filtered = allTransactions.filter(function (item) {
            const text = [
                item.customer,
                item.mobile,
                item.account,
                item.type,
                item.service,
                item.transactionId,
                item.note
            ].join(" ").toLowerCase();

            return text.includes(keyword);
        });

        let totalAmount = 0;
        let totalCharge = 0;

        filtered.forEach(function (item) {
            totalAmount += Number(item.amount || 0);
            totalCharge += Number(item.charge || 0);
        });

        if (summary) {
            summary.textContent =
                "তারিখ: " + new Date().toLocaleString("bn-BD") +
                " | মোট লেনদেন: " + filtered.length +
                " | মোট Amount: ৳ " + totalAmount.toLocaleString("en-BD") +
                " | মোট Charge: ৳ " + totalCharge.toLocaleString("en-BD") +
                (keyword ? " | Search: " + keyword : "");
        }

        // Render current filter before printing.
        const event = new Event("input", { bubbles: true });
        if (search) search.dispatchEvent(event);

        setTimeout(function () {
            window.print();
        }, 150);
    });

});

