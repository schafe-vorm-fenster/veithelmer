<?php
	$pictureName = $_GET['name'];
	$picturePath = "img/tzh/".$pictureName;
	if ($picturePath) {
		$arrPictureInfo = getimagesize($picturePath);
		// 0 width
		// 1 height
		$intWindowWidth = $arrPictureInfo[0] + 45;
		$intWindowHeight = $arrPictureInfo[1] + 45;
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title>Tor zum Himmel</title>
</head>
<body style="background-color:#0099CC; margin:10px;" onload="window.resizeTo(<?php echo $intWindowWidth; ?>,<?php echo $intWindowHeight; ?>); this.focus();">

<div style="text-align:center;">

<?php
	if ($picturePath) {
		echo '<img src="'.$picturePath.'" height="'.$arrPictureInfo[1].'" width="'.$arrPictureInfo[0].'" style="border:0px;" height:'.$arrPictureInfo[1].'px; width:'.$arrPictureInfo[0].'px; onclick="window.close();" />';
	}

?>

</div>

</body>
</html>