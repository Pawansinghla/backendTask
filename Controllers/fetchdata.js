 const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Data1 = mongoose.model("Data1");
const Data2 = mongoose.model("Data2");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://pawan:pawan@cluster0.thk2a.mongodb.net/fetchData?retryWrites=true&w=majority"

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
router.post("/data1", (req, res) => {
  const { full_name, email, number, city, url } = req.body;

  const data = new Data1({
    full_name,
    email,
    number,
    city,
    url,
 });
  data
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/data2", (req, res) => {
  const { full_name, email, team_name } = req.body;

  const data = new Data2({
    full_name,
    email,
    team_name,
  });
  data
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getdata", (req, res) => {
  MongoClient.connect(url,connectionParams, function(err, db) {
    if (err) throw err;
    var dbo = db.db("fetchData");
    dbo.collection('data1').aggregate([
      { $lookup:
         {
           from: 'data2',
           localField: 'email',
           foreignField: 'email',
           as: 'Details'
         }
       }
      ]).toArray(function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      res.render('result',{details : result})
      db.close();
    });
  });

});


module.exports = router
