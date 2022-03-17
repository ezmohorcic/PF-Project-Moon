// import  {Request, Response} from 'express';
import  express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import { dbConnect } from './db';
import authRoutes  from './routes/routes auth';
const allRoute = require( './routes/routes')
const app = express();
dotenv.config()

app.use(cors());
app.use(express.json());

app.use("/login", authRoutes);
app.use('/api',allRoute)

app.listen(3001, ()=> {
    dbConnect()
    console.log('Server on PORT 3001')
})