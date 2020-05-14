<?php
$host_name = "localhost";
$database  = "login";
$user_name = "login";
$password  = "hej";
$connect = mysqli_connect($host_name, $user_name, $password, $database);
if(mysqli_connect_errno())
    echo '<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>';
else
    echo '<p>Connection to MySQL database ' . $database . ' successfully established.
    </p>';

if (isset($_POST['user']) and isset($_POST['tl']))
{
    // Assigning POST values to variables.
    $inputUsername = $_POST['user'];
    $inputTemList = $_POST['tl'];
}

//$inputTemList = '["Houchic", "Adoroboros", "temName", "bullshit", "trial", "sixxxx"]';
$sql = "UPDATE users SET temList = '".$inputTemList."' WHERE username = '".$inputUsername."'";
//$sql = 'REPLACE INTO users(temList, "'.$inputTemList.'") WHERE username ="'.$inputUsername'"';
//$sql="UPDATE users SET temList = REPLACE(temList,'".$inputTemList"') WHERE username = '".$inputUsername"'"; 
if (mysqli_query($connect, $sql)) {
    echo "<br/>Record updated successfully<br>";
} else {
    echo "<br/>Error updating record: " . mysqli_error($connect);
}

?>