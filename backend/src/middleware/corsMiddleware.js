const express = require("express");
const app = express();

// List of allowed origins (you can add more if needed)
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];

// CORS middleware function
app.use((req, res, next) => {
  const origin = req.headers.origin; // Get the Origin header from the request

  // If the origin is in the allowedOrigins list, set CORS headers
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Allow this origin
  }

  // Set other necessary CORS headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); // Allow these HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, sessions)

  // If it's a preflight request, send a 200 response
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Pass the request to the next middleware or route handler
  next();
});

// Example route handler for testing
app.post('/api/password/forgotpassword', (req, res) => {
  res.send('Password reset request received');
});

// Start the Express server
app.listen(8008, () => {
  console.log("Server is running on http://localhost:8008");
});
