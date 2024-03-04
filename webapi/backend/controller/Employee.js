const {Employee} =require('../model/Employee')


exports.addEmployee=async(req,res)=>{
    try{
        const d=new Date()
        const  date=`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        const employee=new Employee({...req.body,image:req.file.filename,createddate:date});
        const doc=await employee.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json('error in registration');
    }
}

exports.deleteEmployee=async(req,res)=>{
    const {_id}=req.params ;
    
    try{
        const deletedProduct=await Employee.findByIdAndDelete(_id);
        
        if(deletedProduct){
            res.status(200).json({message:'deleted successfully'});
        }
        else {
            res.status(400).json({message:'not deleted'}) 
        }
    }catch(err){
         res.status(400).json(err); 
    }
}
exports.updateEmployee=async(req,res)=>{
    const {_id}=req.params;
    var data=req.body;
    if(req.file){
         data={...req.body,image:req.file.filename};
    }
    
    try{
        const updatedemployee=await Employee.findByIdAndUpdate(_id,data,{new:true});
        if(updatedemployee){
            res.status(200).json(updatedemployee);
        }
        else {
            res.status(400).json({message:'not updated'});
        }
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchAllEmployee=async(req,res)=>{
    const {_id}=req.params;
    try{
        const employee=await Employee.find({username:_id});
        res.status(200).json(employee)

    }catch(err){
        res.status(400).json({message:'error in employee list fetching'})
    }
}
exports.fetchSingleEmployee=async(req,res)=>{
    const {_id}=req.params;
    try{
        const employee=await Employee.findById({_id});
        res.status(200).json(employee)

    }catch(err){
        res.status(400).json({message:'error in employee  fetching'})
    }
}
