
  
import express from 'express';     
const app = express();     
import cors from 'cors'; 
  import ejs from 'ejs';   
  import fetch from 'node-fetch';   
  import axios from 'axios';
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
import VideoDb from './models/videos.js';
 
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


        
 //SCRAPE YOUTUBE VIDEOS START
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; 
const CUSTOM_THUMBNAIL_URL = "https://buddha.tv/images/newbdbg.png"; // Custom thumbnail URL

const categories = [
    'Yoga and movement',
    'Wealth creation',
    'Meditation and mindfulness',
    'Healthy living',
    'Breathwork',
    'Science of mind and quantum healing',
    'Psychedelic healing',
    'Ancient wisdom',
    'Personal Development and self mastery',
    'Soul healing and transformation',
    'Inspirational stories and teachings',
    'Community and connection',
];
 

 

 
        
// Unified function to scrape videos from youtube 
async function scrapeAllCategories() {
    for (const category of categories) {
        try {
            console.log(`Scraping videos for category: ${category}`);
            const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    key: YOUTUBE_API_KEY,
                    part: 'snippet',
                    q: category, // Search for videos matching the category
                    type: 'video',
                    maxResults: 50, // Fetch up to 20 results
                    order: 'viewCount', // Sort by view count to prioritize popular videos
                    videoDuration: 'short', // Only include videos less than 4 minutes long
                    videoEmbeddable: true, // Ensure the video can be embedded (not restricted) 
                }, 
            });          
            console.log('Scraped successfully');      
            const videos = response.data.items.map(item => ({
                title: `Curated by BuddhaTV: ${item.snippet.title}`,
                description: item.snippet.description,
                youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`, 
                videoId : item.id.videoId,   
                thumbnail: CUSTOM_THUMBNAIL_URL, // Custom thumbnail URL
            }));      
            console.log(videos);    
            for (const video of videos) {   
         const createdVideo = await VideoDb.create({
             videoId : video.videoId,  
             title : video.title,
             description : video.description,
         });    
         console.log(createdVideo);  
         console.log('saved to database');    
        } 
        } catch (scrapeError) {
            console.log('Scraping error:', scrapeError);
        }
    }
}

// Endpoint to trigger the scraping and uploading process
app.get('/scrape', async (req, res) => {
    try {
        await scrapeAllCategories();
        res.json({ message: 'Scraping process complete' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'An error occurred during the process' });
    }
});  
  //SCRAPE YOUTUBE VIDEOS END   





   app.use(express.static(join(__dirname + '/public')));      

   app.listen(3000, ()=>{ console.log('Listening on port 3000')});      

 
      