   

   
import express from 'express';
const app = express();
import ejs from 'ejs';  
import mongodb from 'mongodb';
import mongoose from 'mongoose';  
import bcrypt from 'bcryptjs';  
import dotenv from 'dotenv';
const saltRounds = 12;    
 
import OrdDb from '../models/orders.js'; 
  
import cors from 'cors';  
app.use(cors());

dotenv.config();

//stripe integration    

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY); 




export const postSubscriber = async (req,res)=>{
         const subscriber = req.body; 
         const username = encodeURIComponent(subscriber.name);
         const email = encodeURIComponent(subscriber.email);  
const WEB_DOMAIN = 'https://buddha.tv';
console.log(WEB_DOMAIN);   

  try{ 


       
// Get current timestamp
const currentUnixTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
// Set expiration to 15 hours later
const expiresAt = currentUnixTimestamp + (15 * 60 * 60); // 15 hours in seconds  

 
const randd =   Math.floor(10000 + Math.random() * 9873762732); 
const trxRef = 'BUDDHA' + '-' + randd;  

//We need to hash the transaction reference to avoid hackers exploitations

   const txRef = await bcrypt.hash(trxRef, saltRounds);    

     
   
const uniqueid =   Math.floor(10000 + Math.random() * 9873762732);  
 

const orderInfo = await OrdDb.create({ 
    uniqueId : uniqueid,
    name : subscriber.name,
    email : subscriber.email,  
    price : 8.88,
    trxRef : txRef, 
});
 
const session = await stripe.checkout.sessions.create({  
    
    line_items: [
      {
          price_data: {
              currency: 'usd', // Make sure to use 'usd' for dollars
              product_data: {
                  name: 'Buddha TV', // Provide a description or name for the product
              },
              unit_amount: Math.round(8.88 * 100), // Convert to pence  
          }, 
          quantity: 1,
      },
  ], 
        
  metadata : {
    transactionReference : txRef,    
},
mode: 'payment', 
expires_at: expiresAt,
success_url: `${WEB_DOMAIN}/success_xbe87c3r2c67v3r2/${trxRef}/${uniqueid}/${username}/${email}`,
cancel_url: `${WEB_DOMAIN}/cancel_ebgrdyuwregi4r3gg6g`, 
  }); 
       
   console.log(session.url); 
   const theurl = session.url;
   res.json({paymenturl: theurl});      
} 

   catch(err) {   
    console.log(err);
    res.status(500).send('Ooops!, ,something went wrong. Please try again');
}

}     



 //premium subscription


    
export const postSubscriberplus = async (req,res)=>{
    const subscriber = req.body; 
    const username = encodeURIComponent(subscriber.name);
    const email = encodeURIComponent(subscriber.email);  
const WEB_DOMAIN = 'https://buddha.tv';
console.log(WEB_DOMAIN);   

try{ 


  
// Get current timestamp
const currentUnixTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
// Set expiration to 15 hours later
const expiresAt = currentUnixTimestamp + (15 * 60 * 60); // 15 hours in seconds  


const randd =   Math.floor(10000 + Math.random() * 9873762732); 
const trxRef = 'BUDDHA' + '-' + randd;  

//We need to hash the transaction reference to avoid hackers exploitations

const txRef = await bcrypt.hash(trxRef, saltRounds);    



const uniqueid =   Math.floor(10000 + Math.random() * 9873762732);  


const orderInfo = await OrdDb.create({ 
uniqueId : uniqueid,
name : subscriber.name,
email : subscriber.email, 
price : 88.88,
trxRef : txRef, 
});

const session = await stripe.checkout.sessions.create({  

line_items: [
 {
     price_data: {
         currency: 'usd', // Make sure to use 'usd' for dollars
         product_data: {
             name: 'Buddha TV', // Provide a description or name for the product
         },
         unit_amount: Math.round(88.88 * 100), // Convert to pence  
     }, 
     quantity: 1,
 },
], 
   
metadata : {
transactionReference : txRef,    
},
mode: 'payment', 
expires_at: expiresAt,
success_url: `${WEB_DOMAIN}/success_xbe87c3r2c67v3r2/${trxRef}/${uniqueid}/${username}/${email}`,
cancel_url: `${WEB_DOMAIN}/cancel_ebgrdyuwregi4r3gg6g`, 
}); 
  
console.log(session.url); 
const theurl = session.url;
res.json({paymenturl: theurl});      
} 

catch(err) {   
console.log(err);
res.status(500).send('Ooops!, ,something went wrong. Please try again');
}

}   




  
export default { postSubscriber, postSubscriberplus }   

    