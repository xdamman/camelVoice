var app = require('express').createServer();
var mongoose = require('mongoose');

//require('models/entries');
//require('models/users');

mongoose.connect('mongodb://localhost/camelVoice');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var User = new Schema({
    id        : ObjectId
  , username  : String
  , bio       : String
  , created   : Date
});


var Entry = new Schema({
    id        : ObjectId
  , username  : String
  , url       : String
  , title     : String
  , timestamp : Date
});

var Entry = mongoose.model('Entry',Entry);


app.post('/entries', function(req,res) {
  // create an entry
  var e = new Entry();
  e.timestamp = new Date();
  e.url = 'http://www.scribd.com/doc/6385377/Barack-Obamas-Healthcare-Full-Plan';
  e.title = "BARACK OBAMA AND JOE BIDEN’S PLAN TO LOWER HEALTH CARE COSTS AND ENSURE AFFORDABLE, ACCESSIBLE HEALTH COVERAGE FOR ALL";
  e.save();
  
  var jsonstring = JSON.stringify(json, null, 4);
  
  if (req.param('callback')) return res.send(req.param('callback') + '(' + jsonstring + ')' + '\n', { 'Content-Type': 'application/json' }, 200);
  else return res.send(jsonstring + '\n', { 'Content-Type': 'application/json' }, 200);
  
});



app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);