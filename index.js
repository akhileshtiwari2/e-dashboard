const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/users");
const Product = require("./db/product")
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  //Remove Password
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post('/add-product',async(req, res)=>{
let product = new Product(req.body);
let result  = await product.save();
res.send(result)
})

app.get('/products',async(req, res)=>{
  let products = await Product.find();
  if(products.length>0){
    res.send(products)
  }else{
    res.send({result:"No Products Found"})
  }
})

app.delete('/product/:id',async(req, res)=>{
  const result = await Product.deleteOne({_id:req.params.id})
  res.send(result);
})
app.listen(5000);
