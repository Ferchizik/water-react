<?php

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Получение данных из POST-запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['vesselTypeName'], $input['icon'])) {
    echo json_encode(["error" => "Недостаточно данных для добавления типа судна"]);
    exit();
}

$vesselTypeName = mysqli_real_escape_string($link, $input['vesselTypeName']);
$iconName = mysqli_real_escape_string($link, $input['icon']);

// Формирование полного пути к иконке
$iconPath = 'images/icons/' . $iconName . '.jpg';

// Проверка наличия типа судна с таким именем
$checkQuery = "SELECT id FROM types_vessel WHERE name = '$vesselTypeName'";
$checkResult = mysqli_query($link, $checkQuery);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(["error" => "Тип судна с таким именем уже существует"]);
        exit();
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit();
}

// SQL-запрос для добавления нового типа судна
$sql = "INSERT INTO types_vessel (name, icon) VALUES ('$vesselTypeName', '$iconPath')";

if (mysqli_query($link, $sql)) {
    echo json_encode(["success" => "Тип судна успешно добавлен"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
