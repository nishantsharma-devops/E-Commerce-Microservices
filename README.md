# 🛒 E-Commerce Microservices Application

A real-time microservices-based e-commerce application built using **React, Node.js, Docker, and Nginx**.

---

## 🚀 Features

- 🔐 User Authentication (Login / Signup)
- 📱 Product Service (Mobiles)
- 🍔 Food Service
- 🧩 Microservices Architecture
- 🐳 Fully Dockerized
- 🌐 Single URL access using Nginx Reverse Proxy
- ➕ Add / ❌ Delete Products

---

## 🏗️ Architecture

Browser
↓
Nginx (Reverse Proxy)
↓
| frontend (React) |
| product-service (Node.js) |
| food-service (Node.js) |
| user-service (Node.js) |


---

## 📁 Project Structure
E-Commerce-Application/
├── frontend-react/
├── product-service/
├── food-service/
├── user-service/
├── nginx/
└── README.md

## ⚙️ Tech Stack

- Frontend: React.js
- Backend: Node.js (Express)
- Containerization: Docker
- Reverse Proxy: Nginx


---

## 🐳 How to Run (Docker)

### 1. Create network

```bash
docker network create ecommerce-net

2. Run services
docker run -d --name product-service --network ecommerce-net -p 3001:3001 product-service
docker run -d --name food-service --network ecommerce-net -p 3002:3002 food-service
docker run -d --name user-service --network ecommerce-net -p 3003:3003 user-service
docker run -d --name frontend --network ecommerce-net -p 3000:3000 frontend


3. Run Nginx
docker run -d --name nginx --network ecommerce-net -p 80:80 nginx-custom

4. Access Application
http://localhost
🧪 API Endpoints
Service	Endpoint
User	/api/user/login
User	/api/user/signup
Product	/api/product/products
Food	/api/food/products
