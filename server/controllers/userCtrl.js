const connectMongo = require('../db/dbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
var db=null;
const connect=async()=>{
    if (db!==null) return db;
    const fetch=await connectMongo();
    return fetch;
}

const userCtrl = {
    login: async (req, res) => {
        try {
            db=await connect()
            console.log(db)
            const { username, password } = req.body;

            // Check if user exists
            const user = await db.collection('users').findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate tokens
            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });

            // Set refresh token as a cookie
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Enable HTTPS-only in production
                sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                path: '/',
            });
            
            console.log(req);
            return res.status(200).json({ accesstoken, message: 'Login successful' });
        } catch (error) {
            console.error('Error in login:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    register: async (req, res) => {
        try {
            db=await connect()
            if (db) console.log('connected')
            const { username, password,role } = req.body;

            // Check if user already exists
            const existingUser = await db.collection('users').findOne({ username });
            if (existingUser) {
                return res.status(401).json({ message: 'User already registered' });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            const result = await db.collection('users').insertOne({ username, password: passwordHash ,role});

            // Generate tokens
            const accesstoken = createAccessToken({ id: result.insertedId });
            const refreshtoken = createRefreshToken({ id: result.insertedId });

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Enable HTTPS-only in production
                sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                path: '/',
            });
            
            console.log(res)

            return res.status(201).json({ message: 'User registered successfully', accesstoken, refreshtoken });
        } catch (error) {
            console.error('Error in registration:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    refreshtoken: async (req, res) => {
        try {
            console.log('hwllo')
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({ message: 'Please log in or register' });
            }
    
            // Verify the refresh token
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({ message: 'Invalid refresh token, please log in again' });
                }
    
                // Generate a new access token
                const accesstoken = createAccessToken({ id: user.id });
                return res.status(200).json({ accesstoken });
            });
        } catch (error) {
            console.error('Error in refresh token:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            // Clear the refresh token cookie
            res.clearCookie('refreshtoken', {
                path: '/',
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production', // Enable Secure only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            });

            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error in logout:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    getUser: async(req,res)=>{
        try{
            db=await connect();
            const userId = req.user?.id;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required." });
            }

            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid User ID format." });
            }
            const user=await db.collection("users").findOne({_id:ObjectId.createFromHexString(userId)});
            return res.json(user);
        }catch(err){
            console.log(err)
        }
    },
   

};

// Generate Access Token
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

// Generate Refresh Token
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20m' });
};

module.exports = userCtrl;
