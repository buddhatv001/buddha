 
 import mongoose from 'mongoose';
 
 const VideoSchema = new mongoose.Schema({ 
      
      videoId : {
          type : String,
          required: true,
      },

       title : {
         type : String,   
       }, 

        description : {
        type : String, 
      },    
  
 });     
    
 const Video = mongoose.model('Videos', VideoSchema);
 export default Video;
 