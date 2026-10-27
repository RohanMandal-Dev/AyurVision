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

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
include("../config/db.php");

// Get plant id from frontend
$plant_id = $_POST['plant_id'] ?? "";

// Validation
if ($plant_id == "") {
    echo json_encode(["status" => "error", "message" => "Plant ID required"]);
    exit();
}

// Fetch plant image name first
$getQuery = "SELECT image FROM ayurvedic_plants WHERE id='$plant_id'";
$getResult = mysqli_query($conn, $getQuery);

if (!$getResult) {
    echo json_encode(["status" => "error", "message" => "Database query failed"]);
    exit();
}

if (mysqli_num_rows($getResult) == 0) {
    echo json_encode(["status" => "error", "message" => "Plant not found"]);
    exit();
}

// Get image name
$plantData = mysqli_fetch_assoc($getResult);
$imageName = $plantData['image'];

// Delete plant from DB
$deleteQuery = "DELETE FROM ayurvedic_plants WHERE id='$plant_id'";
$deleteResult = mysqli_query($conn, $deleteQuery);

if ($deleteResult) {

    // If plant deleted successfully then delete image file
    if ($imageName != "") {
        $imagePath = dirname(__DIR__) . "/uploads/plants/" . $imageName;

        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }

    echo json_encode(["status" => "success", "message" => "Plant deleted successfully"]);

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to delete plant",
        "error" => mysqli_error($conn)
    ]);
}
?>
