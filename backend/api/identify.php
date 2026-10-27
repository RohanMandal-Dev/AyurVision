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

// ============================
// API KEYS
// ============================

// Load API credentials from the private configuration file
require_once __DIR__ . '/../config/secrets.php';

// ============================
// HELPER: DEBUG LOG
// ============================
function debugLog($message, $data = null)
{
    if ($data !== null) {
        error_log($message . " => " . print_r($data, true));
    } else {
        error_log($message);
    }
}

// ============================
// HELPER: NORMALIZE NAMES
// ============================
function normalizePlantName($name)
{
    $name = strtolower(trim($name));

    // remove text inside brackets like (L.)
    $name = preg_replace('/\([^)]*\)/', '', $name);

    // remove special chars, dots, commas
    $name = preg_replace('/[^a-z0-9\s]/', '', $name);

    // remove extra spaces
    $name = preg_replace('/\s+/', ' ', $name);

    return trim($name);
}

// ============================
// Plant.id API
// ============================
function identifyWithPlantId($imagePath, $apiKey)
{
    if (empty($apiKey) || $apiKey === "YOUR_PLANT_ID_API_KEY") {
        debugLog("Plant.id skipped: API key missing");
        return null;
    }

    $imageBase64 = base64_encode(file_get_contents($imagePath));
    $url = "https://api.plant.id/v2/identify";

    $data = [
        "api_key" => $apiKey,
        "images" => [$imageBase64],
        "modifiers" => ["crops_fast", "similar_images"],
        "plant_language" => "en",
        "plant_details" => ["common_names", "url", "wiki_description", "taxonomy"]
    ];

    $payload = json_encode($data);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);

    if (curl_errno($ch)) {
        debugLog("Plant.id cURL error", $curlError);
        curl_close($ch);
        return null;
    }

    curl_close($ch);

    debugLog("Plant.id HTTP Code", $httpCode);

    $result = json_decode($response, true);

    if (!isset($result['suggestions'][0])) {
        debugLog("Plant.id: No suggestions found", $result);
        return null;
    }

    $bestPlant = $result['suggestions'][0];

    $plantName = $bestPlant['plant_name'] ?? "";
    $probability = isset($bestPlant['probability']) ? round($bestPlant['probability'] * 100, 2) : 0;
    $scientificName = $bestPlant['plant_details']['taxonomy']['scientific_name'] ?? $plantName;
    $wikiDesc = $bestPlant['plant_details']['wiki_description']['value'] ?? "No description found";
    $commonNames = $bestPlant['plant_details']['common_names'] ?? [];

    return [
        "source" => "Plant.id",
        "plant_name" => $plantName,
        "scientific_name" => $scientificName,
        "probability" => $probability,
        "wiki_description" => $wikiDesc,
        "common_names" => $commonNames,
        "raw" => $bestPlant
    ];
}

// ============================
// Pl@ntNet API
// ============================
function identifyWithPlantNet($imagePath, $apiKey)
{
    if (
        empty($apiKey) ||
        $apiKey === "YOUR_REAL_PLANTNET_API_KEY" ||
        $apiKey === "YOUR_PLANTNET_API_KEY"
    ) {
        debugLog("Pl@ntNet skipped: API key missing or placeholder");
        return null;
    }

    $url = "https://my-api.plantnet.org/v2/identify/all?api-key=" . urlencode($apiKey);

    $mimeType = mime_content_type($imagePath);
    $fileName = basename($imagePath);

    $postFields = [
        'images' => new CURLFile($imagePath, $mimeType, $fileName),
        'organs' => 'auto'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);

    if (curl_errno($ch)) {
        debugLog("Pl@ntNet cURL error", $curlError);
        curl_close($ch);
        return null;
    }

    curl_close($ch);

    debugLog("Pl@ntNet HTTP Code", $httpCode);

    $result = json_decode($response, true);

    if (!isset($result['results'][0])) {
        debugLog("Pl@ntNet: No results found", $result);
        return null;
    }

    $top = $result['results'][0];

    $plantName = $top['species']['commonNames'][0] ?? ($top['species']['scientificNameWithoutAuthor'] ?? "Unknown");
    $scientificName = $top['species']['scientificNameWithoutAuthor'] ?? $plantName;
    $probability = isset($top['score']) ? round($top['score'] * 100, 2) : 0;
    $commonNames = $top['species']['commonNames'] ?? [];

    return [
        "source" => "Pl@ntNet",
        "plant_name" => $plantName,
        "scientific_name" => $scientificName,
        "probability" => $probability,
        "wiki_description" => "Description not available.",
        "common_names" => $commonNames,
        "raw" => $top
    ];
}

