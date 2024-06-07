<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

$sql = "SELECT id, name FROM ports";
$result = mysqli_query($link, $sql);

if (!$result) {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit;
}

$ports = [];
while ($row = mysqli_fetch_assoc($result)) {
    $ports[] = $row;
}

echo json_encode($ports, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

mysqli_close($link);
?>
