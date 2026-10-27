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
$plant_id = $_POST['plant_id'] ?? "";
$uploaded_image = trim($_POST['uploaded_image'] ?? "");

$plant_name = trim($_POST['plant_name'] ?? "");
$scientific_name = trim($_POST['scientific_name'] ?? "");
$description = trim($_POST['description'] ?? "");
$uses = trim($_POST['uses'] ?? "");
$benefits = trim($_POST['benefits'] ?? "");
$precautions = trim($_POST['precautions'] ?? "");

if ($user_id == "") {
    echo json_encode([
        "status" => "error",
        "message" => "User ID required"
    ]);
    exit();
}

// Sanitize common values
$safeUserId = mysqli_real_escape_string($conn, $user_id);
$safeUploadedImage = mysqli_real_escape_string($conn, $uploaded_image);

// CASE 1: Existing DB plant
if ($plant_id != "") {
    $safePlantId = mysqli_real_escape_string($conn, $plant_id);

    $plantCheck = "SELECT * FROM ayurvedic_plants WHERE id='$safePlantId'";
    $plantResult = mysqli_query($conn, $plantCheck);

    if (!$plantResult || mysqli_num_rows($plantResult) == 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Plant not found in database"
        ]);
        exit();
    }

    $plant_id = $safePlantId;

} else {
    // CASE 2: AI fallback
    if ($plant_name == "") {
        echo json_encode([
            "status" => "error",
            "message" => "Plant name required"
        ]);
        exit();
    }

    $safePlantName = mysqli_real_escape_string($conn, $plant_name);
    $safeScientificName = mysqli_real_escape_string($conn, $scientific_name);
    $safeDescription = mysqli_real_escape_string($conn, $description);
    $safeUses = mysqli_real_escape_string($conn, $uses);
    $safeBenefits = mysqli_real_escape_string($conn, $benefits);
    $safePrecautions = mysqli_real_escape_string($conn, $precautions);

    // Try to find existing plant first
    $findPlantQuery = "SELECT * FROM ayurvedic_plants 
                       WHERE plant_name='$safePlantName' 
                       OR scientific_name='$safeScientificName'
                       LIMIT 1";
    $findPlantResult = mysqli_query($conn, $findPlantQuery);

    if ($findPlantResult && mysqli_num_rows($findPlantResult) > 0) {
        $existingPlant = mysqli_fetch_assoc($findPlantResult);
        $plant_id = $existingPlant['id'];
    } else {
        // Insert new AI identified plant into ayurvedic_plants
        $insertPlantQuery = "INSERT INTO ayurvedic_plants 
            (plant_name, scientific_name, description, uses, benefits, precautions) 
            VALUES 
            ('$safePlantName', '$safeScientificName', '$safeDescription', '$safeUses', '$safeBenefits', '$safePrecautions')";

        if (mysqli_query($conn, $insertPlantQuery)) {
            $plant_id = mysqli_insert_id($conn);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to save plant data",
                "error" => mysqli_error($conn)
            ]);
            exit();
        }
    }
}

// Check duplicate save
$checkQuery = "SELECT * FROM saved_library WHERE user_id='$safeUserId' AND plant_id='$plant_id'";
$checkResult = mysqli_query($conn, $checkQuery);

if ($checkResult && mysqli_num_rows($checkResult) > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Plant already saved in your library"
    ]);
    exit();
}

// Save in library
$insertQuery = "INSERT INTO saved_library (user_id, plant_id, uploaded_image) 
                VALUES ('$safeUserId', '$plant_id', '$safeUploadedImage')";

if (mysqli_query($conn, $insertQuery)) {
    echo json_encode([
        "status" => "success",
        "message" => "Plant saved to library successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save in library",
        "error" => mysqli_error($conn)
    ]);
}
?>