// ============================
// Choose Best Result
// ============================
function chooseBestResult($plantIdResult, $plantNetResult)
{
    if ($plantIdResult && $plantNetResult) {
        return ($plantNetResult['probability'] > $plantIdResult['probability']) ? $plantNetResult : $plantIdResult;
    }

    if ($plantIdResult) return $plantIdResult;
    if ($plantNetResult) return $plantNetResult;

    return null;
}

// ============================
// Trefle API
// ============================
function getTrefleData($query, $apiKey)
{
    if (empty($apiKey) || $apiKey === "YOUR_TREFLE_API_KEY" || empty($query)) {
        debugLog("Trefle skipped: missing key or query");
        return null;
    }

    $url = "https://trefle.io/api/v1/plants/search?token=" . urlencode($apiKey) . "&q=" . urlencode($query);

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);

    if (curl_errno($ch)) {
        debugLog("Trefle cURL error", $curlError);
        curl_close($ch);
        return null;
    }

    curl_close($ch);

    debugLog("Trefle HTTP Code", $httpCode);

    $result = json_decode($response, true);

    if (!isset($result['data'][0])) {
        debugLog("Trefle: No data found", $result);
        return null;
    }

    $plant = $result['data'][0];

    return [
        "common_name" => $plant['common_name'] ?? "N/A",
        "scientific_name" => $plant['scientific_name'] ?? "N/A",
        "family" => $plant['family_common_name'] ?? ($plant['family'] ?? "N/A"),
        "image_url" => $plant['image_url'] ?? null,
        "year" => $plant['year'] ?? "N/A",
        "author" => $plant['author'] ?? "N/A",
        "bibliography" => $plant['bibliography'] ?? "N/A"
    ];
}

// ============================
// CHECK IMAGE
// ============================
if (!isset($_FILES['image'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Image required"
    ]);
    exit();
}

// ============================
// CREATE UPLOAD FOLDER
// ============================
$uploadDir = "../uploads/identified/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// ============================
// SAVE UPLOADED IMAGE
// ============================
$originalName = basename($_FILES['image']['name']);
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
if (!in_array($extension, $allowedExtensions)) {
    echo json_encode([
        "status" => "error",
        "message" => "Only JPG, JPEG, PNG, WEBP images are allowed"
    ]);
    exit();
}

$newFileName = time() . "_" . rand(1000, 9999) . "." . $extension;
$serverFilePath = $uploadDir . $newFileName;
$uploadedImagePath = "uploads/identified/" . $newFileName;

if (!move_uploaded_file($_FILES['image']['tmp_name'], $serverFilePath)) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save uploaded image"
    ]);
    exit();
}

// ============================
// RUN IDENTIFICATION APIs
// ============================
$plantIdResult = identifyWithPlantId($serverFilePath, $PLANT_ID_API_KEY);
$plantNetResult = identifyWithPlantNet($serverFilePath, $PLANTNET_API_KEY);

// Choose best result
$bestResult = chooseBestResult($plantIdResult, $plantNetResult);

// Fallback if both fail
if (!$bestResult) {
    echo json_encode([
        "status" => "error",
        "message" => "No plant detected from APIs",
        "debug" => [
            "plant_id" => $plantIdResult ? "success" : "failed",
            "plantnet" => $plantNetResult ? "success" : "failed"
        ]
    ]);
    exit();
}

// ============================
// EXTRACT BEST RESULT VALUES
// ============================
$plantNameRaw = $bestResult['plant_name'] ?? "";
$scientificNameRaw = $bestResult['scientific_name'] ?? $plantNameRaw;
$probability = $bestResult['probability'] ?? 0;
$wikiDesc = $bestResult['wiki_description'] ?? "No description found";
$commonNames = $bestResult['common_names'] ?? [];

// ============================
// GET TREFLE DATA + RELEVANCE CHECK
// ============================
$trefleSearchName = !empty($scientificNameRaw) ? $scientificNameRaw : $plantNameRaw;
$trefleData = getTrefleData($trefleSearchName, $TREFLE_API_KEY);

