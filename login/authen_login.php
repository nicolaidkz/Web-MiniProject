<?php
    header("Access-Control-Allow-Origin: *");
    //header('Content-type: application/json');
    $connection = mysqli_connect('localhost', 'root', '');
    if (!$connection){
        die("Database Connection Failed" . mysqli_error($connection));
    }
    $select_db = mysqli_select_db($connection, 'login');
    if (!$select_db){
        die("Database Selection Failed" . mysqli_error($connection));
    }

    if (isset($_POST['user']) and isset($_POST['pass'])){
	
        // Assigning POST values to variables.
        $username = $_POST['user'];
        $password = $_POST['pass'];
        $request = $_POST['request'];

        // CHECK FOR THE RECORD FROM TABLE
        $query = "SELECT * FROM `users` WHERE username='$username' and Password='$password'";
 
        $result = mysqli_query($connection, $query) or die(mysqli_error($connection));

        
        
        $row = mysqli_fetch_array($result);
        if ($row['username'] == $username && $row['password'] == $password ){
            echo json_encode($row['temList']);
        } else {
            echo "Failed to login!";
        }
    }
?>