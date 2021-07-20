<?php
//name и tel - то, что мы отправили в body через js
$name = $_POST['name'];
$tel = $_POST['tel'];

$headers  = "Content-type: text/html; charset=UTF-8";

$message = '
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>
<body>
<p><b>Имя: </b>' .$name. '</p>
<p><b>Телефон: </b>' .$tel. '</p>
</body>
</html>';

if (mail("good-friday@mail.ru", "Сообщение с сайта", $message, $headers))
{
echo "отправлено";
} else {
echo "при отправке сообщения возникли ошибки";
}
?>
