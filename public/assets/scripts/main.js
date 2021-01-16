$(document).ready(function(){

//==================== Selectors ====================//

//== Forms ==//
var form                       = $('form');
var formButtonSelector         = $('.form button');
var formInput                  = $('.input');
var inputLabel                 = $('.form label');
var inputRequired              = $('.input.required');
var messageSent                = $('#message-sent');

//==================== Contact Form ====================//

//== Email Symbols ==//
var emailSymbol = '@';
var emailSymbolDot = '.';

//== For each Input in Contact Form get attr 'name' and add that as a class ==//
formInput.each(function(){
  var attrName = $(this).attr('name');
  $(this).addClass(attrName);
});

//== Function: ==//
//== Param: inputValue => input value ==//
//== Param: selector => $(this) ==//
//== onFire =>
//== If input has class of email check if input contains '@' and '.'  ==//
//== Else if input value's legnth is less than 1 ==//
//== Add error classes ==//
function validateForm(inputValue, selector) {
  if (selector.hasClass('email')) {
    if (inputValue.indexOf(emailSymbol) == -1) {
      selector.prev('label').addClass('error');
      selector.next('div').addClass('error');
    } else if (inputValue.indexOf(emailSymbolDot) == -1) {
      selector.prev('label').addClass('error');
      selector.next('div').addClass('error');
    } else {
      selector.prev().removeClass('error');
      selector.next('div').removeClass('error');
    }
  } else if (inputValue.length >= 1) {
    selector.prev('label').removeClass('error');
    selector.next('div').removeClass('error');
  } else {
    selector.prev('label').addClass('error');
    selector.next('div').addClass('error');
  }
}

//== Function: ==//
//== onFire =>
//== Display message sent notification by moving it 'right' into the view  ==//
//== After 10 seconds move the notification back out of the view ==//
function messageSentNotification() {
  messageSent.css({'right':'0'});
  setTimeout(function(){
    messageSent.css({'right':'-400px'});
  }, 10000);
}

//== Function: ==//
//== onFire =>
//== If any input label has class of error prevent send ==//
//== Else send message, show message notification, and reset inputs ==//
function sendMessage(e) {
  var checkInputError = inputLabel.hasClass('error');
  if (checkInputError) {
    e.preventDefault();
  } else {
    messageSentNotification();
    resetInputs();
  }
}

//== Function: ==//
//== onFire =>
//== Inputs erase value and remove class grow from textarea  ==//
//== Move input labels back to start position ==//
function resetInputs() {
  $('.input').val('').removeClass('grow');
  inputLabel.css({'top': '5px'});
}

//== Contact Input: onBlur =>
//== Get input's value ==//
//== Fire: validateForm ==//
formInput.blur(function(){
  var selector     = $(this);
  var inputValue   = selector.val();
  validateForm(inputValue, selector);
});

//== Contact Input: onKeypress =>
//== Get input's value ==//
//== Check if input has class of message if yes then add class grow ==//
//== Fire: validateForm ==//
formInput.keypress(function(){
  var selector     = $(this);
  var inputValue   = selector.val();
  var inputMessage = selector.hasClass('message');
  validateForm(inputValue, selector);
  if (inputMessage) {
    selector.addClass('grow');
  }
});

//== Contact Input: onFocus =>
//== Move label up ==//
formInput.focus(function(){
  var inputLabel  = $(this).prev();
  inputLabel.css({'top': '-20px'});
});

//== Contact Input: onBlur =>
//== If input has no value then move label down and remove class grow from textarea ==//
formInput.blur(function(){
  var inputLabel = $(this).prev();
  if ($(this).val()) {
    return false;
  } else {
    inputLabel.css({'top': '5px'});
    $(this).removeClass('grow');
  }
});


//== Contact Submit Button: onClick =>
//== For each input label check if has value ==//
//== If input has no value then add class error ==//
//== Fire: sendMessage ==//
formButtonSelector.click(function(e){
  inputRequired.each(function(){
    if ($(this).val() == false) {
      $(this).prev().addClass('error');
    }
  });
  sendMessage(e);
});

//== On Page Load Reset Inputs ==//
resetInputs();

//== End Document.ready ==//
});
