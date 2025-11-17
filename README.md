<div align="center">
  <br />
    <a href="https://github.com/mlamine300/scrapy" target="_blank">
      <img src="https://ik.imagekit.io/lamine300/scrapy%20banner.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/-Cheerio-F8DC75?style=for-the-badge&logo=javascript&logoColor=black" alt="cheerio" />
    <img src="https://img.shields.io/badge/-Nodemailer-339933?style=for-the-badge&logo=maildotru&logoColor=white" alt="nodemailer" />
  </div>

  <h3 align="center"># 🛒 Intelligent Price Tracking & Web Scraper System</h3>

   <div align="center">
A **full-stack, automated product price tracking system** that scrapes e-commerce sites, monitors price changes, stores historical data, and sends smart notifications when deals appear — powered by Next.js, MongoDB, and modern scraping tools.
   </div>
</div>

---

## ✨ Features

- 🧭 **Intelligent Product Scraping**  
  Automatically extract product title, images, current price, original price, discount rate, stock status, and more.

- 📈 **Price History Tracking**  
  Every scrape updates the product's historical price timeline to help analyze trends.

- 🔔 **Smart Email Alerts**  
  Get notifications when:

  - Prices drop
  - A new _lowest_ price is detected
  - A product is back in stock
  - Discounts reach a chosen threshold

- 🔁 **Automated Cron-Based Scraping**  
  A scheduled job re-scrapes all tracked products and sends alerts automatically.

- 📊 **Price Analytics Engine**  
  Compute:

  - Lowest recorded price
  - Highest recorded price
  - Average price over time

- 🧩 **Modern Web Stack**  
  Built with Next.js server components, Tailwind CSS, and MongoDB.

---

## 🧰 Tech Stack

| Category           | Technology                 |
| ------------------ | -------------------------- |
| Framework          | **Next.js**                |
| Language           | **TypeScript**             |
| Scraper            | **Axios + Cheerio**        |
| Database           | **MongoDB (Mongoose)**     |
| Email              | **Nodemailer**             |
| Styling            | **Tailwind CSS**           |
| Scheduling         | **Cron Jobs / API Routes** |
| Hosting (Optional) | Vercel / Netlify / Render  |

---

## 📁 Project Structure

    src/
     ├── app/
     │   ├── api/
     │   ├── components/
     │   ├── product/
     │   └── globals.css
     ├── lib/
     │   ├── scraper.ts
     │   ├── utils.ts
     │   ├── email.ts
     │   └── db.ts
     ├── models/
     │   └── product.model.ts
     ├── cron/
     │   └── route.ts
     └── public/

## ⚙️ Installation

    git clone https://github.com/mlamine300/scrapy
    cd scrapy
    npm install
    npm run dev

## 🔐 Environment Variables

    MONGODB_URI=
    EMAIL_USER=
    EMAIL_PASS=
    BRIGHT_DATA_USERNAME=
    BRIGHT_DATA_PASSWORD=

## 🌐 Deployment

Deploy easily on Vercel, Netlify, Render, Railway, etc.

## 📄 License

MIT License.
