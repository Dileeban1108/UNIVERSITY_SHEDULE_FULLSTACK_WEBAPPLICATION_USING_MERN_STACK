const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = require('./config/dbConnnection'); // Corrected typo in filename
const PORT = process.env.PORT || 3001;
const path = require('path');

connectDB();

app.use(express.json());
app.use(cors());  
   
// Error handling middleware
app.use((err, req, res, next) => { 
    console.error(err.stack); 
    res.status(500).send('Something went wrong!');
});

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
const uploadRoute = require("./middlewares/upload");

// Use the upload route
app.use("/upload", uploadRoute);     
app.use('/register', require('./routes/register')); 
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/lecture', require('./routes/lecture'));
app.use('/other', require('./routes/other'));
       
// Error handling middleware   
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});     
     
mongoose.connection.once('open', () => {
    console.log('Connected to the MongoDB');
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
});  
 





  