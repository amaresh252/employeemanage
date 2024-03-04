const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const user=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
})

exports.User=mongoose.model('User',user);