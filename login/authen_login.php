<?php
    header("Access-Control-Allow-Origin: *");
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

        // CHECK FOR THE RECORD FROM TABLE
        $query = "SELECT * FROM `users` WHERE username='$username' and Password='$password'";
 
        $result = mysqli_query($connection, $query) or die(mysqli_error($connection));
        
        //$result = mysqli_query("select * from users where username = '$username' and password = '$password'")
        //or die("Failed to query database ".mysqli_error());
        
        $count = mysqli_num_rows($result);

        if ($count == 1){

            //echo "Login Credentials verified";
            echo "<script type='text/javascript'>alert('Login Credentials verified')</script>";

        }else{
            echo "<script type='text/javascript'>alert('Invalid Login Credentials')</script>";
            //echo "Invalid Login Credentials";
        }
        
        
        $row = mysqli_fetch_array($result);
        if ($row['username'] == $username && $row['password'] == $password ){
            echo "Login success!!! Welcome ".$row['username'];
        } else {
            echo "Failed to login!";
        }
    }
?>