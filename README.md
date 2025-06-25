# 📚 Groove Backend (Express + MongoDB)

This is the backend of the Groove music player, built with **Node.js**, **Express**, and **MongoDB**, and deployed on **Render**.

---

## ✨ Features

* User authentication with JWT
* Register, login, logout
* Password recovery via email (Nodemailer)
* Upload and manage profile pictures and songs using Cloudinary
* Dashboard API for chart data
* Secure routes with middleware and validations

---

## 🧩 Tech Stack

* **Express** `^4.21.2`
* **Mongoose** `^8.9.3`
* **JWT** (`jsonwebtoken`) – Auth tokens
* **Bcrypt** & `bcryptjs` – Password hashing
* **Multer** – File handling
* **Cloudinary** – File storage (songs & profile pictures)
* **Joi** & `joi-password-complexity` – Validation
* **Dotenv** – Environment config
* **Cors** – Cross-origin support
* **Nodemailer** – Email service

---

## 🚀 Getting Started

### 1. Setup

```bash
cd backend
npm install
```

### 2. Run the Server

```bash
npm run dev
```

### 3. Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
CLIENT_URL=https://your-frontend-vercel-url
```

---

## 📝 API Overview

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| POST   | /api/auth/register      | Register a new user             |
| POST   | /api/auth/login         | Login user                      |
| POST   | /api/auth/forgot        | Send password recovery email    |
| POST   | /api/auth/reset/\:token | Reset password                  |
| PUT    | /api/user/profile       | Update profile picture/password |
| POST   | /api/songs/upload       | Upload a song                   |
| GET    | /api/songs/search       | Search by title or artist       |
| GET    | /api/dashboard/stats    | Get daily users/songs data      |

> Note: These are just examples and all protected routes require `Authorization: Bearer <token>`

---

## ⚖️ Middleware

* `auth.js` – Validates JWT tokens
* `validate.js` – Joi-based input validation
* `upload.js` – Multer Cloudinary integration

---

## 📧 Contact

* Developed by **Yamin Haqani**.
* Email: [yaminhaqani@gmail.com](mailto:yaminhaqani@gmail.com)
* GitHub: [@Yaminhaqani](https://github.com/Yaminhaqani)

---

## 📄 License

Licensed under the [MIT License](LICENSE).
