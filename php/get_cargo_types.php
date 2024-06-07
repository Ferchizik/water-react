<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// SQL-запрос для получения данных из таблицы types_cargo
$sql = "SELECT id, name FROM types_cargo";
$result = mysqli_query($link, $sql);

$cargoTypes = array();

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $cargoTypes[] = $row;
        }
    } else {
        echo json_encode(array("error" => "No cargo types found"));
        exit;
    }
} else {
    echo json_encode(array("error" => "Ошибка выполнения запроса: " . mysqli_error($link)));
    exit;
}

echo json_encode($cargoTypes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

// Закрываем соединение с базой данных
mysqli_close($link);

?>
