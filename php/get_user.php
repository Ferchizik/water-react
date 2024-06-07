<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

$sql = "SELECT id, login, name FROM users";
$result = mysqli_query($link, $sql);

if ($result) {
    $users = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
