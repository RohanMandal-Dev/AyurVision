<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

// Get saved_id
$saved_id = $_POST['saved_id'] ?? "";

// Validation
if ($saved_id == "") {
    echo json_encode([
        "status" => "error",
        "message" => "Saved ID required"
    ]);
    exit();
}

$query = "DELETE FROM saved_library WHERE id='$saved_id'";

if (mysqli_query($conn, $query)) {
    echo json_encode([
        "status" => "success",
        "message" => "Removed from library"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to remove",
        "error" => mysqli_error($conn)
    ]);
}
?>