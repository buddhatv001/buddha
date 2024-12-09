import mongoose from 'mongoose';

const orderRequestSchema = new mongoose.Schema({ 


  name: {
    type: String,
    required: true,
  }, 
  
  email: {
    type: String,
    required: true,
  },  

  uniqueId : {
    type: String,
    required: true,
  },  


  price : {
    type: Number,
    required: true,
  },
   
   

  trxRef: { 
    type: String,  
    unique: true,
  },  

  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const OrderRequest = mongoose.model('Orders', orderRequestSchema);
export default OrderRequest;
