const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const connectDB = require('./config/dbConnnection'); // Corrected typo in filename
const PORT = process.env.PORT || 3001;
const path = require('path');


app.use(express.json());
app.use(cors());  
app.use(cookieParser());  
   
// Error handling middleware
app.use((err, req, res, next) => { 
    console.error(err.stack); 
    res.status(500).send('Something went wrong!');
});

require("dotenv").config();

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
const uploadRoute = require("./middlewares/upload");


connectDB();

// Use the upload route
app.use("/upload", uploadRoute);     
app.use('/register', require('./routes/register')); 
app.use('/auth', require('./routes/auth'));
app.use('/lecture', require('./routes/lecture'));
app.use('/other', require('./routes/other'));
        
     
mongoose.connection.once('open', () => {
    console.log('Connected to the MongoDB');
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
});  
 





  