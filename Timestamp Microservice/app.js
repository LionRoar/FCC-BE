const express = require('express');
const moment = require('moment');

const app = express();

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/:date',function(req,res){
  let date = moment(req.params.date);
  if(isNaN(req.params.date) && date.isValid())
      res.send({unix:date.unix(),natural:date.format('MMMM D, YYYY')});
  else {

    date = moment.unix(req.params.date);
    if(date.unix() > 0 && date.valueOf())
    res.send({unix:date.unix(),natural:date.format('MMMM D, YYYY')});
    else {
      res.send({unix:null,natural:'Invalid Date'});

    }
  }


});

app.listen(process.env.port||3000,function(){
  console.log('Server is listening...');
});
