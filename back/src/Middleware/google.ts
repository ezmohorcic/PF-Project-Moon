import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import { config } from "dotenv";
const User = require('../models/User');
config();


passport.use(
  new Strategy(
    {
      clientID: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3001/api/login/google/callback",
      passReqToCallback: true
    },
    function (request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) {

      User.find({ email: profile.email }, (err: Error, docs: any) => {

        if (!docs.length) {
          User.create({
            username: profile.displayName + profile.id,
            email: profile.email,
            image: profile.picture
          })
        }
      })
      return done(null, profile);
    }
  )
);

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
passport.serializeUser(function (user, done) {
  done(null, user);
});
