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

$email = $_POST['email'] ?? "";
$password = $_POST['password'] ?? "";

// Validation
if($email == "" || $password == ""){
    echo json_encode(["status" => "error", "message" => "Email and password required"]);
    exit();
}

// Query for admin only
$query = "SELECT * FROM users 
          WHERE email='$email' AND password='$password' AND role='admin'";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    $admin = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => "success",
        "message" => "Admin login successful",
        "admin" => [
            "id" => $admin['id'],
            "name" => $admin['name'],
            "email" => $admin['email'],
            "role" => $admin['role']
        ]
    ]);
}else{
    echo json_encode(["status" => "error", "message" => "Invalid admin credentials"]);
}
?>
