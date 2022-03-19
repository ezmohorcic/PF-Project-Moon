import { Router, Request, Response } from 'express'
import { config } from 'dotenv';
import passport from "passport";
import "../Middleware/google";
import "../Middleware/microsoft";
const User = require('../models/User')
const router = Router()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
config()

router.post('/', async (req: Request, res: Response) => {
  const { email } = req.body
  try {

    const user = await User.findOne({ email });

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.HASH_CRYPTO)
    const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    /* const accessToken = jwt.sign({
        id: user._id
    },process.env.JWT_KEY,
    {expiresIn: '1d'}
    ) */

    // const {...others} = user._doc


    !user || originPassword !== req.body.password
      ? res.status(404).json('Wrong credentials')
      : res.redirect(`http://localhost:3001/api/login/session/${email}`)//res.json({...others,accessToken})
  } catch (error) {
    res.status(404).json(error)
  }
})

router.get("/session/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  const { ...others } = user._doc;
  const accessToken = jwt.sign({
    id: user._id
  }, process.env.JWT_KEY,
    { expiresIn: '1d' });
  res.json({ ...others, accessToken });
})

router.get('/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  )
);

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: 'login/' }),//cambiar a la página de login con mensaje de error
  (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      let infoUser: any = req.user;
      res.redirect(`http://localhost:3001/api/login/session/${infoUser._json.email}`);
    }
  }
);
router.get('/microsoft', passport.authenticate('microsoft'));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),//cambiar a la página de login con mensaje de error
  (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      let infoUser: any = req.user;
      res.redirect(`http://localhost:3001/api/login/session/${infoUser._json.userPrincipalName}`);
    }
  }
);

module.exports = router;