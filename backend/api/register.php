<?php
// Handle OPTIONS request (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$name = $_POST['name'] ?? "";
$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

// Validation
if($name == "" || $email == "" || $password == ""){
    echo json_encode(["status" => "error", "message" => "All fields required"]);
    exit();
}

// Check email already exists
$checkQuery = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($conn, $checkQuery);

if(mysqli_num_rows($result) > 0){
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
    exit();
}

// Insert new user
$insertQuery = "INSERT INTO users (name, email, password, role) 
VALUES ('$name', '$email', '$password', 'user')";

if(mysqli_query($conn, $insertQuery)){
    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
}else{
    echo json_encode(["status" => "error", "message" => "Registration failed"]);
}
?>
