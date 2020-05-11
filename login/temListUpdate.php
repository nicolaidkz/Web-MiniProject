<?php

//$inputTemList = "newTemList"

//$sql = "UPDATE users SET temList='".$inputTemList."' WHERE username = '".$inputUsername."'";
$sql = "UPDATE users SET temList='newTemList' WHERE username = '".$inputUsername."'";

if (mysqli_query($connect, $sql)) {
    echo "<br/>Record updated successfully<br>";
} else {
    echo "<br/>Error updating record: " . mysqli_error($connect);
}

?>