<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title>Tor zum Himmel - Trailer</title>
</head>
<body style="background-color:#0099CC; margin:10px;" onload="this.focus();">

<div style="text-align:center;">

<?php

$clipFormat = $_GET['format'];
$clipQuality = $_GET['quality'];

$filePath = "/torzumhimmel/video/tzh/";

if ($clipQuality=="hi") {
	$fileHeight = 456;
	$fileWidth = 768;
} else if ($clipQuality=="med") {
	$fileHeight = 224;
	$fileWidth = 384;
} else {
	$fileHeight = 192;
	$fileWidth = 320;
}

if ($clipFormat=="mov") {

	if ($clipQuality=="hi") {
		$fileName = "TorZumHimmel-Tr_hi.mov";
	} else if ($clipQuality=="med") {
		$fileName = "TorZumHimmel-Tr_med.mov";
	} else {
		$fileName = "TorZumHimmel-Tr_low.mov";
	}
	echo "<OBJECT CLASSID=\"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\" CODEBASE=\"http://www.apple.com/qtactivex/qtplugin.cab\" HEIGHT=".$fileHeight." WIDTH=".$fileWidth."><PARAM NAME=\"src\" VALUE=\"".$filePath.$fileName."\"><PARAM NAME=\"AutoPlay\" VALUE=\"true\"><PARAM NAME=\"Controller\" VALUE=\"true\"><PARAM NAME=\"BGCOLOR\" VALUE=\"#0099CC\"><EMBED SRC=\"".$filePath.$fileName."\" TYPE=\"video/quicktime\" PLUGINSPAGE=\"http://www.apple.com/quicktime/download/\" HEIGHT=".$fileHeight." WIDTH=".$fileWidth." AUTOPLAY=\"true\" CONTROLLER=\"true\" BGCOLOR=\"#0099CC\"/></EMBED></OBJECT>\n";

} else if ($clipFormat=="rm") {

	if ($clipQuality=="hi") {
		$fileName = "TorZumHimmel-Tr_hi.rm";
	} else if ($clipQuality=="med") {
		$fileName = "TorZumHimmel-Tr_med.rm";
	} else {
		$fileName = "TorZumHimmel-Tr_low.rm";
	}
	echo "			<OBJECT ID=RVOCX CLASSID = \"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA\" HEIGHT=".$fileHeight." WIDTH=".$fileWidth."><PARAM name=\"src\" value= \"".$filePath.$fileName."\"><PARAM name=\"autostart\" value=\"true\"><PARAM name=\"controls\" value=\"ImageWindow,ControlPanel\"><PARAM name=\"console\" value=\"4\"><EMBED TYPE=\"audio/x-pn-realaudio-plugin\" SRC=\"".$filePath.$fileName."\" HEIGHT=".$fileHeight." WIDTH=".$fileWidth." AUTOSTART=\"true\" CONTROLS=\"ImageWindow,ControlPanel\" CONSOLE=\"4\"></EMBED></OBJECT>\n";

} else {

	if ($clipQuality=="hi") {
		$fileName = "TorZumHimmel-Tr_hi.wmv";
	} else if ($clipQuality=="med") {
		$fileName = "TorZumHimmel-Tr_med.wmv";
	} else {
		$fileName = "TorZumHimmel-Tr_low.wmv";
	}
	echo "<object id=\"wmp\" classid=\"CLSID:22D6f312-B0F6-11D0-94AB-0080C74C7E95\" standby=\"Loading Windows Media Player components\"  type=\"application/x-oleobject\" codebase=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112\" name=\"wmp\" border=\"0\" HEIGHT=".$fileHeight." WIDTH=".$fileWidth."><param name=\"Trailer\" value=\"".$filePath.$fileName."\" /><param name=\"ShowControls\" value=\"1\" /><param name=\"ShowStatusBar\" value=\"0\" /><param name=\"ShowPositionControls\" value=\"1\" /><param name=\"AutoStart\" value=\"true\" /><param name=\"DisplaySize\" value=\"1\" /><embed type=\"application/x-mplayer2\" name=\"wmp\" id=\"wmp\" border=\"0\" HEIGHT=".$fileHeight." WIDTH=".$fileWidth." pluginspage=\"http://www.microsoft.com/netshow/download/player.htm\" src=\"".$filePath.$fileName."\" ShowControls=\"1\" ShowStatusBar=\"0\" ShowPositionControls=\"1\" AutoStart=\"true\" DisplaySize=\"1\"></embed></object>\n";
}

?>

</div>

</body>
</html>