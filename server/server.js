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
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : [];
  console.log('yes')
console.log(allowedOrigins)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
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


