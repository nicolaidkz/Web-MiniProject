<?php
// This script is used to update an existing users temlist when they alter the temtem lineup on
// the website
// it uses the localhost server with the database name login and then a database admin user
// to access the database via php code
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

// An sql query that sets the temlist via the inputted temlist where ever the inputet username
// coresponds to an existing username on the servers database and then updates that user temlist
$sql = "UPDATE users SET temList = '".$inputTemList."' WHERE username = '".$inputUsername."'";

if (mysqli_query($connect, $sql)) {
    echo "<br/>Record updated successfully<br>";
} else {
    echo "<br/>Error updating record: " . mysqli_error($connect);
}

?>