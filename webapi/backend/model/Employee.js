const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const employee=new Schema({
    image:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    designation:{type:String,required:true},
    gender:{type:String,required:true},
    courses:{type:String,required:true},
    createddate:{type:String,required:true},
    username:{type:String,required:true},
})

exports.Employee=mongoose.model('Employee',employee);