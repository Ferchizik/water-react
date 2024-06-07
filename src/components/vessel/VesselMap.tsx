// src/components/VesselMap.tsx

import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
// Импортируем необходимые библиотеки и хуки из React и Yandex Maps

import { YMaps, Map, Placemark, Clusterer, Button } from '@pbe/react-yandex-maps';
// Импортируем компоненты для работы с картами Яндекса

interface Vessel {
    vessel_id: string;
    vessel_name: string;
    vessel_loader: string;
    vessel_img: string;
    vessel_description: string;
    vessel_telephone: string;
    vessel_long: string;
    vessel_width: string;
    vessel_type: string;
    vessel_icon: string;
    flight_id: string | null; // ID рейса или null, если рейс не задан
    flight_status: string; // Статус рейса
}
// Определяем интерфейс для объекта судна

const VesselMap = forwardRef((props, ref) => {
    const [vessels, setVessels] = useState<Vessel[]>([]);
    // Состояние для хранения данных о судах

    const [map, setMap] = useState<any>(null);
    // Состояние для хранения ссылки на карту

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    // Состояние для хранения выбранных типов судов

    const loadVessels = () => {
        const token = localStorage.getItem('jwt');
        // Получаем токен из localStorage

        if (!token) {
            console.log('Токен отсутствует');
            return;
        }
        // Проверяем наличие токена

        fetch('https://water-react.ru/php/get_vessels.php')
            .then((response) => response.json())
            .then((data) => {
                setVessels(data);
            })
            .catch(error => console.error('Ошибка загрузки данных:', error));
        // Запрашиваем данные о судах с сервера и сохраняем их в состоянии
    };

    useImperativeHandle(ref, () => ({
        loadVessels
    }));
    // Предоставляем метод loadVessels для родительских компонентов

    useEffect(() => {
        loadVessels();
    }, []);
    // Загружаем данные о судах при монтировании компонента

    const handleMapClick = () => {
        if (map) {
            map.balloon.close();
        }
    };
    // Закрываем балун на карте при клике

    const handleTypeClick = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };
    // Обрабатываем выбор типов судов

    return (
        <YMaps query={{ apikey: '5fba5e4e-bb75-489a-aaab-e79e8a511f1d', lang: 'ru_RU' }}>
            <div className="map-wrapper" style={{ width: '100%', height: '100%' }}>
                <Map
                    defaultState={{ center: [55, 83], zoom: 10 }}
                    width="100%"
                    height="100%"
                    instanceRef={(ref) => setMap(ref)}
                    onClick={handleMapClick}
                >
                    {/* Компонент карты Яндекса с заданными параметрами */}

                    <Button
                        options={{ maxWidth: 128 }}
                        data={{ content: "Сухогруз" }}
                        defaultState={{ selected: false }}
                        onClick={() => handleTypeClick('Сухогруз')}
                        className={selectedTypes.includes('Сухогруз') ? 'selected' : ''}
                    />
                    {/* Кнопка для выбора типа судов "Сухогруз" */}

                    <Button
                        options={{ maxWidth: 128 }}
                        data={{ content: "Танкер" }}
                        defaultState={{ selected: false }}
                        onClick={() => handleTypeClick('Танкер')}
                        className={selectedTypes.includes('Танкер') ? 'selected' : ''}
                    />
                    {/* Кнопка для выбора типа судов "Танкер" */}

                    <Button
                        options={{ maxWidth: 128 }}
                        data={{ content: "Буксир-Толкач" }}
                        defaultState={{ selected: false }}
                        onClick={() => handleTypeClick('Буксир-Толкач')}
                        className={selectedTypes.includes('Буксир-Толкач') ? 'selected' : ''}
                    />
                    {/* Кнопка для выбора типа судов "Буксир-Толкач" */}

                    <Button
                        options={{ maxWidth: 128 }}
                        data={{ content: "Контейнеровоз" }}
                        defaultState={{ selected: false }}
                        onClick={() => handleTypeClick('Контейнеровоз')}
                        className={selectedTypes.includes('Контейнеровоз') ? 'selected' : ''}
                    />
                    {/* Кнопка для выбора типа судов "Контейнеровоз" */}

                    <Clusterer options={{ preset: 'islands#invertedVioletClusterIcons' }}>
                        {Array.isArray(vessels) && vessels
                            .filter(vessel => selectedTypes.includes(vessel.vessel_type))
                            .map((vessel) => {
                                const long = parseFloat(vessel.vessel_long);
                                const width = parseFloat(vessel.vessel_width);
                                if (isNaN(long) || isNaN(width)) {
                                    console.error(`Неверные координаты для судна ${vessel.vessel_name}: ${vessel.vessel_long}, ${vessel.vessel_width}`);
                                    return null;
                                }
                                return (
                                    <Placemark
                                        key={vessel.vessel_id}
                                        geometry={[long, width]}
                                        properties={{
                                            hintContent: vessel.vessel_name,
                                            balloonContentHeader: vessel.vessel_name,
                                            balloonContentBody: `
                                                <div class="customBalloonContent">
                                                    <img src="${vessel.vessel_img}" alt="${vessel.vessel_name}" style="width: 200px;" /><br/>
                                                    ${vessel.vessel_description}<br/>
                                                    <a href="tel:${vessel.vessel_telephone}">${vessel.vessel_telephone}</a><br/>
                                                    ${vessel.flight_status !== 'Не задан' ? `<strong>Рейс ID:</strong> ${vessel.flight_id}` : ''}<br />
                                                    <strong>Статус рейса:</strong> ${vessel.flight_status !== 'Не задан' ? vessel.flight_status : 'Рейс не задан'}
                                                </div>
                                            `
                                        }}
                                        options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: vessel.vessel_icon,
                                            iconImageSize: [50, 50],
                                            iconImageOffset: [-25, -50],
                                            hideIconOnBalloonOpen: false,
                                            balloonOffset: [0, -50]
                                        }}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                    />
                                );
                            })}
                    </Clusterer>
                    {/* Кластер для объединения меток судов на карте */}

                </Map>
            </div>
        </YMaps>
    );
});

export default VesselMap;
// Экспортируем компонент VesselMap по умолчанию
