<?php

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "Не указан id пользователя"]);
    exit;
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

$id = mysqli_real_escape_string($link, $_GET['id']);

$sql = "SELECT id, login, name, family, patronymic, post FROM users WHERE id = '$id'";
$result = mysqli_query($link, $sql);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(mysqli_fetch_assoc($result));
    } else {
        echo json_encode(["error" => "Пользователь не найден"]);
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>

