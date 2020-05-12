<?php

if (isset($_POST['user']) and isset($_POST['tl']))
{
    // Assigning POST values to variables.
    $inputUsername = $_POST['user'];
    $inputTemList = $_POST['tl'];
}

//$inputTemList = '["tem3", "tem4"]';

$sql = "UPDATE users SET temList = '".$inputTemList."' WHERE username = '".$inputUsername."'";

if (mysqli_query($connect, $sql)) {
    echo "<br/>Record updated successfully<br>";
} else {
    echo "<br/>Error updating record: " . mysqli_error($connect);
}

?>