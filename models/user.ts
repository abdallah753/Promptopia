const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true , 'Full Name Is Require']
    },
    email: {
        type:String,
        require: [true , 'Email Is Require'],
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})


export default mongoose.models.User || mongoose.model('User',userSchema )