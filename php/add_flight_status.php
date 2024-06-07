<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Получение данных из POST-запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['statusName'])) {
    echo json_encode(["error" => "Недостаточно данных для добавления статуса рейса"]);
    exit;
}

$statusName = mysqli_real_escape_string($link, $input['statusName']);

// Проверка наличия статуса рейса с таким именем
$checkQuery = "SELECT id FROM status_flight WHERE name = '$statusName'";
$checkResult = mysqli_query($link, $checkQuery);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(["error" => "Статус рейса с таким именем уже существует"]);
        exit;
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit;
}

// SQL-запрос для добавления нового статуса рейса
$sql = "INSERT INTO status_flight (name) VALUES ('$statusName')";

if (mysqli_query($link, $sql)) {
    echo json_encode(["success" => "Статус рейса успешно добавлен"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
