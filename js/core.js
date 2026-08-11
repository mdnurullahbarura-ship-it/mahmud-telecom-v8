/* Mahmud Telecom V8 - Global Core / Security / Language / Report Tools */
(function(){
"use strict";

const PUBLIC=new Set(["login.html","index.html",""]);
const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();

/* Login gate for all private modules. */
if(!PUBLIC.has(page) && localStorage.getItem("isLoggedIn")!=="true"){
  location.replace("login.html");
  return;
}

const EN_BN={"Dashboard": "ড্যাশবোর্ড", "Products": "পণ্য", "POS": "বিক্রয় (POS)", "Purchase": "ক্রয়", "Due": "বাকি", "Recharge": "রিচার্জ", "Mobile Banking": "মোবাইল ব্যাংকিং", "Customers": "গ্রাহক", "Suppliers": "সরবরাহকারী", "Reports": "রিপোর্ট", "Settings": "সেটিংস", "Logout": "লগআউট", "Shop Management V8": "দোকান ব্যবস্থাপনা V8", "Mobile Recharge": "মোবাইল রিচার্জ", "Mobile Recharge Management": "মোবাইল রিচার্জ ব্যবস্থাপনা", "Total Recharge": "মোট রিচার্জ", "Today's Recharge": "আজকের রিচার্জ", "Total Transactions": "মোট লেনদেন", "Mobile Number": "মোবাইল নম্বর", "Operator": "অপারেটর", "Recharge Amount": "রিচার্জের পরিমাণ", "Customer Name": "গ্রাহকের নাম", "Payment Method": "পেমেন্ট পদ্ধতি", "Note": "নোট", "Submit": "জমা দিন", "Recharge Save": "রিচার্জ সংরক্ষণ", "Recharge History": "রিচার্জের ইতিহাস", "Date": "তারিখ", "Mobile": "মোবাইল", "Customer": "গ্রাহক", "Amount": "পরিমাণ", "Payment": "পেমেন্ট", "Action": "অ্যাকশন", "New Mobile Recharge": "নতুন মোবাইল রিচার্জ", "Grameenphone": "গ্রামীণফোন", "Robi": "রবি", "Airtel": "এয়ারটেল", "Banglalink": "বাংলালিংক", "Teletalk": "টেলিটক", "Skitto": "স্কিটো", "Cash": "নগদ টাকা", "bKash": "বিকাশ", "Nagad": "নগদ", "Rocket": "রকেট", "Card": "কার্ড", "Point Of Sale (POS)": "বিক্রয় কেন্দ্র (POS)", "Available Products": "উপলভ্য পণ্য", "Shopping Cart": "শপিং কার্ট", "Cart খালি": "কার্ট খালি", "Summary": "সারসংক্ষেপ", "Subtotal :": "উপমোট :", "Discount :": "ছাড় :", "Total :": "মোট :", "Complete Sale": "বিক্রয় সম্পন্ন করুন", "Customer Information": "গ্রাহকের তথ্য", "Sale Note": "বিক্রয় নোট", "Invoice Preview": "ইনভয়েস প্রিভিউ", "Print Invoice": "ইনভয়েস প্রিন্ট", "Shop Information": "দোকানের তথ্য", "Shop Name": "দোকানের নাম", "Owner Name": "মালিকের নাম", "Email": "ইমেইল", "Shop Address": "দোকানের ঠিকানা", "Invoice Footer": "ইনভয়েসের নিচের লেখা", "Save Settings": "সেটিংস সংরক্ষণ", "Reset": "রিসেট", "Security": "নিরাপত্তা", "Current Password": "বর্তমান পাসওয়ার্ড", "New Password": "নতুন পাসওয়ার্ড", "Confirm Password": "পাসওয়ার্ড নিশ্চিত করুন", "Change Password": "পাসওয়ার্ড পরিবর্তন", "Backup & Restore": "ব্যাকআপ ও পুনরুদ্ধার", "Backup Data": "ডেটা ব্যাকআপ", "Restore Data": "ডেটা পুনরুদ্ধার", "Reset All Data": "সব ডেটা মুছুন", "Due Management": "বাকি ব্যবস্থাপনা", "Total Due": "মোট বাকি", "Total Customers": "মোট গ্রাহক", "Today's Collection": "আজকের আদায়", "Add Customer Due": "গ্রাহকের বাকি যোগ করুন", "Due Amount": "বাকির পরিমাণ", "Add Due": "বাকি যোগ করুন", "Customer Due Report": "গ্রাহকের বাকি রিপোর্ট", "Due List": "বাকির তালিকা", "Print Due Report": "বাকি রিপোর্ট প্রিন্ট", "Due Collection Report": "বাকি আদায় রিপোর্ট", "Recent Due Payments": "সাম্প্রতিক বাকি আদায়", "Print Collection Report": "আদায় রিপোর্ট প্রিন্ট", "Paid": "পরিশোধিত", "SALES INVOICE": "বিক্রয় ইনভয়েস", "Invoice No:": "ইনভয়েস নং:", "Date:": "তারিখ:", "Customer:": "গ্রাহক:", "Product": "পণ্য", "Qty": "পরিমাণ", "Price": "দাম", "Total": "মোট", "Grand Total :": "সর্বমোট :", "Mobile Banking & Digital Services": "মোবাইল ব্যাংকিং ও ডিজিটাল সেবা", "Current Balance": "বর্তমান ব্যালেন্স", "Bank Account": "ব্যাংক অ্যাকাউন্ট", "Digital Services": "ডিজিটাল সেবা", "Transaction Receipt": "লেনদেনের রসিদ", "Print Receipt": "রসিদ প্রিন্ট", "Back": "ফিরে যান", "Bill Payment": "বিল পেমেন্ট", "Account": "অ্যাকাউন্ট", "Account / Method": "অ্যাকাউন্ট / পদ্ধতি", "Transaction Type": "লেনদেনের ধরন", "Receive": "গ্রহণ", "Service": "সেবা", "Add Money": "অ্যাড মানি", "Transfer": "ট্রান্সফার", "Other": "অন্যান্য", "Charge": "চার্জ", "Transaction ID": "লেনদেন আইডি", "SAVE": "সংরক্ষণ করুন", "Save Transaction": "লেনদেন সংরক্ষণ", "Transaction Report": "লেনদেন রিপোর্ট", "Transaction History": "লেনদেনের ইতিহাস", "Print Report": "রিপোর্ট প্রিন্ট", "Type": "ধরন", "Supplier Management": "সরবরাহকারী ব্যবস্থাপনা", "Company Name": "কোম্পানির নাম", "Contact Person": "যোগাযোগের ব্যক্তি", "Previous Due": "পূর্বের বাকি", "Save Supplier": "সরবরাহকারী সংরক্ষণ", "Supplier List": "সরবরাহকারীর তালিকা", "Company": "কোম্পানি", "Reports & Analytics": "রিপোর্ট ও বিশ্লেষণ", "Export Sales CSV": "বিক্রয় CSV এক্সপোর্ট", "Export Purchase CSV": "ক্রয় CSV এক্সপোর্ট", "Total Sales": "মোট বিক্রয়", "Total Purchase": "মোট ক্রয়", "Total Profit": "মোট লাভ", "Total Products": "মোট পণ্য", "Low Stock Products": "কম স্টকের পণ্য", "Stock": "স্টক", "Recent Sales": "সাম্প্রতিক বিক্রয়", "Recent Purchases": "সাম্প্রতিক ক্রয়", "Product Management": "পণ্য ব্যবস্থাপনা", "Accessories": "অ্যাক্সেসরিজ", "Electronics": "ইলেকট্রনিক্স", "SIM": "সিম", "Purchase Price": "ক্রয় মূল্য", "Selling Price": "বিক্রয় মূল্য", "Low Stock Alert": "কম স্টক সতর্কতা", "Barcode / IMEI": "বারকোড / IMEI", "Product Image": "পণ্যের ছবি", "Save Product": "পণ্য সংরক্ষণ", "Product List": "পণ্যের তালিকা", "Image": "ছবি", "Category": "ক্যাটাগরি", "Brand": "ব্র্যান্ড", "Buy Price": "ক্রয় মূল্য", "Sell Price": "বিক্রয় মূল্য", "Status": "স্ট্যাটাস", "Product Preview": "পণ্যের প্রিভিউ", "Delete Product": "পণ্য মুছুন", "Delete": "মুছুন", "Cancel": "বাতিল", "Purchase Management": "ক্রয় ব্যবস্থাপনা", "Supplier": "সরবরাহকারী", "Purchase Date": "ক্রয়ের তারিখ", "Total Amount": "মোট টাকা", "Save Purchase": "ক্রয় সংরক্ষণ", "Purchase History": "ক্রয়ের ইতিহাস", "Quantity": "পরিমাণ", "Welcome back to Mahmud Telecom 👋": "মাহমুদ টেলিকমে স্বাগতম 👋", "Loading...": "লোড হচ্ছে...", "Products in inventory": "ইনভেন্টরিতে পণ্য", "Today's Sales": "আজকের বিক্রয়", "Today's total sales": "আজকের মোট বিক্রয়", "Registered customers": "নিবন্ধিত গ্রাহক", "Profit": "লাভ", "Business profit": "ব্যবসার লাভ", "Sales Summary": "বিক্রয় সারসংক্ষেপ", "Total Invoices": "মোট ইনভয়েস", "Average Sale": "গড় বিক্রয়", "Quick Actions": "দ্রুত কাজ", "New Sale": "নতুন বিক্রয়", "Customer Management": "গ্রাহক ব্যবস্থাপনা", "Email (Optional)": "ইমেইল (ঐচ্ছিক)", "Save Customer": "গ্রাহক সংরক্ষণ", "Customer List": "গ্রাহক তালিকা", "Shop Management System V8": "দোকান ব্যবস্থাপনা সিস্টেম V8", "Login": "লগইন", "Login | Mahmud Telecom": "লগইন | মাহমুদ টেলিকম", "Operator নির্বাচন করুন": "অপারেটর নির্বাচন করুন", "Payment Method নির্বাচন করুন": "পেমেন্ট পদ্ধতি নির্বাচন করুন", "Product নির্বাচন করুন": "পণ্য নির্বাচন করুন", "Supplier নির্বাচন করুন": "সরবরাহকারী নির্বাচন করুন", "Total: 0": "মোট: ০", "Total: ৳0": "মোট: ৳০", "কোনো Recharge Data নেই": "কোনো রিচার্জ ডেটা নেই", "কোনো Due Data নেই": "কোনো বাকি ডেটা নেই", "কোনো Payment Data নেই": "কোনো পেমেন্ট ডেটা নেই", "কোনো Sales Data নেই": "কোনো বিক্রয় ডেটা নেই", "কোনো Purchase Data নেই": "কোনো ক্রয় ডেটা নেই", "এখনো কোনো Supplier যোগ করা হয়নি": "এখনো কোনো সরবরাহকারী যোগ করা হয়নি", "এখনো কোনো Purchase যোগ করা হয়নি": "এখনো কোনো ক্রয় যোগ করা হয়নি", "এখনো কোনো গ্রাহক যোগ করা হয়নি": "এখনো কোনো গ্রাহক যোগ করা হয়নি", "কোনো Low Stock Product নেই": "কোনো কম স্টকের পণ্য নেই", "কোনো পণ্য নির্বাচন করা হয়নি": "কোনো পণ্য নির্বাচন করা হয়নি", "এখনো কোনো Invoice তৈরি হয়নি": "এখনো কোনো ইনভয়েস তৈরি হয়নি", "Digital Services | Mahmud Telecom V8": "ডিজিটাল সেবা | মাহমুদ টেলিকম V8", "Digital Services | Mahmud Telecom": "ডিজিটাল সেবা | মাহমুদ টেলিকম", "Address": "ঠিকানা", "Print": "প্রিন্ট", "PNG": "PNG", "Download PNG": "PNG ডাউনলোড", "Invoice": "ইনভয়েস", "Sales Invoice": "বিক্রয় ইনভয়েস", "Walk-in Customer": "সাধারণ গ্রাহক", "Cash In / ক্যাশ ইন": "ক্যাশ ইন", "Cash Out / ক্যাশ আউট": "ক্যাশ আউট", "Payment / পেমেন্ট": "পেমেন্ট", "Mobile Recharge / রিচার্জ": "মোবাইল রিচার্জ / রিচার্জ", "Send Money / সেন্ড মানি": "সেন্ড মানি", "Electricity Bill / বিদ্যুৎ বিল": "বিদ্যুৎ বিল", "Gas Bill / গ্যাস বিল": "গ্যাস বিল", "Water Bill / পানি বিল": "পানি বিল", "Internet Bill / ইন্টারনেট বিল": "ইন্টারনেট বিল", "Bank Deposit / ব্যাংক জমা": "ব্যাংক জমা", "Bank Withdrawal / ব্যাংক উত্তোলন": "ব্যাংক উত্তোলন", "New Transaction": "নতুন লেনদেন", "Digital Service": "ডিজিটাল সেবা", "Transaction": "লেনদেন", "Search": "খুঁজুন", "Filter": "ফিল্টার", "Language": "ভাষা", "বাংলা": "বাংলা", "English": "ইংরেজি", "Print Current Page": "বর্তমান পৃষ্ঠা প্রিন্ট", "Download Page PNG": "পৃষ্ঠা PNG ডাউনলোড", "New Purchase": "নতুন ক্রয়", "Add Product": "পণ্য যোগ করুন", "Product Category": "পণ্যের ক্যাটাগরি", "Reference": "রেফারেন্স", "Purchase Note": "ক্রয় নোট", "Purchase Summary": "ক্রয় সারসংক্ষেপ", "Purchase Records": "ক্রয় রেকর্ড", "Total Quantity": "মোট পরিমাণ", "Add Purchase": "ক্রয় যোগ করুন", "Payment Status": "পেমেন্ট স্ট্যাটাস", "Pending": "বাকি", "CellFin": "সেলফিন", "mCash": "এমক্যাশ"};
/* Additional labels used across V8 pages. */
Object.assign(EN_BN,{
  "Purchase Management":"ক্রয় ব্যবস্থাপনা",
  "পণ্য ক্রয়, স্টক বৃদ্ধি ও ক্রয় হিসাব একসাথে পরিচালনা করুন":"পণ্য ক্রয়, স্টক বৃদ্ধি ও ক্রয় হিসাব একসাথে পরিচালনা করুন",
  "Purchase History":"ক্রয়ের ইতিহাস",
  "Buy Price":"ক্রয় মূল্য",
  "Sell Price":"বিক্রয় মূল্য",
  "Quantity":"পরিমাণ",
  "Purchase Date":"ক্রয়ের তারিখ",
  "Payment Method":"পেমেন্ট পদ্ধতি",
  "Save Purchase":"ক্রয় সংরক্ষণ",
  "Supplier":"সরবরাহকারী",
  "Select Supplier":"Supplier নির্বাচন করুন",
  "Select Product":"Product নির্বাচন করুন",
  "No Supplier Found":"কোনো Supplier পাওয়া যায়নি",
  "Owner":"মালিক",
  "Mobile Number":"মোবাইল নম্বর",
  "Total Amount":"মোট পরিমাণ",
  "This Month":"এই মাস",
  "Action":"অ্যাকশন",
  "Delete":"মুছুন",
  "Print Report":"রিপোর্ট প্রিন্ট",
  "Download PNG":"PNG ডাউনলোড"
});

const BN_EN={};
Object.keys(EN_BN).forEach(k=>{
  const v=EN_BN[k];
  if(v && v!==k && !BN_EN[v]) BN_EN[v]=k;
});

/* Common Bangla phrases that are written directly in some V8 HTML files. */
Object.assign(BN_EN,{
  "পণ্য ক্রয়, স্টক বৃদ্ধি ও ক্রয় হিসাব একসাথে পরিচালনা করুন":"Manage product purchases, stock increases and purchase records together",
  "পণ্য ক্রয়":"Purchase",
  "স্টক বৃদ্ধি":"Increase stock",
  "ক্রয় হিসাব":"Purchase records",
  "দোকানের সম্পূর্ণ ঠিকানা":"Full shop address",
  "ধন্যবাদ। আবার আসবেন।":"Thank you. Please come again.",
  "ক্রয় মূল্য":"Purchase Price",
  "বিক্রয় মূল্য":"Selling Price",
  "মোবাইল নম্বর":"Mobile Number",
  "পণ্যের ক্যাটাগরি":"Product Category",
  "ক্রয়ের তারিখ":"Purchase Date",
  "মোট টাকা":"Total Amount",
  "রিপোর্ট প্রিন্ট":"Print Report",
  "এখনো কোনো Purchase যোগ করা হয়নি":"No Purchase has been added yet",
  "এখনো কোনো Purchase যোগ করা হয়নি":"No Purchase has been added yet",
  "কোনো Supplier পাওয়া যায়নি":"No Supplier Found",
  "কোনো Supplier পাওয়া যায়নি":"No Supplier Found",
  "আগে Suppliers পেজ থেকে Supplier যোগ করুন":"Add a Supplier from the Suppliers page first",
  "পণ্য যোগ করুন":"Add Product",
  "সরবরাহকারী":"Supplier",
  "সরবরাহকারীর তালিকা":"Supplier List",
  "নতুন ক্রয়":"New Purchase",
  "ক্রয় সংরক্ষণ":"Save Purchase",
  "ক্রয়ের ইতিহাস":"Purchase History",
  "ক্রয় রেকর্ড":"Purchase Records",
  "মোট পরিমাণ":"Total Quantity",
  "ভাষা / Language":"Language / ভাষা",
  "ভাষা":"Language",
  "ওয়েবসাইট ভাষা":"Website Language",
  "দোকানের তথ্য":"Shop Information",
  "দোকানের নাম":"Shop Name",
  "মালিকের নাম":"Owner Name",
  "ইমেইল":"Email",
  "ইনভয়েসের নিচের লেখা":"Invoice Footer",
  "সেটিংস সংরক্ষণ":"Save Settings",
  "সেটিংস":"Settings",
  "ড্যাশবোর্ড":"Dashboard",
  "পণ্য":"Products",
  "বিক্রয় (POS)":"POS",
  "ক্রয়":"Purchase",
  "বাকি":"Due",
  "রিচার্জ":"Recharge",
  "মোবাইল ব্যাংকিং":"Mobile Banking",
  "গ্রাহক":"Customers",
  "রিপোর্ট":"Reports",
  "লগআউট":"Logout",
  "-- Supplier নির্বাচন করুন --":"-- Select Supplier --",
  "-- Product নির্বাচন করুন --":"-- Select Product --",
  "Products page থেকে আগে পণ্য যোগ করুন":"Add a product from the Products page first",
  "-- Operator নির্বাচন করুন --":"-- Select Operator --",
  "Operator নির্বাচন করুন":"Select Operator",
  "Payment Method নির্বাচন করুন":"Select Payment Method",
  "বাংলা ⇄ English পরিবর্তন করলে সব পেজের লেখা পরিবর্তন হবে।":"Changing বাংলা ⇄ English will change the text on all pages.",
  "দোকানের তথ্য ও সিস্টেম সেটিংস পরিচালনা করুন":"Manage shop information and system settings",
  "বিক্রয় পরিচালনা করুন":"Manage sales",
  "কোনো পণ্য পাওয়া যায়নি":"No products found",
  "Cart খালি":"Cart is empty",
  "কোনো বিক্রয়ের তথ্য নেই":"No sales data",
  "ব্যবসার মোট বিক্রয়":"Total business sales",
  "দ্রুত কাজ করার জন্য":"For quick actions",
  "কম স্টকের পণ্য":"Low stock products",
  "সিম বিক্রয়, রেজিস্ট্রেশন ও স্টক ব্যবস্থাপনা":"SIM sales, registration and stock management",
  "রিচার্জের ইতিহাস":"Recharge History",
  "পণ্যের নাম":"Product Name",
  "সব ক্যাটাগরি":"All Categories",
  "এখনো কোনো পণ্য যোগ করা হয়নি":"No products have been added yet",
  "কোনো পণ্য নির্বাচন করা হয়নি":"No product selected",
  "আপনি কি নিশ্চিত এই পণ্যটি মুছে ফেলতে চান?":"Are you sure you want to delete this product?",
  "এখনো কোনো লেনদেন নেই":"No transactions yet",
  "নির্বাচন করুন":"Select",
  "ডিজিটাল সার্ভিস":"Digital Service",
  "অন্যান্য সেবা":"Other Services",
  "নতুন লেনদেন":"New Transaction"
});

let lang=localStorage.getItem("mtLanguage")||"bn";
const norm=s=>String(s??"").replace(/\s+/g," ").trim();

/* Keep the original page text so switching BN <-> EN always starts from the same source.
   This fixes the old one-way translation problem where English could not be restored. */
const mtTextSource=new WeakMap();
const mtAttrSource=new WeakMap();

function translateString(raw,map){
  if(!raw) return raw;
  const exact=map[norm(raw)];
  if(exact) return exact;

  let out=String(raw);
  const keys=Object.keys(map).filter(k=>map[k] && map[k]!==k).sort((a,b)=>b.length-a.length);
  keys.forEach(key=>{ out=out.split(key).join(map[key]); });
  return out;
}

function translateElement(el){
  if(!el || el.nodeType!==1 || ["SCRIPT","STYLE","NOSCRIPT"].includes(el.tagName)) return;
  const map=lang==="bn"?EN_BN:BN_EN;

  el.childNodes.forEach(n=>{
    if(n.nodeType===3){
      if(!mtTextSource.has(n)) mtTextSource.set(n,n.nodeValue);
      const source=mtTextSource.get(n);
      n.nodeValue=translateString(source,map);
    } else if(n.nodeType===1){
      translateElement(n);
    }
  });

  ["placeholder","title","aria-label"].forEach(a=>{
    if(el.hasAttribute(a)){
      let attrs=mtAttrSource.get(el);
      if(!attrs){ attrs={}; mtAttrSource.set(el,attrs); }
      if(attrs[a]===undefined) attrs[a]=el.getAttribute(a);
      el.setAttribute(a,translateString(attrs[a],map));
    }
  });
}

function setLanguage(next){
  lang=next==="en"?"en":"bn";
  localStorage.setItem("mtLanguage",lang);
  document.documentElement.lang=lang==="bn"?"bn":"en";
  translateElement(document.body);
  updateControl();
  const settings=document.getElementById("settingsLanguage");
  if(settings) settings.value=lang;
}

function updateControl(){
  const s=document.getElementById("mtLanguageSelect");
  if(s) s.value=lang;
  const settings=document.getElementById("settingsLanguage");
  if(settings) settings.value=lang;
}

function lazyHtml2Canvas(){ return Promise.reject(new Error("Offline PNG mode")); }
async function downloadPagePNG(){
  const target=document.querySelector(".main-content,.mb-page,.login-page,.hero")||document.body;
  try{
    if(window.MahmudReportTools && typeof window.MahmudReportTools.downloadPNG==="function"){
      return window.MahmudReportTools.downloadPNG(target,"Mahmud_Telecom_Page_"+new Date().toISOString().slice(0,10));
    }
    const oldToolbar=document.getElementById("mtGlobalToolbar");
    const oldSidebar=document.querySelector(".sidebar");
    if(oldToolbar) oldToolbar.style.visibility="hidden";
    if(oldSidebar) oldSidebar.style.visibility="hidden";
    const html2canvas=await lazyHtml2Canvas();
    const canvas=await html2canvas(target,{scale:2,useCORS:true,allowTaint:false,backgroundColor:"#fff",logging:false,imageTimeout:20000});
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error("PNG encode failed")),"image/png"));
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.download="Mahmud_Telecom_Page_"+new Date().toISOString().slice(0,10)+".png";
    a.href=url;
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>{a.remove();URL.revokeObjectURL(url)},1000);
    if(oldToolbar) oldToolbar.style.visibility="";
    if(oldSidebar) oldSidebar.style.visibility="";
  }catch(err){
    const t=document.getElementById("mtGlobalToolbar");
    if(t) t.style.visibility="";
    const s=document.querySelector(".sidebar");
    if(s) s.style.visibility="";
    console.error(err);
    alert("PNG তৈরি করা যায়নি। পেজটি একবার Refresh (Ctrl+F5) করে আবার চেষ্টা করুন।");
  }
}

