const mongoose = require('mongoose');


const promptSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    email: {
        type:String,
        require: true,
    },
    content: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true
    }
})


export default mongoose.models.Prompt || mongoose.model('Prompt', promptSchema )