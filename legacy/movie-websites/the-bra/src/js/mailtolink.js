function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function changeCentAmount(centamount) {
	var mailtoLink = $('a#kopfgeldspende').attr('data-href');
	mailtoLink = mailtoLink.replace(new RegExp(escapeRegExp('SPENDENBETRAG'), 'g'), centamount);
	$('a#kopfgeldspende').attr('href',mailtoLink);
}

$(document).ready(function() {
	changeCentAmount($('.howitworks__number__total').html());
});