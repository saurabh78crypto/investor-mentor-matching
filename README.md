# Investor & Mentor Matching Platform

This platform helps users find the best-suited investors or mentors based on their queries using Google Gemini AI. Users submit queries, and the system matches them with relevant investors or mentors from the database.

---

## Features
- **AI-Powered Search:** Uses Google Gemini AI to match users' queries with relevant investors or mentors.
- **User Credit System:** Users need credits to search; credits are deducted per search.
- **Email Notifications:** Alerts users when their credits run out.
- **MongoDB Database:** Stores user information and investor/mentor details.
- **REST API:** API endpoints to search for investors/mentors.

---

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI API:** Google Gemini AI
- **Authentication:** JWT (JSON Web Token)
- **Email Service:** Nodemailer

---

## Setup Instructions

**Clone the Repository**
```bash
git clone https://github.com/saurabh78crypto/investor-mentor-matching.git
cd investor-mentor-matching
```

### Frontend Setup 

1. Navigate to the **frontend** folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add the following variables:
```js
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
```

4. Start the frontend server:
```bash
npm start
```

By default, the frontend runs on: `http://localhost:3000`

---

### Backend Setup

1. Navigate to the **backend** folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add the following variables:
```js
PORT=5000
MONGO_URI=your_mongo_db_uri
GEMINI_API_KEY=your_gemini_api_key
EMAIL=your_email@example.com
APP_PASSWORD=your_app_password
AUTH_CLIENT_ID=your_client_id
AUTH_CLIENT_SECRET=your_client_secret
AUTH_CALLBACK_URI=your_auth_callback_uri
JWT_SECRET=your_jwt_secret
```

3. Start the backend server:
```bash
npm start
```

By default, the backend runs on: `http://localhost:5000`