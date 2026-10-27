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

$user_id = $_POST['user_id'] ?? "";

if ($user_id == "") {
    echo json_encode([
        "status" => "error",
        "message" => "User ID required"
    ]);
    exit();
}

$safeUserId = mysqli_real_escape_string($conn, $user_id);

// Prevent deleting admin accidentally
$checkQuery = "SELECT * FROM users WHERE id='$safeUserId' LIMIT 1";
$checkResult = mysqli_query($conn, $checkQuery);

if (!$checkResult || mysqli_num_rows($checkResult) == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
    exit();
}

$userData = mysqli_fetch_assoc($checkResult);

if ($userData['role'] === 'admin') {
    echo json_encode([
        "status" => "error",
        "message" => "Admin account cannot be deleted"
    ]);
    exit();
}

// Optional: delete user's saved library records first
mysqli_query($conn, "DELETE FROM saved_library WHERE user_id='$safeUserId'");

// Delete user
$deleteQuery = "DELETE FROM users WHERE id='$safeUserId' LIMIT 1";

if (mysqli_query($conn, $deleteQuery)) {
    echo json_encode([
        "status" => "success",
        "message" => "User deleted successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete user",
        "error" => mysqli_error($conn)
    ]);
}
?>