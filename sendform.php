<?php
ob_start();
include_once 'templates/mail_letter.php';
$email = ob_get_clean();
$isSend = mail('vilisofty@gmail.com', 'test', $email, 'From: u.kylewov@gmail.com');
die(json_encode(['success' => $isSend]));