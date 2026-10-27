<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

include "../config/db.php";

$sql = "SELECT id, user_id, name, email, phone, issue_type, subject, message, status, admin_reply, reply_updated_at, resolved_at, created_at 
        FROM contact_messages
        ORDER BY created_at DESC";

$result = mysqli_query($conn, $sql);

$messages = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $messages[] = $row;
    }

    echo json_encode([
        "success" => true,
        "messages" => $messages
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch messages"
    ]);
}

mysqli_close($conn);
?>