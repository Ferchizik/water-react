import React, { useEffect } from 'react';

interface FlightFiltersProps {
  startDate: string;
  endDate: string;
  incomingPort: string;
  outcomingPort: string;
  cargoType: string;
  cargoSizeMin: string;
  cargoSizeMax: string;
  vesselName: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setIncomingPort: (port: string) => void;
  setOutcomingPort: (port: string) => void;
  setCargoType: (type: string) => void;
  setCargoSizeMin: (size: string) => void;
  setCargoSizeMax: (size: string) => void;
  setVesselName: (name: string) => void;
  cargoTypes: { id: number, name: string }[]; 
}

const FlightFilters: React.FC<FlightFiltersProps> = ({
  startDate,
  endDate,
  incomingPort,
  outcomingPort,
  cargoType,
  cargoSizeMin,
  cargoSizeMax,
  vesselName,
  setStartDate,
  setEndDate,
  setIncomingPort,
  setOutcomingPort,
  setCargoType,
  setCargoSizeMin,
  setCargoSizeMax,
  setVesselName,
  cargoTypes
}) => {
  const [ports, setPorts] = React.useState<{ id: number, name: string }[]>([]);

  useEffect(() => {
    fetch('https://water-react.ru/php/get_ports.php')
      .then(response => response.json())
      .then(data => setPorts(data))
      .catch(error => console.error('Ошибка загрузки портов:', error));
  }, []);

  return (
    <div className="form-container">
      <label htmlFor="startDate">Дата начала:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDate">Дата конца:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <label htmlFor="incomingPort">Порт отправки:</label>
      <select
        id="incomingPort"
        value={incomingPort}
        onChange={(e) => setIncomingPort(e.target.value)}
      >
        <option value="">Все порты</option>
        {ports.map((port) => (
          <option key={port.id} value={port.name}>{port.name}</option>
          ))}
        </select>
        <label htmlFor="outcomingPort">Порт прибытия:</label>
        <select
          id="outcomingPort"
          value={outcomingPort}
          onChange={(e) => setOutcomingPort(e.target.value)}
        >
          <option value="">Все порты</option>
          {ports.map((port) => (
            <option key={port.id} value={port.name}>{port.name}</option>
          ))}
        </select>
        <label htmlFor="cargoType">Тип груза:</label>
        <select
          id="cargoType"
          value={cargoType}
          onChange={(e) => setCargoType(e.target.value)}
        >
          <option value="">Все типы грузов</option>
          {cargoTypes.map((type) => (
            <option key={type.id} value={type.name}>{type.name}</option>
          ))}
        </select>
        <label htmlFor="vesselName">Имя судна:</label>
        <input
          type="text"
          id="vesselName"
          value={vesselName}
          onChange={(e) => setVesselName(e.target.value)}
          placeholder="Введите имя судна"
        />
        <label htmlFor="cargoSizeMin">Размер груза от:</label>
        <input
          type="number"
          id="cargoSizeMin"
          value={cargoSizeMin}
          onChange={(e) => setCargoSizeMin(e.target.value)}
          placeholder="Минимальный размер"
        />
        <label htmlFor="cargoSizeMax">Размер груза до:</label>
        <input
          type="number"
          id="cargoSizeMax"
          value={cargoSizeMax}
          onChange={(e) => setCargoSizeMax(e.target.value)}
          placeholder="Максимальный размер"
        />
    </div>
  );
};
  
  export default FlightFilters;
