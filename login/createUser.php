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


$sql = "CREATE TABLE users (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
reg_date TIMESTAMP
)";

if(mysqli_query($connect, $sql)){
    echo "Table users created successfully";
} else {
    echo "Error creating table: " . mysqli_error($connect);
}

$sql = "INSERT INTO users (username, password)
VALUES ('admin', 'admin')";

if(mysqli_query($connect, $sql)){
    $last_id = mysqli_insert_id($connect);
    echo "<br/>New record created successfully. last inserted ID is: " . $last_id . "<br>";
} else {
    echo "<br/>Error: " . $sql . "<br>" . mysqli_error($connect);
}

mysqli_close($connect);
?>