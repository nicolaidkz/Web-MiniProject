<?php

// This script is used to create new users onto the servers database
// is used the localhost server with the database name login and then a database admin user
// to access the database via php code
$host_name = "localhost";
$database  = "login";
$user_name = "login";
$password  = "hej";
$connect = mysqli_connect($host_name, $user_name, $password, $database);
//if(mysqli_connect_errno())
    //echo '<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>';
//else
    //echo '<p>Connection to MySQL database ' . $database . ' successfully established.</p>';

// Reads the posted values from the HTML and js documents
if (isset($_POST['user']) and isset($_POST['pass']))
{
    // Assigning POST values to variables.
    $inputUsername = $_POST['user'];
    $inputPassword = $_POST['pass'];
}

// Creates and sql query for creating a table on the database named login
// if the table already exists it will not create a duplicate
$sql = "CREATE TABLE users (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
reg_date TIMESTAMP
)";

if(mysqli_query($connect, $sql)){
    //echo "Table users created successfully";
} else {
    //echo "Error creating table: " . mysqli_error($connect);
}

// Another sql query is created to check whether the username inputted already exists and if not
// it will create the user. otherwise throw the user an error message saying the user profile
// already exists
$sql = "SELECT username FROM users WHERE username = '".$inputUsername."'";

$result = mysqli_query($connect, $sql);

if(mysqli_num_rows($result)>=1){
    echo "name already exists";
} else { 
    $sql = "INSERT INTO users (username, password)
    VALUES ('$inputUsername', '$inputPassword')";
    
    if(mysqli_query($connect, $sql)){
        $last_id = mysqli_insert_id($connect);
        echo "New record created successfully. last inserted ID is: " . $last_id;
    } else {
        //echo "<br/>Error: " . $sql . "<br>" . mysqli_error($connect);
    }
}

mysqli_close($connect);
?>