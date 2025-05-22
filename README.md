# 🏠 Rent Management System (EasyRentMate)

This is a MERN stack web application designed to help admins manage shop/store rents for users. Admins can add stores, track monthly rent payments, and mark them as paid. The system also includes role-based access (admin-only login) and an intuitive UI.

---

## 🔧 Tech Stack

- **Frontend**: React.js, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (Admin login only)
- **Scheduling**: Node Cron Job (for auto rent generation)

---

## 📦 Features

### ✅ Admin Dashboard
- View all registered shops/users
- Add a new store with monthly rent
- Edit or delete any store/user

### ✅ Rent Management
- Automatically generate monthly rent at the end of each month using a cron job
- View rent history of each store
- Mark monthly rent as "Paid"
- Filter between Paid and Pending months

### ✅ Authentication
- Admin login only
- Role-based access
- Secure APIs with JWT middleware

---

## 🚀 Getting Started

###  Clone the repository

```bash
git clone https://github.com/yourusername/rent-management-admin.git
cd rent-management-admin
