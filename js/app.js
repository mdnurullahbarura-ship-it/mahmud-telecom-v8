// ==============================
// Scroll To Top Button
// ==============================

const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {

    if (document.documentElement.scrollTop > 300) {

        scrollBtn.style.display = "block";

    } else {

        scrollBtn.style.display = "none";

    }

};

scrollBtn.onclick = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};