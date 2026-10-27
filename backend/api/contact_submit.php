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

$user_id = isset($data["user_id"]) && $data["user_id"] !== "" ? intval($data["user_id"]) : null;
$name = isset($data["name"]) ? trim($data["name"]) : "";
$email = isset($data["email"]) ? trim($data["email"]) : "";
$phone = isset($data["phone"]) ? trim($data["phone"]) : "";
$issue_type = isset($data["issue_type"]) ? trim($data["issue_type"]) : "";
$subject = isset($data["subject"]) ? trim($data["subject"]) : "";
$message = isset($data["message"]) ? trim($data["message"]) : "";

if (empty($name) || empty($email) || empty($issue_type) || empty($subject) || empty($message)) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email format"
    ]);
    exit;
}

$sql = "INSERT INTO contact_messages (user_id, name, email, phone, issue_type, subject, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . mysqli_error($conn)
    ]);
    exit;
}

mysqli_stmt_bind_param($stmt, "issssss", $user_id, $name, $email, $phone, $issue_type, $subject, $message);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "success" => true,
        "message" => "Your message has been sent successfully!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to send message"
    ]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>