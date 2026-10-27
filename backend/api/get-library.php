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

$query = "SELECT 
            saved_library.id AS saved_id,
            saved_library.uploaded_image,
            ayurvedic_plants.id,
            ayurvedic_plants.plant_name,
            ayurvedic_plants.scientific_name,
            ayurvedic_plants.description,
            ayurvedic_plants.uses,
            ayurvedic_plants.benefits,
            ayurvedic_plants.precautions,
            ayurvedic_plants.image
          FROM saved_library
          INNER JOIN ayurvedic_plants 
            ON saved_library.plant_id = ayurvedic_plants.id
          WHERE saved_library.user_id='$user_id'
          ORDER BY saved_library.id DESC";

$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch library",
        "error" => mysqli_error($conn)
    ]);
    exit();
}

$plants = [];

while ($row = mysqli_fetch_assoc($result)) {
    $plants[] = $row;
}

echo json_encode([
    "status" => "success",
    "plants" => $plants
]);
?>