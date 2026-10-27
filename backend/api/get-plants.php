<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle OPTIONS request (CORS preflight)
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

// DB connection
include("../config/db.php");

// Fetch all plants from database
$query = "SELECT * FROM ayurvedic_plants ORDER BY id DESC";
$result = mysqli_query($conn, $query);

$plants = [];

// Store all plants into array
while ($row = mysqli_fetch_assoc($result)) {
    $plants[] = $row;
}

// Send response
echo json_encode([
    "status" => "success",
    "plants" => $plants
]);
?>
