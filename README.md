# 🏠 EasyRentMate — Rent Management System

EasyRentMate is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to simplify rental management for commercial shops and stores. It provides a robust admin dashboard for managing properties and tenants, alongside a user portal for tenants to view and pay their rent securely.

---

## 🔧 Tech Stack

- **Frontend:** React.js, Bootstrap 5, Redux  
- **Backend:** Node.js, Express.js RESTful API  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication & Authorization:** JWT with role-based access control (RBAC)  

---

## 📦 Features

### Admin Dashboard
- View, add, update, and remove shops and tenants  
- Monitor rent collections and generate financial reports  
- Manage roles and permissions with RBAC  
- Manual creation and management of monthly rent records  

### Rent Management
- Track rent payment history and status (Paid, Pending, Overdue)  
- Filter rent records for easy navigation  
- Mark rent payments as "Paid" or reverse payments manually  

### Tenant/User Portal
- Secure login for tenants/shop owners  
- View detailed rent ledger with payment history and upcoming dues  
- Online rent payment integration (e.g., Stripe, Razorpay)  
- Notifications and reminders for due or overdue payments  
- Downloadable rent receipts and invoices  

### Security
- Role-based access control to separate admin and user functionalities  
- JWT-secured API endpoints  
- Input validation and error handling  
- Responsive design for mobile and desktop  

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+  
- npm or yarn  
- MongoDB instance (local or cloud)  

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rent-management-admin.git

# Navigate to project directory
cd rent-management-admin

# Install dependencies for backend and frontend
npm install

# Run the development server
npm start
