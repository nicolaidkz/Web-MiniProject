<?php
// This script is used to fetch an existing users temlist when they log into the web site
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
   // echo '<p>Connection to MySQL database ' . $database . ' successfully established.
   // </p>';
if (isset($_POST['user']))
{
    // Assigning POST values to variables.
    $inputUsername = $_POST['user'];
    //$inputPassword = $_POST['pass'];
}

// An sql query that checks if what username the inputtet username coresponds to and returns that
// users tem list
$sql = "SELECT temList FROM users WHERE username = '".$inputUsername."'";

$result = mysqli_query($connect, $sql);

if(mysqli_num_rows($result)>=1){
    while($row = mysqli_fetch_assoc($result)) {
        echo $row["temList"]; // theres a <p> coming from nowhere??
    }
    //echo"name already exists";
} else { 
    echo "0 results";
}

?>