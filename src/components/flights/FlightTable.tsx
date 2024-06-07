// src/components/FlightTable.tsx
import React from 'react'; // Импортируем React для создания компонентов
import tableStyles from '../../module_css/Flights.module.css';
// Импортируем стили из модуля CSS для таблицы рейсов

interface Flight {
  flight_id: number;
  date_departure: string | null;
  date_destination: string | null;
  incoming_port: string;
  outcoming_port: string;
  vessel_name: string;
  status: string;
  cargo_type: string;
  cargo_size: number;
} // Описываем интерфейс Flight для определения структуры данных рейса

interface FlightTableProps {
  flights: Flight[];
} // Описываем интерфейс FlightTableProps для определения структуры пропсов компонента FlightTable

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
  // Создаем функциональный компонент FlightTable, который принимает пропсы типа FlightTableProps
  return (
    <table className={tableStyles.table}>
      {/* Применяем стили к таблице, используя CSS модули */}
      <thead>
        <tr>
          <th>Дата отправки</th>
          <th>Дата прибытия</th>
          <th>Порт отправки</th>
          <th>Порт прибытия</th>
          <th>Судно</th>
          <th>Статус</th>
          <th>Тип груза</th>
          <th>Размер груза</th>
        </tr>
      </thead> {/* Определяем заголовок таблицы с колонками для данных рейсов */}
      <tbody>
        {flights.map((flight) => (
          <tr key={flight.flight_id}>
            <td>{flight.date_departure || 'N/A'}</td>
            {/* Отображаем дату отправки, если она есть, иначе 'N/A' */}
            <td>{flight.date_destination || 'N/A'}</td>
            {/* Отображаем дату прибытия, если она есть, иначе 'N/A' */}
            <td>{flight.incoming_port}</td> {/* Отображаем порт отправки */}
            <td>{flight.outcoming_port}</td> {/* Отображаем порт прибытия */}
            <td>{flight.vessel_name}</td>{/* Отображаем название судна */}
            <td>{flight.status}</td> {/* Отображаем статус рейса */}
            <td>{flight.cargo_type}</td>{/* Отображаем тип груза */}
            <td>{flight.cargo_size} Т</td> {/* Отображаем размер груза в тоннах */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
// Экспортируем компонент FlightTable по умолчанию
