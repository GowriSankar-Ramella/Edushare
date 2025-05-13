# 📚 EduShare

EduShare is a full-stack MERN (MongoDB, Express, React, Node.js) web application that enables students, publishers, and experts to collaboratively share, verify, and access high-quality academic notes.

## 🧠 Features

### 🔐 Authentication & Roles
- Register/login as `User`, `Publisher`, or `Admin/Expert`
- Role-based dashboards and protected routes
- Secure token-based authentication with cookies

### 📤 Publishers
- Upload notes (PDFs) on any subject/topic
- Track status: `Pending`, `Approved`, or `Rejected`
- View feedback from admins and comments from users

### 🧑‍🏫 Admins/Experts
- View pending notes and verify them
- Approve/reject notes with feedback
- See list of previously reviewed notes

### 👩‍🎓 Users
- Search notes by title, subject, or topic
- View note preview and download
- Rate notes and leave comments
- View history of notes they've accessed

### 🌟 Additional Features
- Cloudinary integration for PDF uploads and preview
- Average rating calculation
- View comments per note
- Protected routes with `AuthContext`
- Modern, responsive UI with custom styling

---

## ⚙️ Tech Stack

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Auth**: JWT, Cookies, Protected Routes
- **File Storage**: Cloudinary
- **Database**: MongoDB Atlas
- **Tools**: Axios, Multer, dotenv

---

## 🧪 How to Run Locally

### 🔧 Prerequisites
- Node.js & npm
- MongoDB or MongoDB Atlas
- Cloudinary account (for file uploads)

### 📥 Clone the Repo

```bash
git clone https://github.com/your-username/edushare.git
cd edushare

Create a .env file inside server/ :

PORT=3000
MONGODB_URI=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=3d
CORS_ORIGIN=http://localhost:5173


