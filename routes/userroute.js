  
  import express from 'express';
  const app = express();
  import ejs from 'ejs';   
  import cors from 'cors';  
  app.use(cors()); 
  const router = express.Router();  
  import basicController from '../controller/basiccontroller.js';  
  //import loginController from '../controller/logincontroller.js'; 
  //import pfpController from '../controller/dashboardcontroller.js'; 
 import subController from '../controller/subscribecontroller.js'; 

  router.get('/', basicController.getHome);      
  router.get('/success_xbe87c3r2c67v3r2/:trxRef/:uniqueid', basicController.getSuccess);   
  router.get('/cancel_ebgrdyuwregi4r3gg6g', basicController.getCancel);  
  router.get('/subscribe', basicController.getSub);     
  router.get('/about', basicController.getAbt);      
  router.get('/watch', basicController.getWatch);    
  router.post('/postsubscriber', subController.postSubscriber);    
  router.post('/postsubscriberplus', subController.postSubscriberplus);    
  
  export default router;  
