const {User}=require('../model/User')


exports.CreateOrLoginUser=async (req,res)=>{

    try{
        const {username,password}=req.body;
        const userdata=await User.findOne({username:username});
        if(userdata ){
            if(userdata.password===password){
                res.json(userdata);
            }
            else{
                res.status(400).json('Wrong credentials');
            }
        }
        else{
            const user=new User({...req.body})
        const doc=await user.save();
        res.json(doc);
        }
        
    }catch(err){
        console.log(err);
        res.status(400).json('error in login');
    }
}
