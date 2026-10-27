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

include("../config/db.php");

// Get form data safely
$plant_name = $_POST['plant_name'] ?? "";
$scientific_name = $_POST['scientific_name'] ?? "";
$description = $_POST['description'] ?? "";
$uses = $_POST['uses'] ?? "";
$benefits = $_POST['benefits'] ?? "";
$precautions = $_POST['precautions'] ?? "";

// Validation
if ($plant_name == "" || $description == "") {
    echo json_encode(["status" => "error", "message" => "Plant name and description required"]);
    exit();
}

// Image upload
$imageName = "";

// Check if file uploaded
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {

    $image = $_FILES['image'];

    // Unique image name
    $imageName = time() . "_" . basename($image['name']);

    // Absolute upload folder path
    $uploadFolder = dirname(__DIR__) . "/uploads/plants/";

    // Create folder if not exists
    if (!file_exists($uploadFolder)) {
        mkdir($uploadFolder, 0777, true);
    }

    // Final upload path
    $uploadPath = $uploadFolder . $imageName;

    // Move uploaded file
    if (!move_uploaded_file($image['tmp_name'], $uploadPath)) {
        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
        exit();
    }
}

// Insert plant data into DB
$query = "INSERT INTO ayurvedic_plants 
(plant_name, scientific_name, description, uses, benefits, precautions, image)
VALUES
('$plant_name', '$scientific_name', '$description', '$uses', '$benefits', '$precautions', '$imageName')";

if (mysqli_query($conn, $query)) {
    echo json_encode(["status" => "success", "message" => "Plant added successfully"]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database insert failed",
        "error" => mysqli_error($conn)
    ]);
}
?>
