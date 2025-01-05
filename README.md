# E-commerce Platform

A full-featured e-commerce platform with user and admin functionalities, secure authentication, and shopping cart features.

## Features

### User Features
- User registration and authentication with JWT (Access & Refresh tokens)
- Browse products with detailed views
- Search functionality to filter products
- Shopping cart management

### Admin Features
- Complete product management (Add/View/Update/Delete)
- User management
- Order tracking and management

## Technology Stack

### Frontend
- React.js
- Context API for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Cookie-based token storage

## Installation

1. Clone the repository
```bash
git clone https://github.com/ashank22/E-commerce.git
cd E-commerce
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
ACESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server in a new terminal
cd frontend
npm start
```

## API Documentation

### Authentication Endpoints
- `POST /user/register` - Register a new user
- `POST /user/login` - User login
- `POST /user/refreshtoken` - Refresh access token
- `POST /user/logout` - User logout
- `POST /user/info` - User info

### Product Endpoints
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)


## Security Features

- JWT-based authentication with access and refresh tokens
- Secure cookie storage for tokens
- Role-based access control (Admin/User)
- Password hashing
- Input validation and sanitization

## Folder Structure

```
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── assets/
│   └── App.jsx
│   └── Main.jsx
└── package.json
└── README.md
```


