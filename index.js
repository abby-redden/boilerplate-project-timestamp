// index.js
// where your node app starts



// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req,res)=>{
  
  const dateReg = /^\d{4}-\d{2}-\d{2}/;
  const unixReg = /\d{13}/
  if(dateReg.test(req.params.date)){
  const date = new Date(req.params.date)
  const unix = date.valueOf()
  const newDate = date.toUTCString()
  res.json({unix: unix, utc: newDate })

  }
  
  if(unixReg.test(req.params.date)){
    const newDate2 = new Date(Number.parseFloat(req.params.date)).toUTCString()
     res.json({unix:req.params.date, utc: newDate2 })
  }

  else {
    res.send({unix:"invalid", utc: "invalid" })
  }

 if(!req.params.date){
    res.send("invalid Entry")
  }

})


// listen for requests :)
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});




