<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

$filename = 'coordinates0.txt';
if (!file_exists($filename)) {
    echo json_encode(["error" => "Файл не найден"]);
    exit;
}

$file = fopen($filename, "r");
if ($file === false) {
    echo json_encode(["error" => "Не удалось открыть файл"]);
    exit;
}

$header = fgetcsv($file); // Чтение первой строки с заголовками
if ($header === false || count($header) !== 3 || $header[0] !== 'telephone' || $header[1] !== 'longitude' || $header[2] !== 'latitude') {
    echo json_encode(["error" => "Некорректный формат файла"]);
    fclose($file);
    exit;
}

$updatedRows = 0;

while (($data = fgetcsv($file)) !== false) {
    if (count($data) !== 3) {
        continue; // Пропуск некорректных строк
    }

    $telephone = $data[0];
    $longitude = $data[1];
    $latitude = $data[2];

    $sql = "UPDATE vessels SET `long` = ?, `width` = ? WHERE `telephone` = ?";
    $stmt = mysqli_prepare($link, $sql);
    mysqli_stmt_bind_param($stmt, "dds", $longitude, $latitude, $telephone);

    if (mysqli_stmt_execute($stmt)) {
        $updatedRows += mysqli_stmt_affected_rows($stmt);
    }

    mysqli_stmt_close($stmt);
}

fclose($file);
mysqli_close($link);

echo json_encode(["success" => "Обновлено строк: $updatedRows"]);
?>
