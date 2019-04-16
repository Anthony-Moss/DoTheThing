<?php
$CL_sms_Serv = "DoTheThing Sms Service";
$subject = $CL_sms_Serv;
$sender_name = $_POST['name'];
$number = $_POST['number'];
$carrier = $_POST['carrier'];
$message = $_POST['message'];
$rateDisclaimer = "Data rates may apply";
mail($number.$carrier, $subject, "\r\n\n".$message."\r\n\n".$rateDisclaimer);
echo "Message sent";
?>
