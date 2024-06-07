<?php
// db_connect.php

header('Content-Type: text/html; charset=UTF-8');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Подключаемся к базе данных MySQL
$link = mysqli_connect("localhost", "u2665893_default", "iuk40GVxN0NRov3J", "u2665893_default");

// Проверяем успешность подключения к базе данных
if ($link == false) {
    // В случае ошибки подключения, возвращаем JSON с сообщением об ошибке
    echo json_encode(["error" => "Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error()]);
    exit; // Прекращаем выполнение скрипта
}

// Установка кодировки соединения на utf8mb4
mysqli_set_charset($link, "utf8mb4");
?>
