<?php

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Метод не разрешен"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['telephone']) || !isset($data['longitude']) || !isset($data['latitude'])) {
    echo json_encode(["error" => "Некорректные данные"]);
    exit();
}

$telephone = mysqli_real_escape_string($link, $data['telephone']);
$longitude = floatval($data['longitude']);
$latitude = floatval($data['latitude']);

$sql = "UPDATE vessels SET `long` = ?, `width` = ? WHERE `telephone` = ?";
$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "dds", $longitude, $latitude, $telephone);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => "Координаты обновлены"]);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_stmt_error($stmt)]);
}

mysqli_stmt_close($stmt);
mysqli_close($link);
?>
