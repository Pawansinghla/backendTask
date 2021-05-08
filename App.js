var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.json());

require('./Models/Data1')
require('./Models/Data2')
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/', require('./Controllers/fetchdata'))
app.use(express.static(__dirname + '/public'));

const url=`mongodb+srv://pawan:pawan@cluster0.thk2a.mongodb.net/fetchData?retryWrites=true&w=majority`
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started  on Port ${port}`);
})
