const express = require('express')
const app = express()
const process = require('process');
var fs = require('fs');
var url = require('url');
var encodeUrl = require('encodeurl')
var escapeHtml = require('escape-html')

var wkhtmltopdf = require('wkhtmltopdf');

app.set('view engine','pug')

const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator');

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/submit', [
    check('custName').trim().escape().not().isEmpty().withMessage('First Name can not be empty!')
    .bail().isAlpha().isLength({ min: 4, max: 15 })
      .withMessage('Minimum 4 Characters and Maximum 15 Characters are needed!').bail(),
    check('custEmail', 'Email Can not be empty').not().isEmpty().isEmail()
    .normalizeEmail().withMessage('Email should be in right format!').bail(),
    check('subject', 'Invalid value!').not().isEmpty().matches("^(?!.*<[^>]+>).*"),
    check('telnumber', 'Telephone number can not be empty').not().isEmpty()
      .isNumeric().withMessage('Telephone number must be numberic').bail(),
    check('question', 'Question can not be empty').not().isEmpty().isAlpha()
      .withMessage('Only Alphanumberic with space allowed in question').bail(),
], function (req, res)  {

  const errors = validationResult(req);
  console.log(req.body);
  
  var encodedSubject = encodeUrl(req.body.subject)

  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    var subjectValue = decodeURIComponent(decodeURIComponent(req.body.subject))
    
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
    <td>${subjectValue}</td>
    <td>${req.body.question}</td>
  </tr>
</table>`


  res.writeHead(200, {'Content-Type': 'application/pdf'});
  wkhtmltopdf(pdfValues).pipe(res);

  }

    

})

app.listen(3232)
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err); 
});
