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
git clone
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

3. Start the frontend server:
```bash
npm start
```

By default, the frontend runs on: `http://localhost:3000`


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
MONGO_URI=your_mongo_db_uri
GEMINI_API_KEY=your_gemini_api_key
EMAIL_SERVICE_USER=your_email@example.com
EMAIL_SERVICE_PASS=your_email_password
JWT_SECRET=your_jwt_secret
```

3. Start the backend server:
```bash
npm start
```

By default, the backend runs on: `http://localhost:5000`