<?php
ob_start();
include_once 'templates/mail_letter.php';
$email = ob_get_clean();
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: u.kylewov@gmail.com';
$to = $_POST['send_to'] ?? 'u.kylewov@gmail.com';
$isSend = mail($to, 'Task send letter', $email, implode("\r\n", $headers));
die(json_encode(['success' => $isSend]));