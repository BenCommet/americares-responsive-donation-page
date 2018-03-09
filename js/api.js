"use strict"
var shadow_form_id = 22851;
// var shadow_form_id = 22787;
var global_response;
$(function(){
})
var testGlobal;
function desktopDonation(){
  var isRecurring = $('#amount').find('.monthly-selector.btn-active').val() === '1';
  var value = getDesktopValue();
  var donationFields = $('#desktop-donation-form').serializeArray();
  var other_amount = $('other-value-desktop').val();
  
  var test_data = {
    card_number: "4111111111111111",
    card_cvv:"111"
  }
  var data = {
    method: 'donate',
    v: '1.0',    
    api_key: 'amca',
    summary: 'page',
    other_amount: value,
    form_id: shadow_form_id,
    df_preview: true,
    level_id: 73592,
    send_registration_email: true,
    response_format: 'json',
  }
  data['donor.phone'] =  '5179143375'
  var paymentData = {};
  //These fields must be sent in the POST data object instead of the url for security purposes
  var paymentFields = ['card_number', 'card_cvv', 'card_exp_date_year', 'card_exp_date_month']
  donationFields.forEach(function(field){
    if(paymentFields.indexOf(field.name) !== -1){
      if(field.name === 'card_number' || field.name ==='card_cvv')
        paymentData[field.name]=field.value.replace(/\D/g,'');
      else
        paymentData[field.name]=field.value;
    }
    else{
      data[field.name] = field.value;
      if(field.name.includes("billing")){
        data[field.name.replace("billing", "donor")] = field.value;
      }  
    }
  })
  if(isRecurring){
    data.sustaining={
      duration : 0,
      frequency : 'monthly'
    }
  }
  donationFields['billing.address.country'] = "United States" 
  // delete paymentData.card_exp_date_month;
  // delete paymentData.card_exp_date_year;
  // paymentData.card_exp_date = paymentData.card_exp_date_month + '/' + paymentData.card_exp_date_year;

  paymentData.cardType = getCardType(paymentData.card_number);  
  
  var formattedURL =  objectToPostString('https://secure.americares.org/site/CRDonationAPI?', data)
  $.ajax({
    type: 'POST',
    url: formattedURL,
    data: paymentData,
    success: function(result){
      toastr.success('Donation submitted successfully')      
      testGlobal = result;
      var html = JSON.parse(result).donationResponse.donation.summary_page
      $('.page').addClass('hidden');
      document.body.innerHTML = document.body.innerHTML + html
      // document.write(html);
      // document.close();
    },
    error: function(result){
      errorHandler(result);
      global_response = result;
      parsedResult = JSON.parse(result.responseText);
      toastr.error('error');
    }
  })
}

function desktopPaypalRedirect(){
  var isRecurring = $('#amount').find('.monthly-selector.btn-active').val() === '1';
  var value = getDesktopValue();
  var donationFields = $('#desktop-donation-form').serializeArray();
  var data = {
    method: 'startDonation',
    v: '1.0',    
    api_key: 'amca',
    summary: 'page',
    finish_success_redirect: 'https://secure.americares.org/site/success',
    finish_error_redirect: "https://secure.americares.org/site/failure",
    extproc: 'paypal',
    other_amount: value,
    form_id: shadow_form_id,
    // df_preview: true,
    validate: false,
    level_id: 73592,
    send_registration_email: true   
  }
  var paymentData = {};
  //These fields must be sent in the POST data object instead of the url for security purposes
  var paymentFields = ['card_number', 'card_cvv', 'card_exp_date_year', 'card_exp_date_month']
  donationFields.forEach(function(field){
    if(paymentFields.indexOf(field.name) !== -1){
      if(field.name === 'card_number' || field.name ==='card_cvv')
        paymentData[field.name]=field.value.replace(/\D/g,'');
      else
        paymentData[field.name]=field.value;
    }
    else{
      data[field.name] = field.value;
      if(field.name.includes("billing")){
        data[field.name.replace("billing", "donor")] = field.value;
      }  
    }
  })
  if(isRecurring){
    data.sustaining={
      duration : 0,
      frequency : 'monthly'
    }
  }
  paymentData.cardType = getCardType(paymentData.card_number);  
  data.other_amount = getDesktopValue();
  var formattedURL =  objectToPostString('https://secure.americares.org/site/CRDonationAPI?', data)
  $.ajax({
    type: 'POST',
    url: formattedURL,
    data: paymentData,
    success: function(result){
      testGlobal = $.parseXML(result);
      window.open($(result).find('url').text())
    },
    error: function(result){
      errorHandler(result);
    }
  })
}

