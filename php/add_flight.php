<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

// Получение данных из POST-запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['date_departure'], $input['incoming_port_id'], $input['outcoming_port_id'], $input['vessels_id'], $input['status_flight_id'], $input['cargo_id'], $input['size'])) {
    echo json_encode(["error" => "Недостаточно данных для добавления рейса"]);
    exit;
}

$dateDeparture = mysqli_real_escape_string($link, $input['date_departure']);
$dateDestination = isset($input['date_destination']) ? mysqli_real_escape_string($link, $input['date_destination']) : null;
$incomingPortId = intval($input['incoming_port_id']);
$outcomingPortId = intval($input['outcoming_port_id']);
$vesselsId = intval($input['vessels_id']);
$statusFlightId = intval($input['status_flight_id']);
$cargoId = intval($input['cargo_id']);
$size = floatval($input['size']);

// SQL-запрос для добавления нового рейса
$sql = "
    INSERT INTO flight (date_departure, date_destination, incoming_port_id, outcoming_port_id, vessels_id, status_flight_id, cargo_id, size)
    VALUES ('$dateDeparture', " . ($dateDestination ? "'$dateDestination'" : "NULL") . ", '$incomingPortId', '$outcomingPortId', '$vesselsId', '$statusFlightId', '$cargoId', '$size')
";

if (mysqli_query($link, $sql)) {
    echo json_encode(["success" => "Рейс успешно добавлен"], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
