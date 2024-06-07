<?php

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// SQL-запрос для получения списка портов
$sql = "SELECT id, name FROM ports";
$result = mysqli_query($link, $sql);

if (!$result) {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit();
}

// Сбор данных в массив
$ports = [];
while ($row = mysqli_fetch_assoc($result)) {
    $ports[] = $row;
}

// Возврат данных в формате JSON
echo json_encode($ports);

mysqli_close($link);
?>