function mobileDonation(){
  var isRecurring = $('#amount').find('.monthly-selector.btn-active').val() === '1';  
  var value = getMobileValue();
  var donationFields = $('#mobile-form').serializeArray();
  var data = {
    method: 'donate',
    v: '1.0',    
    api_key: 'amca',
    summary: 'page',
    other_amount: value,
    form_id: shadow_form_id,
    // df_preview: true,
    validate: false,
    level_id: 73592,
    send_registration_email: true,
    response_format: 'json'         
  } 
  if(isRecurring){
    data.sustaining={
      duration : 0,
      frequency : 'monthly'
    }
  }
  var paymentData = {};
  //These fields must be sent in the POST data object instead of the url for security purposes
  var paymentFields = ['card_number', 'card_cvv', 'card_exp_date_year', 'card_exp_date_month'];
  donationFields.forEach(function(field){
    if(paymentFields.indexOf(field.name) !== -1){
      if(field.name === 'card_number' || field.name ==='card_cvv')
        paymentData[field.name]=field.value.replace(/\D/g,'');
      else
        paymentData[field.name]=field.value;
    }
    else{
      data[field.name] = field.value;
      if(field.name.includes("billing")){
        data[field.name.replace("billing", "donor")] = field.value;
      }  
    }
  })
  paymentData.cardType = getCardType(paymentData.card_number);  

  var formattedURL =  objectToPostString('https://secure.americares.org/site/CRDonationAPI?', data)
  $.ajax({
    type: 'POST',
    url: formattedURL,
    data: paymentData,
    success: function(result){
      toastr.success('Donation submitted successfully')      
      testGlobal = result;
      var html = JSON.parse(result).donationResponse.donation.summary_page
      $('.page').addClass('hidden');
      document.body.innerHTML = document.body.innerHTML + html
    },
    error: function(result){
      errorHandler(result);
      global_response = result;
      parsedResult = JSON.parse(result.responseText);
    }
  })
}

function mobilePaypalRedirect(){
  var isRecurring = $('#amount').find('.monthly-selector.btn-active').val() === '1';  
  var value = getMobileValue();
  var donationFields = $('#mobile-form').serializeArray();
  var data = {
    method: 'startDonation',
    v: '1.0',    
    api_key: 'amca',
    summary: 'page',
    finish_success_redirect: 'https://secure.americares.org/site/success',
    finish_error_redirect: "https://secure.americares.org/site/failure",
    extproc: 'paypal',
    other_amount: value,
    form_id: shadow_form_id,
    // df_preview: true,
    validate: false,
    level_id: 73592,
    send_registration_email: true    
  } 
  if(isRecurring){
    data.sustaining={
      duration : 0,
      frequency : 'monthly'
    }
  }
  var paymentData = {};
  //These fields must be sent in the POST data object instead of the url for security purposes
  var paymentFields = ['card_number', 'card_cvv', 'card_exp_date_year', 'card_exp_date_month'];
  donationFields.forEach(function(field){
    if(paymentFields.indexOf(field.name) !== -1){
      if(field.name === 'card_number' || field.name ==='card_cvv')
        paymentData[field.name]=field.value.replace(/\D/g,'');
      else
        paymentData[field.name]=field.value;
    }
    else{
      data[field.name] = field.value;
      if(field.name.includes("billing")){
        data[field.name.replace("billing", "donor")] = field.value;
      }  
    }
  })

  paymentData.cardType = getCardType(paymentData.card_number);


  var formattedURL =  objectToPostString('https://secure.americares.org/site/CRDonationAPI?', data)
  $.ajax({
    type: 'POST',
    url: formattedURL,
    data: paymentData,
    success: function(result){
      testGlobal = $.parseXML(result);
      window.open($(result).find('url').text())
    },
    error: function(result){
      errorHandler(result);
    }
  })
}


function getDesktopValue(){
  var value = $('#other-value-desktop').val();
  if(!value){
    value = $('.value-selector.desktop.btn-active').val();    
  }
  return value;
}

function getMobileValue(){
  var value = $('#other-value-mobile').val();
  if(!value){
    value = $('.value-selector-mobile.mobile.slick-current').val();
  }
  return value;
}

function objectToPostString(startString, data){
  var formattedString = startString ? startString : '';
  for(var key in data){
    if(data.hasOwnProperty(key)){
      if(formattedString.length > 1){
        if(data[key] !== ''){
          formattedString += '&' + key + "=" + data[key];
        }
      }
      else{
        formattedString = key + '=' + data[key];
      }
    }
  }
  if(data['method'] === 'startDonation' && !data['billing.name.first']){
    formattedString += "&billing.name.last= americares&donor.name.last= &billing.name.first= &donor.name.first= ";
  }
  else
  return formattedString;
}

// https://gist.github.com/swapnilmishra/dec37ee5a820de6cbca5
function getCardType(cardNum) {
  var re = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  }

  for(var key in re) {
      if(re[key].test(cardNum)) {
          return key
      }
  }
}

function errorHandler(result){
  global_response = result;
  var parsedResult = JSON.parse(result.responseText);
  if(parsedResult.donationResponse && parsedResult.donationResponse.errors){
    if(parsedResult.donationResponse.errors.declineUserMessage){
      toastr.error(parsedResult.donationResponse.errors.declineUserMessage);
    }
    else if(parsedResult.donationResponse.errors.pageError){
      toastr.error(parsedResult.donationResponse.errors.pageError);
    }
  }
}
