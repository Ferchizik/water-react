<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Запрос к базе данных для получения типов судов
$sql = "SELECT id, name FROM types_vessel";
$result = mysqli_query($link, $sql);

if ($result) {
    $types = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $types[] = $row;
    }
    echo json_encode($users, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
