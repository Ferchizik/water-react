// src/pages/PageMap.tsx

import React from "react";
// Импортируем React для создания компонентов
import VesselMap from "../components/vessel/VesselMap";
// Импортируем компонент VesselMap для отображения карты судов
import NavMenu from "../components/NavMenu";
// Импортируем компонент NavMenu для отображения навигационного меню
import LoadFromFile from "../components/LoadFromFile";
// Импортируем компонент LoadFromFile для загрузки данных из файла

function PageMap() {
    const mapRef = React.useRef<any>(null);
    // Создаем ссылку на компонент VesselMap

    const handleLoad = () => {
        if (mapRef.current) {
            mapRef.current.loadVessels();
        }
    };
    // Определяем функцию для загрузки данных о судах, используя метод из компонента VesselMap

    return (
        <div className="App">
            <header className="header">
                <h1>Карта речных судов</h1>
                <NavMenu />
            </header>
            {/* Заголовок страницы и навигационное меню */}

            <div className="container">
                <div className="nav_panel_left">
                    {/* <AddShip /> */}
                    <LoadFromFile onLoad={handleLoad} />
                </div>
                {/* Левая панель с компонентом LoadFromFile для загрузки данных */}

                <div className='main'>
                    <VesselMap ref={mapRef} />
                </div>
                {/* Основная часть страницы с компонентом VesselMap */}
            </div>
            <div className='footer'>
                &copy; 2024 Сайт судоходства - Маршруты
            </div>
            {/* Подвал страницы */}
        </div>
    );
}

export default PageMap;
// Экспортируем компонент PageMap по умолчанию

