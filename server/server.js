const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const userRouter=require('./routes/userRouter')
const categoryRouter=require('./routes/categoryRouter')
const productRouter=require('./routes/productRouter')
const app = express();
require('dotenv').config();
const cookieParser=require('cookie-parser');
const connectMongo = require('./db/dbConnection');


app.use(cors({
    origin: ['https://e-commerce-ryk9.onrender.com','http://localhost:3000'], // Your frontend URL
    credentials:true,  // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());
const db= connectMongo();
if (db) console.log("connected to db1");    



app.use('/user',userRouter);
app.use('/api',categoryRouter);
app.use('/api',productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


