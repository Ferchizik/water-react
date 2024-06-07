// src/pages/PageAdmin.tsx
import React from "react";
// Импортируем React для создания компонентов
import NavMenu from "../components/NavMenu";
// Импортируем компонент NavMenu для отображения навигационного меню
import AddShip from "../components/AddShip";
// Импортируем компонент AddShip для добавления нового судна
import AddUser from "../components/AddUser";
// Импортируем компонент AddUser для добавления нового пользователя
import AddFlight from "../components/AddFlight";
// Импортируем компонент AddFlight для добавления нового рейса
import AddPort from "../components/AddPort";
// Импортируем компонент AddPort для добавления нового порта
import AddFlightStatus from "../components/AddFlightStatus";
// Импортируем компонент AddFlightStatus для добавления нового статуса рейса
import AddCargoType from "../components/AddCargoType";
// Импортируем компонент AddCargoType для добавления нового типа груза
import AddVesselType from "../components/AddVesselType";
// Импортируем компонент AddVesselType для добавления нового типа судна

function PageAdmin() {
  // Определяем функциональный компонент PageAdmin

  return (
    <div className="App">
      {/* Главный контейнер приложения */}
      
      <header className="header"> {/* Заголовок приложения */}
        <h1>Админ панель</h1> {/* Отображаем заголовок "Админ панель" */}
        <NavMenu /> {/* Включаем навигационное меню */}
      </header>
      <div className="container_admin"> {/* Основной контейнер админ панели */}
        <div className="nav_panel_left">
          <AddShip /> {/* Включаем компонент для добавления нового судна */}
        </div>
        <div className='main'>
          <AddFlight />
          {/* Включаем компонент для добавления нового рейса */}
          <AddPort /> {/* Включаем компонент для добавления нового порта */}
          <AddFlightStatus /> {/* Включаем компонент для добавления нового статуса рейса */}
          <AddCargoType /> {/* Включаем компонент для добавления нового типа груза */}
          <AddVesselType /> {/* Включаем компонент для добавления нового типа судна */}
        </div>
        <div className="nav_panel_right">
          <AddUser />{/* Включаем компонент для добавления нового пользователя */}
        </div>
      </div>
      <div className='footer'>
        &copy; 2024 Сайт судоходства - Маршруты
        {/* Подвал приложения с копирайтом */}
      </div>
    </div>
  );
}

export default PageAdmin;
// Экспортируем компонент PageAdmin по умолчанию

