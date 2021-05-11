import passport from 'passport';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:5000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
    }
));