$(document).ready(function(){
	$('#camelhead').flash(
        { src: 'http://www.baikonur.com/images/flash/kamel.swf',
          width: 300,
          height: 400,
		  update: false,
		  wmode:"transparent"},
        { version: 10 }
    );
	$('#camelhead').css("position","absolute");
	$('#camelhead').css("bottom",-20);
	$('#camelhead').css("left",0);
	
});