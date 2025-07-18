require('dotenv').config();

const cors = require('cors')
const express = require('express');


const app = express();


const PORT = process.env.PORT || 5000;


// Enable CORS for all origins
app.use(cors ());

// OR: Allow specific origins
app.use(cors({
    origin: "http://localhost:5173", // Change to your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));


const routes = require("./routes/index");
// Middleware

app.use(express.json()); 


// Routes
app.get('/', 
  (req, res) => {
  res.send('Welcome to Farm Management API!');
}

);
 



app.use('/api',routes)



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
