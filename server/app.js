import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import pkg from 'passport-google-oauth20';
const {Strategy} = pkg;

import connectToDb from './config/db.js';
import authRoutes from './routes/auth.js';
import requestRoutes from './routes/rides.js';
import busRoutes from './routes/busRoutes.js';
import statisticsRoutes from "./routes/statistics.js";


dotenv.config();

passport.use(new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
    }
));

connectToDb();

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())
app.use(morgan('common'));
app.use('/api/auth',authRoutes);
app.use('/api/request',requestRoutes);
app.use('/api/busroute', busRoutes);
app.use('/api/stats',statisticsRoutes);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'build', 'index.html'));
    });
  }



const port  = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
})


