# HRConnect v2

A full-stack Employee Onboarding & HR Management System built using the MERN Stack.

## Overview

HRConnect v2 streamlines employee onboarding, document management, approval workflows, and leave management through separate Employee and Admin portals.

The system allows employees to register, submit onboarding information, upload documents, and track approval status while enabling HR/Admin users to review applications, assign departments, approve employees, and manage workforce records.

---

## Live Demo

### Employee Portal

https://hrconnect-v2.vercel.app

### Backend API

https://hrconnect-v2.onrender.com

---

## Features

### Employee Portal

* Employee Registration & Login
* Multi-Step Employee Onboarding
* Personal Details Management
* Address & Contact Information
* Emergency Contact Information
* Family Details
* Government Details
* Work Experience Information
* Preferred Department Selection
* Resume & Document Upload
* Leave Application
* Profile Management
* Approval Status Tracking
* Settings Page

### Admin Portal

* Secure Admin Login
* Dashboard Analytics
* Employee Approval Workflow
* Resume Viewing
* Employee Code Auto Generation
* Department Assignment
* Employee Directory
* Leave Approval Management
* Recent Activity Tracking
* Employee Record Management

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS
* Lucide React
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer File Upload

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```bash
hrconnect-v2
│
├── client
│   ├── src
│   ├── pages
│   ├── components
│   ├── layouts
│   └── api
│
├── server
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   └── config
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/anjaninandyala/hrconnect-v2.git
cd hrconnect-v2
```

### Install Dependencies

```bash
npm install
cd client
npm install
cd ../server
npm install
```

### Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Run Application

### Frontend

```bash
cd client
npm run dev
```

### Backend

```bash
cd server
npm run dev
```

---

## Employee Workflow

1. Employee Registration
2. Employee Login
3. Complete Onboarding Form
4. Upload Required Documents
5. Submit Application
6. Await HR Review
7. HR Approval
8. Employee Activated

---

## Admin Workflow

1. Login as Admin
2. Review Pending Applications
3. View Uploaded Documents
4. Assign Department
5. Approve / Reject Application
6. Manage Employee Records

---

## Security Features

* JWT Authentication
* Protected Routes
* Role-Based Access Control
* Admin & Employee Separation
* Secure API Communication

---

## Future Enhancements

* Cloudinary Document Storage
* Email Notifications
* Password Reset
* Employee Search & Filters
* Attendance Tracking
* Payroll Integration
* Employee ID Card Generation
* Advanced Analytics

---

## Author

Anjani Nandyala

GitHub:
https://github.com/anjaninandyala

---

## License

This project is developed for learning, internship, and HR process automation purposes.
