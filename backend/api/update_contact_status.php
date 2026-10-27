<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$id = isset($data["id"]) ? intval($data["id"]) : 0;
$status = isset($data["status"]) ? trim($data["status"]) : "";

$allowedStatuses = ["new", "read", "resolved"];

if ($id <= 0 || !in_array($status, $allowedStatuses)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid ID or status"
    ]);
    exit;
}

if ($status === "resolved") {
    $sql = "UPDATE contact_messages SET status = ?, resolved_at = NOW() WHERE id = ?";
} else {
    $sql = "UPDATE contact_messages SET status = ? WHERE id = ?";
}

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "si", $status, $id);

if (mysqli_stmt_execute($stmt)) {
    $messageText = $status === "resolved"
        ? "Issue marked as resolved successfully"
        : "Status updated successfully";

    echo json_encode([
        "success" => true,
        "message" => $messageText
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update status"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>