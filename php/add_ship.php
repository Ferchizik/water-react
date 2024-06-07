<?php

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Получение данных из POST-запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['shipName'], $input['loader'], $input['img'], $input['description'], $input['telephone'], $input['longitude'], $input['latitude'], $input['vesselType'])) {
    echo json_encode(["error" => "Недостаточно данных для добавления корабля"]);
    exit();
}

$shipName = mysqli_real_escape_string($link, $input['shipName']);
$loader = mysqli_real_escape_string($link, $input['loader']);
$img = mysqli_real_escape_string($link, $input['img']);
$description = mysqli_real_escape_string($link, $input['description']);
$telephone = mysqli_real_escape_string($link, $input['telephone']);
$longitude = floatval($input['longitude']);
$latitude = floatval($input['latitude']);
$vesselType = mysqli_real_escape_string($link, $input['vesselType']);

// Определение ID типа судна на основе имени типа судна
$vesselTypeQuery = "SELECT id FROM types_vessel WHERE name = '$vesselType'";
$vesselTypeResult = mysqli_query($link, $vesselTypeQuery);

if ($vesselTypeResult) {
    $vesselTypeRow = mysqli_fetch_assoc($vesselTypeResult);
    if ($vesselTypeRow) {
        $vesselTypeId = $vesselTypeRow['id'];
    } else {
        echo json_encode(["error" => "Неверный тип судна"]);
        exit();
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit();
}

// SQL-запрос для добавления нового судна
$sql = "
    INSERT INTO vessels (name, loader, img, description, telephone, `long`, `width`, types_vessels_id)
    VALUES ('$shipName', '$loader', 'images/img/$img.jpg', '$description', '$telephone', '$longitude', '$latitude', '$vesselTypeId')
";

if (mysqli_query($link, $sql)) {
    echo json_encode(["success" => "Корабль успешно добавлен"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
