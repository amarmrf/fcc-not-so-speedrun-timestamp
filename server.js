// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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




console.log("Hello");
//This is a pretty straightforward application of the lessons, Basic Node and Express - Serve JSON on a Specific Route and Basic Node and Express - Get Route Parameter Input from the Client.

//try to do console.log to see what happens

//we create separate edpoint here for when the date string is empty

//remember:
//The API endpoint is `GET [project_url]/api/timestamp/:date_string?`

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});


app.get("/api/timestamp/:date_string", (req, res) => {//look here, the route parameter is directly red by whatever it is and assigned to req.params, we only got to call it
  let dateString = req.params.date_string;

  //try logging the route parameter
  console.log(dateString);
  //now enter the if cases for the route params, now denoted as date_string: unix or iso
  // in any case, date_string will be passed to a date date object
  //if unix, passes as number
  //if iso, passes as string
  //then the end result will be the same for both
  
  //for ISO look for 4 digit number that represent year: 2016-11-20
  //for unix look for at least 5 digits: 1479663089000
  // if valid then respond with {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
  //parse dateString using regex

  //unix case, need to provide human readable date
  if (/\d{5,}/.test(dateString)) {
    dateInt = parseInt
    (dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    //turn into number, but why no defining command like var or let or const?
    //answer: global variable

    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString()
    //look here, we provide the human readable in utc keys
    //note that the parsed unix is again turned into a more complete timestamp
     });//close for json
  }//close for if
  //until here, actually we can already accept the unix endpoint, so why don't try activating the whole system

  //next is when known iso then return unix and reformat iso

  let dateObject = new Date(dateString);
  console.log(dateObject.valueOf());//unix
  console.log(dateObject)//iso

  if (dateObject.toString() === "Invalid Date"/*HOW CAN IT BE THIS*/) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: dateObject.valueOf()
    , utc: dateObject.toUTCString() });
  }
});//close route


/*
if iso, first set a date object
let dateObject = new Date(dateString)
new Date() is a Date object constructor

dateObject.toString() converts it, surprised that it can be equaled with "Invalid String"

meanwhile the response is
unix: dateObject.valueOf()
this response convert an iso to unix
dateObject.toUTCString() make a human readable from iso

 */
//app.listen(process.env.PORT || 3000 ); 

 






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

