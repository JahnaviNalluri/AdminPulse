# 🚀 MERN Content Management Dashboard

A full-stack **Content Management & Analytics Dashboard** built using MEAN/MERN stack principles:

- MongoDB  
- Express.js  
- Angular  
- Node.js  

---

## 📌 Overview

This application provides secure content management with real-time analytics.

### 👤 Users Can:
- Create content
- Edit their own posts
- Delete their own posts
- View all posts
- View only their posts (**My Posts section**)

### 👑 Admin Can:
- View total users
- View active users
- View total admins
- View total content posted
- View monthly user signups (analytics)
- View monthly content posting trends
- Manage users (activate / deactivate / delete)
- Manage all content

---

# 🔥 Core Features

## 🔐 Authentication System

- JWT-based authentication
- Secure login & logout
- Token stored securely
- Protected backend routes
- Role-based access control

---

## 👥 Role-Based Access Control

### Admin Access:
- Access Admin Dashboard
- View platform analytics
- Manage users
- Delete any content

### User Access:
- Access User Content Dashboard
- Create new posts
- Update own posts
- Delete own posts
- View all posts
- View personal posts

---

# 📝 Content Management System

## Create Post
Users can:
- Add title
- Add description
- Save content instantly

## Update Post
- Edit title & description
- Update in real-time

## Delete Post
- Users can delete only their own posts
- Admin can delete any post

## My Posts Section
- Filters posts by logged-in user
- Secure backend filtering using JWT

---

# 📊 Admin Analytics Dashboard

## 📌 Summary Cards
- Total Users
- Active Users
- Total Admins
- Total Content

## 📈 Charts (Chart.js)

### 1️⃣ Monthly User Growth
- Displays user registrations grouped by month
- Line chart visualization

### 2️⃣ Monthly Content Posting
- Displays content posting trends
- Bar chart visualization

---

# 📈 Data Aggregation (MongoDB Aggregation)

Used for:
- Monthly user signup statistics
- Monthly content posting statistics
- Dashboard metrics

Aggregation Operators:
- `$group`
- `$year`
- `$month`
- `$sort`

---

# 🛡️ Backend Security

- JWT verification middleware
- Protected routes using `protect`
- User ID extraction from token
- Role validation middleware
- Error handling middleware
- Proper HTTP status code handling

---

# 🎨 UI/UX Features

- Modern Bootstrap layout
- Card-based UI
- Responsive design
- Hover animations
- Navigation tabs (All Posts / My Posts)
- Real-time updates after CRUD operations
- Clean Admin dashboard layout
- Smooth data visualization

---

# 🧠 Technical Highlights

- RESTful API architecture
- Modular backend structure
- Separation of concerns (Controller / Service / Routes)
- Angular standalone components
- Observables & reactive programming (RxJS)
- Chart.js integration
- MongoDB Aggregation pipelines
- JWT authentication
- Role-based authorization
- Clean UI architecture

---

# ⚙️ Technologies Used

## Frontend
- Angular
- TypeScript
- Bootstrap
- Chart.js
- RxJS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)

---

# 🔄 API Endpoints Overview

## Authentication

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/auth/register    | Register a new user      |
| POST   | /api/auth/login       | Login an existing user   |

## Content

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | /api/content              | Get all content                |
| POST   | /api/content              | Create new content             |
| PUT    | /api/content/:id          | Update content by ID           |
| DELETE | /api/content/:id          | Delete content by ID           |
| GET    | /api/content/my-posts     | Get current user's content     |

## Analytics

| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| GET    | /api/analytics/dashboard         | Get dashboard analytics            |
| GET    | /api/analytics/monthly-signups   | Get monthly user signups data      |
| GET    | /api/analytics/content-analytics | Get content performance analytics  |

---

# 🚀 How It Works

1. User logs in  
2. JWT token is generated  
3. Token is attached to requests  
4. Backend verifies token  
5. Role determines access level  
6. Data is fetched from MongoDB  
7. Admin dashboard visualizes data using charts  
8. Content is filtered securely on backend  

---

# 🧪 Key Functional Scenarios

## Scenario 1 – User Creates Post
- Post saved in MongoDB
- `createdBy` field stores user ID
- Post visible in All Posts
- Post visible in My Posts

## Scenario 2 – Admin Views Dashboard
- Dashboard fetches aggregated data
- Charts render monthly statistics
- Summary cards display metrics

## Scenario 3 – User Clicks My Posts
- Backend filters by `req.user.id`
- Only user-specific content is returned

---

# 🧩 Advanced Concepts Used

- MongoDB Aggregation
- Role-Based Middleware
- Token-Based Authentication
- Protected Routes
- Angular Standalone Components
- Reactive HTTP Requests
- Chart Rendering Lifecycle Handling
