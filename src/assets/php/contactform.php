<?php

if (isset($_POST['submit'])){

    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $mailFrom = $_POST['mail'];
    $message = $_POST['message'];

    $mailTo = "labster.studio@security-interactive.de";
    $headers = "Security-interactive Mail von: " . $mailFrom;
    $txt = "Du hast eine e-mail von ". $name . " erhalten:\n\n". $message;

    mail($mailTo,$subject,$txt,$headers);
    header("Location: /contact.html?mailsend");
}


?>