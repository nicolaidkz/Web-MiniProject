<?php

if (isset($_POST['user']) and isset($_POST['pass']))
{
    // Assigning POST values to variables.
    $inputUsername = $_POST['user'];
    $inputPassword = $_POST['pass'];
}

$sql = "SELECT username, temList FROM users WHERE username = '".$inputUsername."'";

$result = mysqli_query($connect, $sql);

if(mysqli_num_rows($result)>=1){
    while($row = mysqli_fetch_assoc($result)) {
        echo "<br/>Name: " . $row["username"]. " " . $row["temList"]. "<br>";
    }
    //echo"name already exists";
} else { 
    echo "0 results";
}

?>