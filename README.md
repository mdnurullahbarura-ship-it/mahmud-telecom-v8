# Mahmud Telecom V8 – Updated

এই আপডেটে:
- নতুন Mahmud Telecom logo ও homepage banner যোগ করা হয়েছে।
- সব dashboard page-এ একই sidebar/menu দেওয়া হয়েছে; Recharge ও Mobile Banking সব জায়গায় দৃশ্যমান।
- বাংলা ⇄ English Language setting যোগ করা হয়েছে।
- Report Print এবং PNG export system যোগ করা হয়েছে।
- Reports, Due, Recharge, Purchase, Products, Customers, Suppliers, Mobile Banking, Dashboard, Invoice/Receipt-এ report tools উন্নত করা হয়েছে।
- Mobile Banking-এর bKash/Nagad/Rocket/mCash/CellFin/Bank/Cash card ও shortcut theme উন্নত করা হয়েছে।
- Purchase module-এ product নির্বাচন করলে purchase price auto-fill হয় এবং purchase delete করলে stock reverse হয়।
- Product image এখন browser reload-এর পরও data হিসেবে সংরক্ষণ করার উপযোগী করা হয়েছে।
- Login session guard, 30-minute inactivity timeout এবং 5-attempt temporary lock যোগ করা হয়েছে।
- Settings-এর default password mismatch ঠিক করা হয়েছে; default login remains username `admin`, password `123456` (প্রথমবার লগইন করে পরিবর্তন করুন)।

## গুরুত্বপূর্ণ নিরাপত্তা কথা
GitHub Pages/static hosting-এ username/password JavaScript/localStorage ভিত্তিক হলে এটি **পূর্ণ server-side security নয়**। অন্য কেউ source code বা browser storage পরিবর্তন করে bypass করতে পারে। শুধু আপনার জন্য সত্যিকারের private website করতে Cloudflare Access/একটি server-side authentication system বা private hosting প্রয়োজন।

## Link পরিবর্তন
Website-এর URL/repository name পরিবর্তন করলেও পরে HTML/CSS/JS/ZIP update করা যাবে। URL বদলানো এবং website-এর ভিতরের files update করা আলাদা বিষয়।
