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

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

// Get data
$plant_id = $_POST['plant_id'] ?? "";
$plant_name = $_POST['plant_name'] ?? "";
$scientific_name = $_POST['scientific_name'] ?? "";
$description = $_POST['description'] ?? "";
$uses = $_POST['uses'] ?? "";
$benefits = $_POST['benefits'] ?? "";
$precautions = $_POST['precautions'] ?? "";

// Validation
if ($plant_id == "" || $plant_name == "" || $description == "") {
    echo json_encode(["status" => "error", "message" => "Plant ID, Name, and Description required"]);
    exit();
}

// Fetch old image
$getQuery = "SELECT image FROM ayurvedic_plants WHERE id='$plant_id'";
$getResult = mysqli_query($conn, $getQuery);
$oldImage = "";

if (mysqli_num_rows($getResult) > 0) {
    $row = mysqli_fetch_assoc($getResult);
    $oldImage = $row['image'];
}

// Default image stays same
$imageName = $oldImage;

// If new image uploaded, update it
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {

    $image = $_FILES['image'];
    $imageName = time() . "_" . basename($image['name']);

    $uploadFolder = dirname(__DIR__) . "/uploads/plants/";

    if (!file_exists($uploadFolder)) {
        mkdir($uploadFolder, 0777, true);
    }

    $uploadPath = $uploadFolder . $imageName;

    if (move_uploaded_file($image['tmp_name'], $uploadPath)) {

        // Delete old image
        if ($oldImage != "") {
            $oldPath = $uploadFolder . $oldImage;

            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Image upload failed"]);
        exit();
    }
}

// Update query
$updateQuery = "UPDATE ayurvedic_plants SET 
plant_name='$plant_name',
scientific_name='$scientific_name',
description='$description',
uses='$uses',
benefits='$benefits',
precautions='$precautions',
image='$imageName'
WHERE id='$plant_id'";

if (mysqli_query($conn, $updateQuery)) {
    echo json_encode(["status" => "success", "message" => "Plant updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Update failed"]);
}
?>
