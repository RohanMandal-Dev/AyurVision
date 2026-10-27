<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle OPTIONS request (CORS preflight)
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

// DB connection
include("../config/db.php");

// Get plant id from frontend
$plant_id = $_POST['plant_id'] ?? "";

// Validation
if ($plant_id == "") {
    echo json_encode(["status" => "error", "message" => "Plant ID required"]);
    exit();
}

// Fetch plant from database
$query = "SELECT * FROM ayurvedic_plants WHERE id='$plant_id'";
$result = mysqli_query($conn, $query);

// If plant exists
if (mysqli_num_rows($result) > 0) {
    $plant = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => "success",
        "plant" => $plant
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Plant not found"]);
}
?>
