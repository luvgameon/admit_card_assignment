const Form = require("../model/form");
const dotenv = require("dotenv");
dotenv.config();

exports.adddetails = async (req, res) => {
  const {  mobileNo, school, myclass, address, rollno,name } = req.body;
  const check = await Form.findOne({where:{rollno:rollno}});
  
  if(check!==null)
  {
    res.status(404).json({success: false, message: "User Already Exists"});

  }
  else{
  Form.create({
    name:name,
    address:address,
    mobileNo:mobileNo,
    school:school,
    myclass:myclass,
    rollno:rollno
  })
  .then(() => {
      res
        .status(200)
        .send({ success: true, message: "Details Submit Successfully" } );
    })
    .catch((err) => {
      console.log(err);
      if(err.name==='SequelizeUniqueConstraintError'){
        return res.status(400).json({success:false,message:err});
      }

      res.status(500).json({ success: false, message: err });
    });
  }
};


exports.getdata = async (req, res) => {
 
      let rollno=req.params.id;
    
      const data = await Form.findOne({where:{rollno:rollno}});
      if(data)
      {
        res.status(200).json({data});
      }

     
};

