<?php

require 'db_connect.php'; // Подключаем файл для соединения с базой данных

$data = array();

$sql = "
    SELECT 
        v.id AS vessel_id,
        v.name AS vessel_name,
        v.loader AS vessel_loader,
        v.img AS vessel_img,
        v.description AS vessel_description,
        v.telephone AS vessel_telephone,
        v.long AS vessel_long,
        v.width AS vessel_width,
        t.name AS vessel_type,
        t.icon AS vessel_icon,
        v.types_vessels_id AS type_vessels_id,
        f.id AS flight_id,
        CASE
            WHEN f.status_flight_id = 1 THEN 'Запланирован'
            WHEN f.status_flight_id = 2 THEN 'В пути'
            WHEN f.status_flight_id = 3 THEN 'Завершен'
            ELSE 'Не задан'
        END AS flight_status
    FROM 
        vessels v
    JOIN 
        types_vessel t ON v.types_vessels_id = t.id
    LEFT JOIN 
        flight f ON v.id = f.vessels_id
    WHERE
        f.id IS NULL OR
        f.id = (
            SELECT id 
            FROM flight 
            WHERE vessels_id = v.id 
            ORDER BY id DESC 
            LIMIT 1
        )
";

$result = mysqli_query($link, $sql);

if ($result === false) {
    echo json_encode(["error" => "Ошибка выполнения запроса: " . mysqli_error($link)]);
    exit;
}

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

mysqli_close($link);
?>
