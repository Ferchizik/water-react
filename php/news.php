<?php
require 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $created_at = $_POST['created_at'];

    $stmt = $link->prepare("INSERT INTO news (title, content, created_at) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $created_at);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
} else {
    $result = $link->query("SELECT * FROM news ORDER BY created_at DESC");
    $news = [];

    while ($row = $result->fetch_assoc()) {
        $news[] = $row;
    }

    echo json_encode($news, JSON_UNESCAPED_UNICODE);
}

$link->close();
?>
