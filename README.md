# Mahmud Telecom V8 – Final Updated

এই ZIP-এ আপনার দেওয়া Mahmud Telecom logo ও banner ব্যবহার করে V8 সিস্টেমটি আরও গুছিয়ে দেওয়া হয়েছে।

## যেসব সমস্যা ঠিক করা হয়েছে

1. **নতুন পরিষ্কার Mahmud Telecom logo**
   - পুরোনো কমলা ব্যাকগ্রাউন্ডের logo বাদ দিয়ে পরিষ্কার logo ব্যবহার করা হয়েছে।
   - Sidebar, Login এবং Homepage-এ logo থাকবে।

2. **বাংলা ⇄ English Language Setting**
   - Global language selector সব পেজে থাকবে।
   - Settings page-এও Language অপশন যোগ করা হয়েছে।
   - বাংলা/English নির্বাচন করলে পেজের static ও নতুন যোগ হওয়া UI text অনুবাদ করার ব্যবস্থা আছে।

3. **Print + PNG Report**
   - Private dashboard page-গুলোতে উপরে Print ও PNG button আছে।
   - Reports/Purchase/SIM/অন্যান্য report section-এ আলাদা Print ও PNG button রাখা হয়েছে।
   - PNG export-এর জন্য html2canvas CDN ব্যবহার করা হয়েছে; PNG করার সময় ইন্টারনেট সংযোগ প্রয়োজন হতে পারে।

4. **Table ও Theme উন্নত**
   - সব সাধারণ table-এর header, row hover, zebra background, card এবং form theme আরও পরিষ্কার করা হয়েছে।
   - Mobile Banking-এর bKash/Nagad/Rocket/mCash/CellFin/Bank/Cash card আলাদা আকর্ষণীয় theme পেয়েছে।

5. **Sidebar icon/menu**
   - Font Awesome না চললেও যেন icon দেখা যায়, তাই sidebar-এ reliable emoji icon ব্যবহার করা হয়েছে।
   - Dashboard, Products, POS, Purchase, Due, Recharge, SIM, Mobile Banking, Customers, Suppliers, Reports, Settings, Logout—সব menu একসাথে আছে।

6. **Purchase Management সম্পূর্ণ করা**
   - Supplier + Product + Category + Purchase Price + Selling Price + Quantity + Date + Payment Method + Reference + Note।
   - Product নির্বাচন করলে category/buy/sell price auto-fill।
   - Purchase save করলে stock বাড়ে।
   - Purchase delete করলে stock reverse হয়।
   - Purchase summary, history, Print এবং PNG report যোগ করা হয়েছে।

7. **Mobile Banking আকর্ষণীয় করা**
   - bKash, Nagad, Rocket, mCash, CellFin, Bank ও Cash account card-এর আলাদা visual theme।
   - Transaction table ও shortcut section উন্নত করা হয়েছে।

8. **SIM Management**
   - আগের খালি `sim.html`-কে কার্যকর SIM Management page করা হয়েছে।
   - Operator, SIM number, Serial/ICCID, Price, Date, Status এবং report আছে।

9. **Login / Access Guard**
   - Private module-এ login ছাড়া ঢুকতে দেওয়া হয় না।
   - ৩০ মিনিট inactivity timeout আছে।
   - ৫ বার ভুল login হলে সাময়িক lock হয়।
   - Settings থেকে password পরিবর্তন করা যায়।

## গুরুত্বপূর্ণ নিরাপত্তা কথা

এই website যদি **GitHub Pages/static hosting**-এ থাকে, তাহলে login systemটি client-side/localStorage ভিত্তিক। এটি সাধারণ ব্যবহারকারীর জন্য login gate হলেও **পূর্ণ server-side security নয়**। Source code জানা বা browser storage পরিবর্তন করতে পারা কেউ bypass করতে পারে।

সত্যিকার অর্থে “শুধু আমি ব্যবহার করব, অন্য কেউ নয়” করতে হলে server-side authentication বা Cloudflare Access/অন্য private authentication ব্যবস্থা প্রয়োজন।

## Website link পরিবর্তন করলে কী হবে?

Repository name বা GitHub Pages URL পরিবর্তন হলেও পরে HTML/CSS/JS/ZIP আবার update করা যাবে। তবে URL বদলালে পুরোনো URL-এর bookmark/link কাজ নাও করতে পারে এবং যদি কোনো file-এ hard-coded পুরোনো URL থাকে সেটি বদলাতে হবে। Relative links (`dashboard.html`, `images/logo.png` ইত্যাদি) ব্যবহার করা হয়েছে, তাই সাধারণ file navigation নষ্ট হওয়ার কথা নয়।

## Default Login

- Username: `admin`
- Password: `123456`

প্রথমবার login করে Settings থেকে password পরিবর্তন করা ভালো।

## Backup

Settings থেকে backup নিয়ে রাখুন। Browser data/localStorage মুছে গেলে বা অন্য device-এ গেলে পুরোনো data নিজে থেকে আসবে না।
