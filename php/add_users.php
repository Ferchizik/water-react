<?php

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Метод не разрешен"]);
    exit();
}

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['login']) || !isset($data['password']) || !isset($data['name']) || !isset($data['family']) || !isset($data['patronymic']) || !isset($data['post'])) {
    echo json_encode(["error" => "Не все обязательные поля указаны"]);
    exit();
}

$login = mysqli_real_escape_string($link, $data['login']);
$password = $data['password'];
$name = mysqli_real_escape_string($link, $data['name']);
$family = mysqli_real_escape_string($link, $data['family']);
$patronymic = mysqli_real_escape_string($link, $data['patronymic']);
$post = mysqli_real_escape_string($link, $data['post']);
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Проверка наличия пользователя с таким логином
$checkQuery = "SELECT id FROM users WHERE login = '$login'";
$checkResult = mysqli_query($link, $checkQuery);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(["error" => "Пользователь с таким логином уже существует"]);
        exit();
    }
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit();
}

$sql = "INSERT INTO users (login, password, name, family, patronymic, post) VALUES ('$login', '$hashed_password', '$name', '$family', '$patronymic', '$post')";
if (mysqli_query($link, $sql)) {
    echo json_encode(["message" => "Пользователь успешно зарегистрирован"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка: " . mysqli_error($link)]);
}
mysqli_close($link);
?>
