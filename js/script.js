$(function () {
  $('#give-once').focus();
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  //API initialization
  luminateExtend.init({
    apiKey: 'amca',
    path: {
      nonsecure: 'http://www.myorganization.com/site/',
      secure: 'https://secure2.convio.net/myorg/site/'
    }
  });

  //Breadcrumb Selector
  $('.breadcrumb-item').click(function (e) {
    e.preventDefault();
    var currentActive = $('.breadcrumb-item.active').val();
    if(currentActive > $(this).val() || validateCurrentPage(currentActive)){
      // $('.breadcrumb-item.active').removeClass('active');
      $(this).addClass('active');
      switch ($(this).val()) {
        case 0:
          $("#amount").removeClass("hidden");
          $("#personal-details").addClass("hidden");
          $("#payment").addClass("hidden");
          break;
        case 1:
          $("#personal-details").removeClass("hidden");
          $("#amount").addClass("hidden");
          $("#payment").addClass("hidden");
          $('#first_name').focus();
          break;
        case 2:
          $("#payment").removeClass("hidden");
          $("#personal-details").addClass("hidden");
          $("#amount").addClass("hidden");
          $('.desktop.card_number').focus();
          break;
      }
    }
  })
  $('.back-btn').click(function(e){
    e.preventDefault();
    var currentActive = $('.breadcrumb-item.active');
    var nextActive = currentActive.val() - 1;
    if(nextActive>=0){
      currentActive.removeClass('active');
      $('.breadcrumb-item').each(function(){
        if($(this).val() === nextActive){
          $(this).addClass('active')
        }
      })
      switch(nextActive){
        case 0:
          $('.back-btn').addClass('hidden');
          $("#amount").removeClass("hidden");
          $("#personal-details").addClass("hidden");
          $("#payment").addClass("hidden");
          break;
        case 1:
          $("#personal-details").removeClass("hidden");
          $("#amount").addClass("hidden");
          $("#payment").addClass("hidden");
          $('#first_name').focus();                    
          break;
      }
    }
  })
  $('.next').click(function(e){
    e.preventDefault();
    var nextVal = parseInt($(this).val());
    var currentActive;
    $('.breadcrumb-item').each(function(){
      if($(this).val() === nextVal){
        currentActive = $(this);
      }
    })
    if(currentActive.val() > $(this).val() || validateCurrentPage(currentActive.val()-1)){
      $('.breadcrumb-item.active').removeClass('active');  
      currentActive.addClass('active')

      switch (nextVal) {
        case 0:
          $("#amount").removeClass("hidden");
          $("#personal-details").addClass("hidden");
          $("#payment").addClass("hidden");
          break;
        case 1:
          $("#personal-details").removeClass("hidden");
          $("#amount").addClass("hidden");
          $("#payment").addClass("hidden");
          $('#first_name').focus();          
          break;
        case 2:
          $("#payment").removeClass("hidden");
          $("#personal-details").addClass("hidden");
          $("#amount").addClass("hidden");
          $('.desktop.card_number').focus();                   
          break;
        default:
          break;
      }
    }
  })
  $('.desktop.value-selector').click(function(e){
    e.preventDefault();
    $('.value-selector').each(function(){
      $(this).removeClass('btn-active')
    })
    $(this).addClass('btn-active');
  })
  $(".value-selector-mobile").click(function (e) {
    e.preventDefault();
    // $(".value-")
    // $(".value-selector-mobile").each(function () {
    //   $(this).removeClass("slissfdsdafasdfasdfasdfasdfasfasfdsda");
    // });
    // $(this).addClass("slissfdsdafasdfasdfasdfasdfasfasfdsda");
    // $(this).removeClass("btn-inactive");
    $(this)
  })

  $(".monthly-selector").click(function (e) {
    e.preventDefault();
    $(".monthly-selector").each(function () {
      $(this).removeClass("btn-active");
    });
    $(this).addClass("btn-active");
    $(this).removeClass("btn-inactive");
  })
  //Mobile UI Stuff
  // $(".monthly-selector.mobile"){

  // }
  $(".payment-method").click(function(e){
    e.preventDefault();
    $('.payment-method').each(function(){
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    switch($(this).val()){
      case "credit card": 
        $('#mobile-credit-card-form').removeClass('hidden')
        $('#mobile-paypal-form').addClass('hidden')
        $('#mobile-apple-pay-form').addClass('hidden')
        break;
      case "paypal":
        $('#mobile-paypal-form').removeClass('hidden')
        $('#mobile-credit-card-form').addClass('hidden')
        $('#mobile-apple-pay-form').addClass('hidden')
        break;
      case "apple pay":
        $('#mobile-apple-pay-form').removeClass('hidden')
        $('#mobile-paypal-form').addClass('hidden')
        $('#mobile-credit-card-form').addClass('hidden')
        break;
    }
  })
  $('.donation-button').click(function(e){
    e.preventDefault();
  })
  $('paypal-btn-mobile').click(function(e){
    e.preventDefault();
  })
  // Slick Carousel
  $('.slick-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '60px',
    swipeToSlide: true,
    edgeFriction: 0.01,
    focusOnSelect: true
  })    
  //card number client validation
  $('.card_number').focusout(function(e){
    var formGroup = $(this).find('.form-group')
    if(isValidCardNumber($(this).val())){
      formGroup.removeClass('has-error')      
      formGroup.addClass('has-success')
    }
    else{
      formGroup.removeClass('has-success')
      formGroup.addClass('has-error')
      // toastr.error("Invalid credit card number");
    };
  })

  $('#other-value-desktop').click(function(e){
    e.preventDefault();
    $('.value-selector.btn-active').removeClass('btn-active');
    $(this).addClass('active-input');
  })

  //Final Donation Validation
  $('#desktop-donation-button').click(function(e){
    e.preventDefault();
    if(validatePaymentPage()){
     desktopDonation(); 
    }
  })

  $('.desktop.paypal-button').click(function(e){
    console.log('desktoppaypal'
    )
    e.preventDefault();
    desktopPaypalRedirect();
  })
  $('#mobile-donation-button').click(function(e){
    e.preventDefault();
    console.log("deesh")    
    mobileDonation();
  })
  $('.paypal-btn-mobile').click(function(e){
    e.preventDefault();
    console.log("feesh")
    mobilePaypalRedirect();
  })
  function validateCurrentPage(validateId){
    switch(validateId){
      case 0:
        return validateAmountPage();
        break;
      case 1:
        return validatePersonalPage();
        break;
      case 2:
        return validatePaymentPage();
        break;
    }
  }
  //amount page client validation
  function validateAmountPage(){
    if(getDonationIncrement()[1]){
      return true;
    }
    toastr.error("Please Select an Amount.");      
    return false;
  }

  //personal detail page client validation
  function validatePersonalPage(){
    return validateForm('#personal-details')
  }

  //personal payment page client validation
  function validatePaymentPage(){
    return validateForm('#payment')
  }

  function getDonationIncrement(){
    var increment = $('.monthly-selector.btn-active').val();
    var amount = $('.other-amount-desktop').val();
    if(amount === ""){
      amount = $('.value-selector.btn-active').val();
    }
    if(!amount){
      return [null, null];
    }
    return [increment, amount]
  }

  function isValidCardNumber(cardNum){
    var reg = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")
    return reg.test(cardNum);
  }

  function validateEmailAddress(email_address){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email_address).toLowerCase());
  }

  function validateForm(formId){
    var isValid = true;
    var $inputs = $(formId + ' :input');
    $inputs.each(function(){
      if(!$(this).val() && !$(this).hasClass('btn') && $(this).attr('name') !== 'cvv'){
        $(this).parent().removeClass('has-success')
        $(this).parent().addClass('has-error')
        toastr.error($(this).data('error'));
        isValid = false;
      }
      else{
        checkAdditionalFields(this);
        $(this).parent().removeClass('has-error')
        $(this).parent().addClass('has-success')        
      }
    })
    return isValid;
  }

  /*********************************************************************************
   * This method checks to see if a field is empty, if the field has no content then
   * a toastr error will pop up with the message saved in it's 'error' data field
   * @param{field: input field} - the field we will look at
   ********************************************************************************/
  function checkAdditionalFields(field){
    var value = $(field).val();
    switch($(field).attr('name')){
      case 'donor.email':
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(value).toLowerCase())){
          return "Email address is invalid."
        }
        else{
          return null;
        }
        break;
      //CVV's break blackbaud, prevent validation for now.
      // case 'card_cvv':
      //   var re = /^[0-9]{3,4}$/;
      //   if(re.test(String(value).toLowerCase())){
      //     return "CVV is invalid."
      //   }
      //   else{
      //     return null;
      //   }
      //   break;
    }
  }
})