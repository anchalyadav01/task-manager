# 📝 Task Manager

A full-stack Task Manager application built with **React**, **Node.js + Express**, and **MySQL**.  
It supports **CRUD operations** (Create, Read, Delete) with a visually appealing UI using **Tailwind CSS**.

---

## **Features**

- Add, view, and delete tasks
- Responsive and colorful UI
- Backend connected to MySQL
- Automatically creates database & tasks table if not exists
- Shows backend connection status on frontend

---

## **Tech Stack**

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MySQL  
- **API Requests:** Fetch (or Axios if preferred)  

---

## **Project Structure**
task-manager/
│
├─ backend/
│ ├─ index.js # Node.js + Express server
│
├─ frontend/
│ ├─ src/
│ │ ├─ App.js # React frontend
│ │ ├─ index.css
│
├─ README.md
## **Getting Started**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

### 2. Backend Setup
cd backend
npm install
node index.js


Backend will run on: http://localhost:5000

Creates task_manager database & tasks table automatically.

3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm start


Frontend will run on: http://localhost:3000

4. Testing

Add tasks via frontend.

Check tasks in MySQL Workbench:

USE task_manager;
SELECT * FROM tasks;
Backend logs show requests received.
