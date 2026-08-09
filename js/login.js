// ==========================================
// Mahmud Telecom V8 Login System
// ==========================================

// Default Login

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123456";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminName", username);

        alert("✅ লগইন সফল হয়েছে");

        window.location.href = "dashboard.html";

    } else {

        alert("❌ ভুল ইউজারনেম অথবা পাসওয়ার্ড");

    }

});