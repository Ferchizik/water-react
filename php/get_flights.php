<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Массив для хранения данных из базы данных
$data = array();

// Получаем параметры из запроса
$startDate = $_GET['startDate'] ?? null; // Дата начала
$endDate = $_GET['endDate'] ?? null;     // Дата окончания
$cargoType = $_GET['cargoType'] ?? null; // Тип груза

// Логируем полученные параметры для отладки
error_log("startDate: $startDate, endDate: $endDate, cargoType: $cargoType");

// SQL-запрос для получения данных о рейсах и связанных таблицах
$sql = "
    SELECT 
        f.id AS flight_id,
        f.date_departure,
        f.date_destination,
        p_in.name AS incoming_port,
        p_out.name AS outcoming_port,
        v.name AS vessel_name,
        s.name AS status,
        f.size AS cargo_size,
        tc.name AS cargo_type
    FROM 
        flight f
    JOIN 
        ports p_in ON f.incoming_port_id = p_in.id
    JOIN 
        ports p_out ON f.outcoming_port_id = p_out.id
    JOIN 
        vessels v ON f.vessels_id = v.id
    JOIN 
        status_flight s ON f.status_flight_id = s.id
    JOIN 
        types_cargo tc ON f.cargo_id = tc.id
    WHERE 1=1
";

// Добавляем условия к SQL-запросу, если параметры даты присутствуют
if ($startDate !== null && $endDate !== null) {
    $sql .= " AND f.date_departure BETWEEN '$startDate' AND '$endDate'";
}

// Добавляем условие к SQL-запросу, если параметр типа груза присутствует
if ($cargoType !== null) {
    $sql .= " AND tc.name = '$cargoType'";
}

// Добавляем условие сортировки по дате отправления
$sql .= " ORDER BY f.date_departure ASC";

// Выполняем SQL-запрос
$result = mysqli_query($link, $sql);

// Проверяем успешность выполнения запроса
if (!$result) {
    // В случае ошибки выполнения запроса, возвращаем JSON с сообщением об ошибке
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit; // Прекращаем выполнение скрипта
}

// Обрабатываем результаты запроса, сохраняя их в массиве $data
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

// Закрываем соединение с базой данных
mysqli_close($link);
?>
