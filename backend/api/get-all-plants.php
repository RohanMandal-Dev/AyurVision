<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

// Fetch all plants from database
$query = "SELECT * FROM ayurvedic_plants ORDER BY plant_name ASC";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch plants",
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