# 🚀 AI-Powered Applicant Tracking System (ATS)

An **AI-driven résumé analysis and job application assistant** built with modern web technologies.  
This project evaluates résumés against job descriptions, provides detailed AI feedback, and generates ATS-style scores — all while running entirely serverless.

---

## ✨ Features

- 🧠 **AI-Powered Résumé Analysis**  
  Analyze any résumé and job description using free, serverless AI models (GPT, Claude, and others).

- 📊 **ATS Scoring System**  
  Generate a real-time Application Tracking System (ATS) score to evaluate résumé–job fit.

- 📝 **Actionable AI Feedback**  
  Receive structured feedback on tone, content, structure, and skill alignment.

- ☁️ **Fully Serverless Architecture**  
  No backend setup or servers required — authentication, storage, and AI all run directly from the frontend.

- 💾 **Secure File Uploads**  
  Upload PDF résumés safely and convert them into visual previews.

- 🧩 **Modern Frontend Stack**  
  Built with React, TypeScript, Tailwind CSS, Zustand, and Vite for blazing-fast performance.

- 🆓 **Zero Infrastructure Cost**  
  Users handle their own AI and storage costs — keeping deployment completely free.

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | [React](https://react.dev/) + [React Router v7](https://reactrouter.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Cloud + AI | [Puter.js](https://puter.com/) (serverless cloud & AI services) |
| Build Tool | [Vite](https://vitejs.dev/) |
| File Upload | [React Dropzone](https://react-dropzone.js.org/) |

---

## 🏗️ Project Structure

```
src/
 ├── app/
 │   ├── components/      # Reusable UI components (Navbar, ResumeCard, etc.)
 │   ├── routes/          # App pages and routes (Home, Upload, Auth, etc.)
 │   ├── lib/             # Helper libraries (puter.ts, utils, etc.)
 │   ├── types/           # TypeScript declarations and interfaces
 │   ├── constants/       # Static data and configuration
 │   └── app.css          # Main Tailwind CSS file
 ├── public/              # Static assets and images
 └── package.json         # Dependencies and scripts
```

---

## ⚙️ Installation & Setup

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git

# 2️⃣ Navigate to the project folder
cd <your-repo-name>

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
```

Your app will be live on `http://localhost:5173` 🎉

---

## 🔐 Environment Setup

This project uses **Puter.js** for AI, storage, and authentication.  
To enable all features:

1. Create a free account on [puter.com](https://puter.com).  
2. Retrieve your **Puter API key** (if required).  
3. Add it to your environment (or initialize it in `lib/puter.ts`).

No backend setup is needed — everything runs client-side.

---

## 🧠 How It Works

1. **User Authentication**  
   - Users sign in securely using Puter’s OAuth flow.

2. **Resume Upload**  
   - Upload a PDF résumé using drag-and-drop.
   - The file is stored in the user’s personal cloud storage.

3. **AI Analysis**  
   - The app sends the résumé and job description to free AI endpoints.
   - The model generates ATS scores and detailed improvement tips.

4. **Result Display**  
   - View feedback by category: Content, Tone, Structure, Skills.
   - Preview the résumé and track job applications in one place.

---

## 🌐 Deployment

This project can be deployed **for free** to any static hosting service, including:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Puter Cloud Hosting](https://puter.com/)

Run:
```bash
npm run build
```
Then deploy the `dist/` folder.

---

## 🧑‍💻 Developer Notes

- Clean, modular React architecture.
- Type-safe with TypeScript interfaces.
- Uses Zustand for lightweight, global state management.
- Fully responsive and mobile-friendly UI.

---


## 📄 License

This project is open-source under the **MIT License**.  
Feel free to use, modify, and distribute it with attribution.

---

## 💬 Feedback

If you find this project useful or have suggestions for improvement, feel free to open an issue or submit a pull request.

---


