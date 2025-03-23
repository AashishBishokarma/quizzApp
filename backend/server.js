import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//connection
mongoose
.connect("mongodb://127.0.0.1:27017/testing")
.then(() => console.log("Mongodb Connected"))
.catch(err=>console.log(err));


//schema
const userSchema = new mongoose.Schema({
  name : {
    type:String ,
    required : true
  },
  score : {
    type : Number 
  }
},{timestamps : true},{TimeRanges : true});

const User = mongoose.model('user' , userSchema);


app.get("/api", async(req, res) => {
  // res.json({ message: "Hello from server!" });

  const allDbUsers =  await User.find({});
  const html = `
    <ul>
     ${allDbUsers.map((user) => `<li>${user.name} - ${user.score}</li>`).join("")}
    </ul>
  `
  res.send(html);

});

app.post("/api", async (req, res) => {

  const body =  req.body ;


  const result = await User.create({
    name : body.name,
    score : body.score,
  });
  
  console.log(result);
  
  return res.json({msg:"sucess"});
});

app.patch("/api/:id" , (req, res)=>{
  const {id} = req.params ;
  res.send(`Updated ${id} sucessfully`);
})

app.delete("/api/:id",(req,res) =>{
  const {id} = req.params;
  res.json({"message" : `Deleted ${id} sucessfully`});
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
