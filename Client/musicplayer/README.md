# 📚 Groove Frontend (React)

This is the frontend of the Groove music player application, built using **React** and deployed on **Vercel**(https://music-player-wheat-five.vercel.app/).

---

## ✨ Features

* User registration and login
* Email recovery for forgotten passwords
* Stream songs and browse playlists
* Add/remove songs to/from playlists
* Profile picture upload/update
* Dashboard with real-time analytics using Chart.js
* Smooth UI with animations and toast notifications

---

## 🧩 Tech Stack

* **React** `^18.3.1`
* **Axios** – API requests
* **React Router DOM** – Routing and protected routes
* **React Icons** – Icon support
* **Animate.css** – UI animations
* **React Toastify** – Notifications
* **Chart.js** + **React Chart.js 2** – Dashboard graphs

---

## 🚀 Getting Started

### 1. Setup

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm start
```

### 3. Environment Variables

Create a `.env` file in the `frontend/` folder:

```bash
REACT_APP_BACKEND_URL=https://your-backend-url.com
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_preset
```

---

## 👀 Folder Structure

```plaintext
frontend/
├── Client/musicplayer/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

---

## ✅ Available Scripts

* `npm start` – Runs the app in development mode
* `npm run build` – Builds the app for production

---

## 📄 Notes

* The app is styled with a combination of custom CSS and utility libraries.
* Toastify is used for user-friendly alerts.
* Responsive layout across all screen sizes.

---

## 📧 Contact

* Built by **Yamin Haqani**.
* For questions or suggestions, reach out at [yaminhaqani@gmail.com](mailto:yaminhaqani@gmail.com).
* GitHub: [@Yaminhaqani](https://github.com/Yaminhaqani)
