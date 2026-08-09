// =====================================================
// Mahmud Telecom V8
// Settings Module
// Part 13B-1
// =====================================================

"use strict";

// ======================================
// Elements
// ======================================

const settingsForm =
document.getElementById("settingsForm");

const shopName =
document.getElementById("shopName");

const ownerName =
document.getElementById("ownerName");

const shopMobile =
document.getElementById("shopMobile");

const shopEmail =
document.getElementById("shopEmail");

const shopAddress =
document.getElementById("shopAddress");

const invoiceFooter =
document.getElementById("invoiceFooter");

// ======================================
// Save Settings
// ======================================

function saveSettings(){

    const settings={

        shopName:shopName.value.trim(),

        ownerName:ownerName.value.trim(),

        shopMobile:shopMobile.value.trim(),

        shopEmail:shopEmail.value.trim(),

        shopAddress:shopAddress.value.trim(),

        invoiceFooter:invoiceFooter.value.trim()

    };

    localStorage.setItem(
        "shopSettings",
        JSON.stringify(settings)
    );

    alert("✅ Settings Successfully Saved");

}

// ======================================
// Load Settings
// ======================================

function loadSettings(){

    const settings = JSON.parse(

        localStorage.getItem("shopSettings")

    ) || {};

    shopName.value =
    settings.shopName || "Mahmud Telecom";

    ownerName.value =
    settings.ownerName || "";

    shopMobile.value =
    settings.shopMobile || "";

    shopEmail.value =
    settings.shopEmail || "";

    shopAddress.value =
    settings.shopAddress || "";

    invoiceFooter.value =
    settings.invoiceFooter ||
    "ধন্যবাদ। আবার আসবেন।";

}

// ======================================
// Form Submit
// ======================================

if(settingsForm){

    settingsForm.addEventListener(

        "submit",

        function(e){

            e.preventDefault();

            saveSettings();

        }

    );

}// =====================================================
// Change Admin Password
// =====================================================

const passwordForm =
document.getElementById("passwordForm");

if(passwordForm){

    passwordForm.addEventListener("submit",function(e){

        e.preventDefault();

        const currentPassword =
        document.getElementById("currentPassword").value;

        const newPassword =
        document.getElementById("newPassword").value;

        const confirmPassword =
        document.getElementById("confirmPassword").value;

        const savedPassword =
        localStorage.getItem("adminPassword") || "1234";

        // Current Password Check

        if(currentPassword !== savedPassword){

            alert("❌ বর্তমান পাসওয়ার্ড সঠিক নয়");

            return;

        }

        // Empty Check

        if(newPassword.trim() === ""){

            alert("⚠️ নতুন পাসওয়ার্ড লিখুন");

            return;

        }

        // Confirm Password Check

        if(newPassword !== confirmPassword){

            alert("❌ নতুন পাসওয়ার্ড মিলছে না");

            return;

        }

        // Save Password

        localStorage.setItem(
            "adminPassword",
            newPassword
        );

        alert("✅ পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে");

        passwordForm.reset();

    });

}// =====================================================
// Professional Backup Data
// =====================================================

const backupBtn =
document.getElementById("backupBtn");

if(backupBtn){

    backupBtn.addEventListener("click",function(){

        const settings = JSON.parse(
            localStorage.getItem("shopSettings")
        ) || {};

        const shop =
        (settings.shopName || "MahmudTelecom")
        .replace(/\s+/g,"_");

        const now = new Date();

        const date =
        now.getFullYear() + "-" +
        String(now.getMonth()+1).padStart(2,"0") + "-" +
        String(now.getDate()).padStart(2,"0");

        const time =
        String(now.getHours()).padStart(2,"0") + "-" +
        String(now.getMinutes()).padStart(2,"0");

        const backup = {

            appName : "Mahmud Telecom V8",

            version : "8.0",

            backupDate : now.toLocaleString(),

            summary : {

                products :
                JSON.parse(localStorage.getItem("products")||"[]").length,

                customers :
                JSON.parse(localStorage.getItem("customers")||"[]").length,

                suppliers :
                JSON.parse(localStorage.getItem("suppliers")||"[]").length,

                sales :
                JSON.parse(localStorage.getItem("sales")||"[]").length,

                purchases :
                JSON.parse(localStorage.getItem("purchases")||"[]").length

            },

            data : {}

        };

        for(let i=0;i<localStorage.length;i++){

            const key = localStorage.key(i);

            backup.data[key] =
            localStorage.getItem(key);

        }

        const blob = new Blob(

            [JSON.stringify(backup,null,2)],

            {type:"application/json"}

        );

        const link =
        document.createElement("a");

        link.href =
        URL.createObjectURL(blob);

        link.download =
        `${shop}_Backup_${date}_${time}.json`;

        link.click();

        URL.revokeObjectURL(link.href);

        alert("✅ Backup সফলভাবে তৈরি হয়েছে");

    });

}

// =====================================================
// Complete Restore Data
// =====================================================

const restoreBtn =
document.getElementById("restoreBtn");

const restoreFile =
document.getElementById("restoreFile");

if(restoreBtn && restoreFile){

    restoreBtn.addEventListener("click",function(){

        restoreFile.click();

    });

    restoreFile.addEventListener("change",function(e){

        const file = e.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = function(event){

            try{

                const backup =
                JSON.parse(event.target.result);

                const ok = confirm(
                    "এই Backup Restore করলে বর্তমান ডেটা পরিবর্তিত হবে। চালিয়ে যাবেন?"
                );

                if(!ok) return;

                localStorage.clear();

                Object.keys(backup.data).forEach(function(key){

    localStorage.setItem(

        key,

        backup.data[key]

    );

});

                alert("✅ Backup সফলভাবে Restore হয়েছে।");

                location.reload();

            }catch(error){

                alert("❌ Invalid Backup File!");

                console.error(error);

            }

        };

        reader.readAsText(file);

    });

}

// =====================================================
// Reset All Data
// =====================================================

const resetDataBtn =
document.getElementById("resetDataBtn");

if(resetDataBtn){

    resetDataBtn.addEventListener("click",function(){

        const ok = confirm(

"সব তথ্য মুছে যাবে। আপনি কি নিশ্চিত?"

        );

        if(!ok) return;

        localStorage.clear();

        alert("✅ সকল তথ্য মুছে ফেলা হয়েছে");

        window.location.href="login.html";

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
// Initialize
// =====================================================

document.addEventListener("DOMContentLoaded",function(){

    loadSettings();

});

// =====================================================
// End of Settings Module
// =====================================================