 <?php
/*

Database name :	db677415121-1
Host name :	localhost
User name :	dbo677415121
Description :	TWSM-database
Version :	MySQL5.5
Status :	setup started
The database setup takes about 5 minutes. You can see the current setup status in the database overview.

*/

$host_name  = "localhost";
$database   = "db677415121-1";
$user_name  = "dbo677415121";
$password   = "P4ssw0rd";
$connect = mysqli_connect($host_name, $user_name, $password, $database);
if(mysqli_connect_errno())
	echo '<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>';
else
    echo '<p>Connection to MySQL database ' . $database . ' successfully established.</p>';

/*

//FOLLOWING CREATES THE TABLE
*/

//sql to create table

 $sql = "CREATE TABLE MyGuests3 (
 id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 firstname VARCHAR(30) NOT NULL,
 lastname VARCHAR(30) NOT NULL,
 email VARCHAR(50),
 reg_date TIMESTAMP
 )";

 if (mysqli_query($connect, $sql)) {
     echo "Table MyGuests3 created successfully";
 } else {
     echo "Error creating table: " . mysqli_error($connect);
 }


/*
Inserting data into the table
=============================

    - The SQL query must be quoted in PHP
    - String values inside the SQL query must be quoted
    - Numeric values must not be quoted
    - The word NULL must not be quoted
*/

//Following inserts records into the table

 $sql = "INSERT INTO MyGuests3 (firstname, lastname, email)
 VALUES ('Jake', 'Menzies', 'jake@menzies.com')";
 //VALUES ('David', 'Meredith', 'dave@meredith.com')";
 //VALUES ('Paul', 'McCartney', 'paul@mccartney.com')";

 if (mysqli_query($connect, $sql)) {
 	$last_id = mysqli_insert_id($connect);
     echo "<br/>New record created successfully. Last inserted
     ID is: " . $last_id . "<br>";
 } else {
     echo "<br/>Error: " . $sql . "<br>" . mysqli_error($connect);
 }



//DELETING A RECORD FROM THE TABLE
/*$sql = "DELETE FROM MyGuests3 WHERE id=2";

if (mysqli_query($connect, $sql)) {
    echo "<br/>Record deleted successfully";
} else {
    echo "<br/>Error deleting record: " . mysqli_error($connect);
}*/



/*
UPDATING DATA IN A TABLE
*/

/*$sql = "UPDATE MyGuests3 SET lastname='Gyllenhal' WHERE id=3";

if (mysqli_query($connect, $sql)) {
    echo "<br/>Record updated successfully<br>";
} else {
    echo "<br/>Error updating record: " . mysqli_error($connect);
}*/


/*
SELECTING DATA FROM THE TABLE
=============================
*/

/*
$sql = "SELECT id, firstname, lastname FROM MyGuests3";
$result = mysqli_query($connect, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "<br/>id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}

//Delete table
$sql = "DROP TABLE MyGuests3";

if (mysqli_query($connect, $sql)) {
    echo "Table MyGuests3 successfully deleted";
} else {
    echo "Error deleting table: " . mysqli_error($connect);
}
*/


mysqli_close($connect);
?> 
