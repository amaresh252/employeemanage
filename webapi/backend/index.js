const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer=require('multer');

const auth = require('./controller/Auth');
const employee = require('./controller/Employee');

server.use(cors());
server.use(express.static('public'))
server.use(express.urlencoded({extended:false}));
const router = express.Router();

server.use(express.json());
server.use(router);

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        return cb(null,'./public');
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
})
const  upload=multer({storage:storage})



router.get('/', (req, res) => {
  res.send('Server is ready');
});

router.post('/auth', auth.CreateOrLoginUser);


router.post('/employee',upload.single('image'), employee.addEmployee);
router.get('/employee/:_id', employee.fetchAllEmployee);
router.put('/employee/:_id',upload.single('image'), employee.updateEmployee);
router.delete('/employee/:_id', employee.deleteEmployee);
router.get('/employee/singleemployee/:_id', employee.fetchSingleEmployee);


 
main().catch(error => console.log(error));

async function main() {
  await mongoose.connect('mongodb+srv://amareshranjan252:iDNgqdmWASlNEXij@cluster0.3hqg4vo.mongodb.net/?retryWrites=true&w=majority');
  console.log('Database connected');
}

server.listen(8080, () => {
  console.log('Starting server at 8080');
});
