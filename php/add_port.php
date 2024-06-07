<?php

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Получение данных из POST-запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['portName'])) {
    echo json_encode(["error" => "Недостаточно данных для добавления порта"]);
    exit();
}

$portName = mysqli_real_escape_string($link, $input['portName']);

// Проверка наличия порта с таким именем
$checkQuery = "SELECT id FROM ports WHERE name = '$portName'";
$checkResult = mysqli_query($link, $checkQuery);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(["error" => "Порт с таким именем уже существует"]);
        exit();
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit();
}

// SQL-запрос для добавления нового порта
$sql = "
    INSERT INTO ports (name)
    VALUES ('$portName')
";

if (mysqli_query($link, $sql)) {
    echo json_encode(["success" => "Порт успешно добавлен"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