if ($trefleData) {
    $identifiedScientific = strtolower(trim($scientificNameRaw));
    $identifiedPlant = strtolower(trim($plantNameRaw));

    $trefleScientific = strtolower(trim($trefleData['scientific_name'] ?? ""));
    $trefleCommon = strtolower(trim($trefleData['common_name'] ?? ""));

    $isRelevant = false;

    // scientific match
    if (
        !empty($identifiedScientific) &&
        !empty($trefleScientific) &&
        (
            strpos($trefleScientific, $identifiedScientific) !== false ||
            strpos($identifiedScientific, $trefleScientific) !== false
        )
    ) {
        $isRelevant = true;
    }

    // common match
    if (
        !$isRelevant &&
        !empty($identifiedPlant) &&
        !empty($trefleCommon) &&
        (
            strpos($trefleCommon, $identifiedPlant) !== false ||
            strpos($identifiedPlant, $trefleCommon) !== false
        )
    ) {
        $isRelevant = true;
    }

    if (!$isRelevant) {
        $trefleData = null;
    }
}

// ============================
// SMART DB MATCHING
// ============================
$normalizedPlantName = normalizePlantName($plantNameRaw);
$normalizedScientificName = normalizePlantName($scientificNameRaw);

$dbQuery = "SELECT * FROM ayurvedic_plants";
$dbResult = mysqli_query($conn, $dbQuery);

$matchedPlants = [];

if ($dbResult && mysqli_num_rows($dbResult) > 0) {
    while ($row = mysqli_fetch_assoc($dbResult)) {
        $dbPlantName = normalizePlantName($row['plant_name'] ?? '');
        $dbScientificName = normalizePlantName($row['scientific_name'] ?? '');

        $isMatch = false;

        // 1) Match identified plant name inside DB fields
        if (!empty($normalizedPlantName)) {
            if (
                strpos($dbPlantName, $normalizedPlantName) !== false ||
                strpos($dbScientificName, $normalizedPlantName) !== false ||
                strpos($normalizedPlantName, $dbPlantName) !== false ||
                strpos($normalizedPlantName, $dbScientificName) !== false
            ) {
                $isMatch = true;
            }
        }

        // 2) Match identified scientific name inside DB fields
        if (!$isMatch && !empty($normalizedScientificName)) {
            if (
                strpos($dbPlantName, $normalizedScientificName) !== false ||
                strpos($dbScientificName, $normalizedScientificName) !== false ||
                strpos($normalizedScientificName, $dbPlantName) !== false ||
                strpos($normalizedScientificName, $dbScientificName) !== false
            ) {
                $isMatch = true;
            }
        }

        // 3) Match API common names also
        if (!$isMatch && !empty($commonNames)) {
            foreach ($commonNames as $commonName) {
                $normalizedCommon = normalizePlantName($commonName);

                if (
                    strpos($dbPlantName, $normalizedCommon) !== false ||
                    strpos($dbScientificName, $normalizedCommon) !== false ||
                    strpos($normalizedCommon, $dbPlantName) !== false ||
                    strpos($normalizedCommon, $dbScientificName) !== false
                ) {
                    $isMatch = true;
                    break;
                }
            }
        }

        if ($isMatch) {
            $matchedPlants[] = $row;
        }
    }
}

// Keep only top 3 matches
$matchedPlants = array_slice($matchedPlants, 0, 3);

// Single best plant for current frontend compatibility
$bestDbPlant = !empty($matchedPlants) ? $matchedPlants[0] : null;

// ============================
// RESPONSE
// ============================
if (!empty($matchedPlants)) {
    echo json_encode([
        "status" => "success",
        "type" => "ayurvedic",
        "probability" => $probability,
        "uploaded_image" => $uploadedImagePath,
        "plant" => $bestDbPlant,              // for current Result.jsx
        "matched_plants" => $matchedPlants,   // for future top 3 UI
        "api_data" => [
            "source" => $bestResult['source'],
            "plant_name" => $plantNameRaw,
            "scientific_name" => $scientificNameRaw,
            "wiki_description" => $wikiDesc,
            "common_names" => $commonNames
        ],
        "all_api_results" => [
            "plant_id" => $plantIdResult,
            "plantnet" => $plantNetResult
        ],
        "trefle_data" => $trefleData
    ]);
} else {
    echo json_encode([
        "status" => "success",
        "type" => "non_ayurvedic",
        "probability" => $probability,
        "uploaded_image" => $uploadedImagePath,
        "plant" => null,
        "matched_plants" => [],
        "api_data" => [
            "source" => $bestResult['source'],
            "plant_name" => $plantNameRaw,
            "scientific_name" => $scientificNameRaw,
            "wiki_description" => $wikiDesc,
            "common_names" => $commonNames
        ],
        "all_api_results" => [
            "plant_id" => $plantIdResult,
            "plantnet" => $plantNetResult
        ],
        "trefle_data" => $trefleData
    ]);
}
?>