function printCurrentPage(){ window.print(); }

function addToolbar(){
  if(document.getElementById("mtGlobalToolbar")) return;
  const bar=document.createElement("div");
  bar.id="mtGlobalToolbar";
  bar.className="mt-global-toolbar";
  const privatePage=!PUBLIC.has(page);
  bar.innerHTML=
    '<label class="mt-lang-label" for="mtLanguageSelect">ভাষা / Language</label>'+
    '<select id="mtLanguageSelect" aria-label="Language">'+
      '<option value="bn">বাংলা</option><option value="en">English</option>'+
    '</select>'+
    (privatePage
      ? '<button type="button" class="mt-page-btn mt-print-page" title="Print Current Page">🖨️ <span>Print</span></button>'+
        '<button type="button" class="mt-page-btn mt-png-page" title="Download Page PNG">🖼️ <span>PNG</span></button>'
      : '');
  document.body.appendChild(bar);
  document.getElementById("mtLanguageSelect").addEventListener("change",e=>setLanguage(e.target.value));
  const settingsLanguage=document.getElementById("settingsLanguage"); if(settingsLanguage){settingsLanguage.__mtBound=true; settingsLanguage.addEventListener("change",e=>setLanguage(e.target.value));}
  bar.querySelector(".mt-print-page")?.addEventListener("click",printCurrentPage);
  bar.querySelector(".mt-png-page")?.addEventListener("click",downloadPagePNG);
  updateControl();
}

