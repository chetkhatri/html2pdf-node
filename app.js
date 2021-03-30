const express = require('express')
const app = express()
const process = require('process');
var fs = require('fs');
var url = require('url');

var wkhtmltopdf = require('wkhtmltopdf');

app.set('view engine','pug')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/submit', async function (req, res, next)  {

    var pdfValues = 

`<table style="width:100%">
  <tr>
    <th>Name</th> 
    <th>Email</th>
    <th>Contact Number</th>
    <th>Subject</th>
    <th>Question</th>
  </tr>
  <tr>
    <td>${req.body.custName}</td>
    <td>${req.body.custEmail}</td>
    <td>${req.body.telnumber}</td>
    <td>${req.body.subject}</td>
    <td>${req.body.question}</td>
  </tr>
</table>`


  res.writeHead(200, {'Content-Type': 'application/pdf'});
  wkhtmltopdf(pdfValues).pipe(res);


})

app.listen(3232)
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});
