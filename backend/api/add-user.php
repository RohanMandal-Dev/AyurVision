<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

$name = trim($_POST['name'] ?? "");
$email = trim($_POST['email'] ?? "");
$password = trim($_POST['password'] ?? "");

if ($name == "" || $email == "" || $password == "") {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit();
}

$safeName = mysqli_real_escape_string($conn, $name);
$safeEmail = mysqli_real_escape_string($conn, $email);
$safePassword = mysqli_real_escape_string($conn, $password);

// Check duplicate email
$checkQuery = "SELECT * FROM users WHERE email='$safeEmail' LIMIT 1";
$checkResult = mysqli_query($conn, $checkQuery);

if ($checkResult && mysqli_num_rows($checkResult) > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Email already exists"
    ]);
    exit();
}

// Insert user
$insertQuery = "INSERT INTO users (name, email, password, role) 
                VALUES ('$safeName', '$safeEmail', '$safePassword', 'user')";

if (mysqli_query($conn, $insertQuery)) {
    echo json_encode([
        "status" => "success",
        "message" => "User added successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to add user",
        "error" => mysqli_error($conn)
    ]);
}
?>