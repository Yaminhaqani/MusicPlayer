# 🎵 Groove – Full Stack Music Player App

Groove is a full-featured MERN (MongoDB, Express, React, Node.js) music player application with user authentication, playlist management, song streaming, profile customization, and admin analytics.

🚀 **Deployed on**:

* **Frontend**: Vercel (https://groove-bay.vercel.app/AllSongs)
* **Backend**: Render

> Note: Necessary environment and deployment changes have been made to make the app fully compatible with Vercel and Render hosting platforms.

---

## ✨ Features

* 🔐 **User Authentication**

  * Register, login, JWT-based protected routes
  * Forgot password & email-based recovery (Nodemailer)
  * Password hashing using Bcrypt

* 🧑 **Profile Management**

  * Upload and update profile picture (Cloudinary)
  * Change password

* 🎵 **Music Player**

  * Stream songs directly
  * Add/remove songs from personal playlist
  * Search songs by title or artist

* 📊 **Admin Dashboard**

  * View daily new users and songs via Chart.js
  * React-chartjs-2 for frontend data visualization

* ☁️ **Cloud Integration**

  * Songs and profile images are uploaded and managed via Cloudinary

* ✅ **Security & Validation**

  * JWT for authentication
  * Joi for validation
  * Bcrypt for password hashing

---

## 🧩 Tech Stack

### Frontend (React)

* `react`, `react-dom`, `react-router-dom`
* `axios` – HTTP requests
* `react-icons`, `animate.css` – UI enhancements
* `chart.js`, `react-chartjs-2` – charts for analytics
* `react-toastify` – notifications

### Backend (Node.js + Express)

* `express`, `cors`, `dotenv`, `nodemon`
* `mongoose` – MongoDB ODM
* `jsonwebtoken`, `bcrypt`, `bcryptjs` – auth & hashing
* `cloudinary`, `multer` – file uploads
* `nodemailer` – email services
* `joi`, `joi-password-complexity` – validation

---

## 📂 Project Structure

```plaintext
groove/
├── frontend/           # React app
│   └── README.md       # Frontend-specific instructions
├── backend/            # Express server
│   └── README.md       # Backend-specific instructions
└── README.md           # You are here
```

---

## 🛠️ Getting Started

### 1. Clone the Repo

### 2. Run Frontend

```bash
cd musicplayer
npm install
npm start
```

### 4. Run Backend

```bash
cd master
npm install
npm run dev
```

---

## 🖼️ Screenshots

#### 🔐 Login Page:

![Screenshot 2025-06-25 155725](https://github.com/user-attachments/assets/e5680dec-694f-42ce-9e94-95bee8450172)


#### 🏠 Home Page:

![Screenshot 2025-06-25 155900](https://github.com/user-attachments/assets/c4c5d603-2bc4-4381-9419-cc399e677ab8)


#### 📊 Dashboard Page(Admin Only):

-![screencapture-groove-bay-vercel-app-admin-dashboard-2025-06-25-15_59_24](https://github.com/user-attachments/assets/5ce2027d-9239-4815-ba96-b3e03830e143)


#### ⚙️ Settings Page:
![Screenshot 2025-06-25 155958](https://github.com/user-attachments/assets/b91c613e-2b7d-43f7-b0f6-ee5297cc18d2)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
