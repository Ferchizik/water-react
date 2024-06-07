<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Получение данных из POST-запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['cargoTypeName'])) {
    echo json_encode(["error" => "Недостаточно данных для добавления типа груза"]);
    exit;
}

$cargoTypeName = mysqli_real_escape_string($link, $input['cargoTypeName']);

// Проверка наличия типа груза с таким именем
$checkQuery = "SELECT id FROM types_cargo WHERE name = '$cargoTypeName'";
$checkResult = mysqli_query($link, $checkQuery);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(["error" => "Тип груза с таким именем уже существует"]);
        exit;
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit;
}

// SQL-запрос для добавления нового типа груза
$sql = "INSERT INTO types_cargo (name) VALUES ('$cargoTypeName')";

if (mysqli_query($link, $sql)) {
    echo json_encode(["success" => "Тип груза успешно добавлен"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
