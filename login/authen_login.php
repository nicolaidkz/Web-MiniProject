<?php
    // The header is to avoid CORS policy
    header("Access-Control-Allow-Origin: *");

    // This is where we establish a connection to the server located on localhost
    $connection = mysqli_connect('localhost', 'root', '');
    if (!$connection){
        die("Database Connection Failed" . mysqli_error($connection));
    }

    // This selects which database to connect to on the server
    $select_db = mysqli_select_db($connection, 'login');
    if (!$select_db){
        die("Database Selection Failed" . mysqli_error($connection));
        
    }

    // Here we take posted values from the HTML and js documents
    if (isset($_POST['user']) and isset($_POST['pass'])){
	
        // Assigning POST values to variables.
        $username = $_POST['user'];
        $password = $_POST['pass'];

        // CHECK FOR THE RECORD FROM TABLE
        $query = "SELECT * FROM `users` WHERE username='$username' and Password='$password'";
 
        $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
        
        // Here it either logs the user into his or her profile or fails to do so
        $row = mysqli_fetch_array($result);
        if ($row['username'] == $username && $row['password'] == $password ){
            echo  $username;
        } else {
            echo "Failed to login!";
        }
    }
?>