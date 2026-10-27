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
$admin_reply = isset($data["admin_reply"]) ? trim($data["admin_reply"]) : "";

if ($id <= 0 || empty($admin_reply)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid message ID or empty reply"
    ]);
    exit;
}

$sql = "UPDATE contact_messages 
        SET admin_reply = ?, reply_updated_at = NOW() 
        WHERE id = ?";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "si", $admin_reply, $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Reply sent to user successfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to send reply"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>