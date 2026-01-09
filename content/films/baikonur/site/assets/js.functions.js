/** ************************************************************************
* System initialisieren
***************************************************************************/
function dom_init() {
  $('body').log('JS body').addClass('js');
  $(window).load( function() { window.setTimeout( function () { $('#loading').fadeOut('fast'); }, 1000); });
  
  $('ul.gallery li a').append("<img src='../../template/images/gallery/zoom.png' alt='Bild vergrößern' style='position:absolute; bottom:10px; left:10px; ' width='30' height='30' />");
  $('a[rel=imagegroup]').fancybox({overlayColor:'#000',overlayOpacity:0.8});
  
  var $buoop = {} 
  $buoop.ol = window.onload; 
  window.onload=function() {
   if ($buoop.ol) $buoop.ol(); 
   var e = document.createElement('script'); 
   e.setAttribute('type', 'text/javascript'); 
   e.setAttribute('src', 'http://browser-update.org/update.js'); 
   document.body.appendChild(e);
  }
};

/** ************************************************************************
* Überprüft die Angaben in Formularen
* @param	$form  Formular [name]
***************************************************************************/
function checkFieldValues (form) {
  var formObject = $('form[name=' + form + ']');
  var firstLetter = form.substr(0, 1);
  var formName = firstLetter.toUpperCase() + form.substr(1);

  hasError = false;
  $('span.error').remove();
  
  // für jedes Pflichtfeld
  formObject.find('.required').each(function () {
    var value = $(this).val();
    if (value == '') {
      $(this).addClass('emptyfield');
      hasError = true;
    } else {
      $(this).removeClass('emptyfield');
    }
    
    // E-Mail überprüfen
    if ($(this).hasClass('checkmail') && value != '') {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(value)) {
        $(this).addClass('emptyfield');
        hasError = true;
        $(this).parent().append('<span class="error">Bitte eine gültige E-Mail angeben!</span>');
      } else {
        $(this).removeClass('emptyfield');
      }
    }
    
    // PLZ überprüfen
    if ($(this).hasClass('checkzip') && value != '') {
      var zipReg = /\d{5}/;
      if (!zipReg.test(value)) {
        $(this).addClass('emptyfield');
        hasError = true;
        //alert('Bitte eine 5-stellige Postleitzahl angeben!');
        $(this).parent().append('<span class="error">Bitte eine 5-stellige Postleitzahl angeben!</span>');
      } else {
        $(this).removeClass('emptyfield');
      }
    }
  });
  
  if (form == 'newsletter' && !hasError) { return sendNewsletterForm(form);}
  if (hasError) return false;
  else return true;
};

/** ************************************************************************
* Versendet die Angaben des Newsletter
***************************************************************************/
function sendNewsletterForm(form){
 newWindow = popup($('form[name=' + form + ']').attr('action'),800,750);
 $('form[name=' + form + ']').attr('target','popupWin');
 $('form[name=' + form + ']').submit();
};

/** ************************************************************************
* Öffnet ein Popupfenster
***************************************************************************/

function popup(url, width, height) {
	myWindow = window.open(url,'popupWin','width=' + width + ',height=' + height + ',toolbar=no,location=no,status=no,menubar=no,resizable=yes,top=0,left=0');
};

/** ************************************************************************
* © http://happygiraffe.net/blog/2007/09/26/jquery-logging/
* Verwendung = $(root).find('li.source > input:checkbox').log('sources to uncheck').removeAttr('checked');
***************************************************************************/

jQuery.fn.log = function (msg) {
  if (typeof console != 'undefined') console.log('%s: %o', msg, this);
  return this;
};
