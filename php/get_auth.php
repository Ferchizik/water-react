<?php
// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Подключение необходимых файлов
require_once __DIR__ . '/src/JWT.php';
require_once __DIR__ . '/vendor/firebase/php-jwt/src/JWT.php';
require_once __DIR__ . '/vendor/firebase/php-jwt/src/Key.php';
require 'db_connect.php'; // Подключаем файл для соединения с базой данных

use App\JWT;

// Получаем данные из тела запроса
$data = json_decode(file_get_contents("php://input"), true);

// Проверяем наличие логина и пароля в запросе
if (!isset($data['login']) || !isset($data['password'])) {
    echo json_encode(["error" => "Не указаны логин или пароль"]);
    exit;
}

// Получаем логин и пароль из запроса
$login = mysqli_real_escape_string($link, $data['login']);
$password = $data['password'];

// Запрос к базе данных для получения пользователя с указанным логином
$sql = "SELECT id, name, family, patronymic, post, login, password FROM users WHERE login = '$login'";
$result = mysqli_query($link, $sql);

if (!$result) {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit;
}

// Проверка наличия пользователя с указанным логином
if (mysqli_num_rows($result) == 0) {
    echo json_encode(["error" => "Пользователь с таким логином не найден"]);
    exit;
}

// Получаем данные пользователя из результата запроса
$user = mysqli_fetch_assoc($result);

// Проверяем совпадение паролей
if (password_verify($password, $user['password'])) {
    // Если пароли совпадают, генерируем JWT токен
    $secret_key = "water";
    $jwt = new JWT($secret_key);
    $token = $jwt->generateToken([
        "id" => $user['id'],
        "name" => $user['name'],
        "family" => $user['family'],
        "patronymic" => $user['patronymic'],
        "post" => $user['post'],
        "login" => $user['login'],      
    ]);

    // Отправляем успешный ответ с JWT токеном и дополнительными данными
    http_response_code(200);
    echo json_encode(
        array(
            "message" => "Успешный вход в систему.",
            "jwt" => $token,
            "name" => $user['name'],
            "family" => $user['family'],
            "patronymic" => $user['patronymic'],
            "post" => $user['post'],
            "expireAt" => time() + 3600
        )
    );
} else {
    // Если пароли не совпадают, возвращаем ошибку
    http_response_code(401);
    echo json_encode(["error" => "Неверный пароль"]);
}

// Закрываем соединение с базой данных
mysqli_close($link);
?>
