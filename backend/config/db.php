<?php
// Database connection file

$host = "localhost";
$user = "root";
$password = "";
$dbname = "ayurvision_db";

// Create connection
$conn = mysqli_connect($host, $user, $password, $dbname);

// Check connection
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>
