const express = require('express');
const cors = require('cors'); //CORS (Cross-Origin Resource Sharing)
const DbClass = require('./database/DbClass');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const dbClass = new DbClass();


app.route('/').get((req,res)=>{
    res.send("Root Route");
});
app.route('/postBook').post((req,res)=>{
    dbClass.postBook(req.body).then((data)=>{
      res.send(data);
    });
});
//USER ROUTES
app.route('/getUserDetails/:email/:name').get((req,res)=>{
    dbClass.getUserDetails(req.params.email,req.params.name).then((user)=>{
        res.send(user);
    });
});
app.route('/searchByCatagory/:cat').get((req,res)=>{
  dbClass.searchByCatagory(req.params.cat).then((bList)=>{
      res.send(bList);
  });
});
app.route('/searchByID/:id').get((req,res)=>{
  dbClass.searchByID(req.params.id).then((b)=>{
      res.send(b);
  });
});
app.route('/addToCart/:email/:id').get((req,res)=>{
  dbClass.addToCart(req.params.email,req.params.id).then((user)=>{
    res.send(user);
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log("Server is Running on Port " + port + ".....");
});