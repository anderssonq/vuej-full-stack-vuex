const mongoose = require('mongoose'),
{Schema} = mongoose;

const PostSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Post',PostSchema);