import passport from "passport";
import { config } from "dotenv";
const User = require('../models/User');
import { Strategy } from 'passport-microsoft';
config();

passport.use(new Strategy({
  clientID: <string>process.env.MICROSOFT_CLIENT_ID,
  clientSecret: <string>process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/api/login/microsoft/callback",
  scope: ['user.read']
},
  function (accessToken: any, refreshToken: any, profile: any, done: any) {

    User.find({email: (profile._json ? (profile._json.mail ? profile._json.mail : profile._json.userPrincipalName) : profile.userPrincipalName) }, (err: Error, docs: any) => {
      if (!docs.length) {
        User.create({
          username: profile._json ? profile._json.displayName + profile.id : profile.givenName + " " + profile.surname + profile.id,
          email: (profile._json ? (profile._json.mail ? profile._json.mail : profile._json.userPrincipalName) : profile.userPrincipalName)
        })
      }
    })
    return done(null, profile);
  }
));