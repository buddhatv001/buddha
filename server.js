
  
import express from 'express';     
const app = express();     
import cors from 'cors'; 
  import ejs from 'ejs';   
  import fetch from 'node-fetch'; 
  import got from 'got';  
  import dotenv from 'dotenv';
  dotenv.config();   
 import mongodb from 'mongodb';
  import mongoose from 'mongoose';    
  mongoose.connect(process.env.MONGOOSE_CONNECTION).then(()=>{console.log('success')}).catch((err)=>{console.error(err)});          
       
  import cookieParser from 'cookie-parser'; 
  import url from 'url';
  import { fileURLToPath } from 'url';
  import { dirname, join } from 'path'; 
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
     
  import session from 'express-session';   

   import bcrypt from 'bcryptjs';
  const saltRounds = 12; 
 import jwt from 'jsonwebtoken'; 
import MemDb from './models/register.js'; 
import ContactDb from './models/contact.js';

  app.use(cookieParser());  
  import globalTok from './middlewares/global.js'; 
  app.use(globalTok);
  import authenticate from './middlewares/authentication.js';
import checkTok from './middlewares/authb.js';
import checkbTok from './middlewares/authc.js';
import checkcTok from './middlewares/authd.js';
import checkdTok from './middlewares/authe.js';
import admTok from './middlewares/authadmin.js';
import multer from 'multer';
import nodemailer from 'nodemailer';  
import cookie from 'cookie';  
import userRoute from './routes/userroute.js';    
 
   app.set('view engine', 'ejs'); 
   app.use(express.urlencoded({extended:false}));
   app.use(express.json()); 
   app.use(cors()); 

   app.use('/', userRoute);  

   app.use(express.static(join(__dirname + '/public')));      

   app.listen(3000, ()=>{ console.log('Listening on port 3000')});

 