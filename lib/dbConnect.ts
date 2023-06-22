const mongoose = require('mongoose');

let isConnected : boolean = false
export default  async function dbConnect() {
    if(!isConnected){
      try {
        await mongoose.connect(process.env.MONGODB_URL ,
        {useUnifiedTopology:true , useNewUrlParser:true});
  
        console.log('Connected successfully !')
          isConnected = true
      } catch (error) {
          console.log(error)
      }
    }else{
      console.log("Already Connected")
    }
}