function bindLogout(){
  const b=document.getElementById("logoutBtn");
  if(b && !b.__mtBound){
    b.__mtBound=true;
    b.addEventListener("click",e=>{
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      location.replace("login.html");
    });
  }
}

/* 30-minute inactivity timeout for private modules. */
if(!PUBLIC.has(page)){
  let timer;
  const reset=()=>{
    clearTimeout(timer);
    timer=setTimeout(()=>{
      localStorage.removeItem("isLoggedIn");
      location.replace("login.html?timeout=1");
    },30*60*1000);
  };
  ["click","keydown","mousemove","touchstart"].forEach(ev=>window.addEventListener(ev,reset,{passive:true}));
  reset();
}


  /* Logo repair: keep all logo images visible on GitHub Pages. */
  function repairLogos(){
    document.querySelectorAll('img[src*="logo.png"]').forEach(img=>{
      if(img.dataset.mtLogoBound) return;
      img.dataset.mtLogoBound="1";
      img.addEventListener("error",()=>{
        const candidates=[
          "./images/logo.png",
          "images/logo.png",
          new URL("images/logo.png",document.baseURI).href
        ];
        const next=candidates.find(u=>u!==img.src);
        if(next) img.src=next;
      },{once:true});
    });
  }

  document.addEventListener("DOMContentLoaded",()=>{
  repairLogos();
  addToolbar();
  document.documentElement.lang=lang==="bn"?"bn":"en";
  translateElement(document.body);
  updateControl();
  bindLogout();
  const settingsLanguage2=document.getElementById("settingsLanguage"); if(settingsLanguage2&&!settingsLanguage2.__mtBound){settingsLanguage2.__mtBound=true;settingsLanguage2.addEventListener("change",e=>setLanguage(e.target.value));}

  /* Translate dynamically created table rows, dropdowns, etc. in both languages. */
  const observer=new MutationObserver(ms=>{
    ms.forEach(m=>m.addedNodes.forEach(n=>{
      if(n.nodeType===1) translateElement(n);
    }));
  });
  observer.observe(document.body,{childList:true,subtree:true});
});

window.MahmudTelecomCore={
  setLanguage,
  getLanguage:()=>lang,
  printCurrentPage,
  downloadPagePNG
};
})();
