import React, { useEffect, useState, useRef} from 'react';
import FlightFilters from './FlightFilters';
import FlightTable from './FlightTable';
import CargoSum from './CargoSum';
import FetchError from './FetchError';
import tableStyles from '../../module_css/Flights.module.css';
import buttonStyles from '../../module_css/Button.module.css';
import { jsPDF } from "jspdf";
import { json2csv } from 'json-2-csv';

interface Flight {
  flight_id: number;
  date_departure: string;
  date_destination: string | null;
  incoming_port: string;
  outcoming_port: string;
  vessel_name: string;
  status: string;
  cargo_type: string;
  cargo_size: number;
}

interface FetchError {
  message: string;
}

interface CargoType {
  id: number;
  name: string;
}

const Flights: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<FetchError | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [incomingPort, setIncomingPort] = useState('');
  const [outcomingPort, setOutcomingPort] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [cargoSizeMin, setCargoSizeMin] = useState('');
  const [cargoSizeMax, setCargoSizeMax] = useState('');
  const [vesselName, setVesselName] = useState('');
  const [cargoSum, setCargoSum] = useState<number | null>(null);
  const [cargoTypes, setCargoTypes] = useState<CargoType[]>([]);

  useEffect(() => {
    fetch('https://water-react.ru/php/get_flights.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Flight[]) => setFlights(data))
      .catch((error: Error) => setError({ message: error.message }));

    fetch('https://water-react.ru/php/get_cargo_types.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: CargoType[]) => setCargoTypes(data))
      .catch((error: Error) => setError({ message: error.message }));
  }, []);

  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      const departureDate = new Date(flight.date_departure);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate = (!start || departureDate >= start) && (!end || departureDate <= end);
      const matchesIncomingPort = !incomingPort || flight.incoming_port === incomingPort;
      const matchesOutcomingPort = !outcomingPort || flight.outcoming_port === outcomingPort;
      const matchesCargoType = !cargoType || flight.cargo_type.includes(cargoType);
      const matchesCargoSizeMin = !cargoSizeMin || flight.cargo_size >= Number(cargoSizeMin);
      const matchesCargoSizeMax = !cargoSizeMax || flight.cargo_size <= Number(cargoSizeMax);
      const matchesVesselName = !vesselName || flight.vessel_name.toLowerCase().includes(vesselName.toLowerCase());

      return matchesDate && matchesIncomingPort && matchesOutcomingPort && matchesCargoType && matchesCargoSizeMin && matchesCargoSizeMax && matchesVesselName;
    });
  };

  const calculateCargoSum = () => {
    const filteredFlights = filterFlights(flights);
    const sum = filteredFlights.reduce((acc, flight) => acc + Number(flight.cargo_size), 0);
    setCargoSum(sum);
  };

  if (error) {
    return <FetchError message={error.message} />;
  }

  const filteredFlights = filterFlights(flights);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Flights Data', 20, 10);
    let y = 20;
    filteredFlights.forEach(flight => {
      const textLines = [
        `ID: ${flight.flight_id}`,
        `Departure: ${flight.date_departure}`,
        `Arrival: ${flight.date_destination || 'N/A'}`,
        `Incoming Port: ${flight.incoming_port}`,
        `Outcoming Port: ${flight.outcoming_port}`,
        `Vessel: ${flight.vessel_name}`,
        `Status: ${flight.status}`,
        `Cargo Type: ${flight.cargo_type}`,
        `Cargo Size: ${flight.cargo_size}T`
      ];
      textLines.forEach(line => {
        doc.text(line, 10, y);
        y += 10;
      });
    });
    doc.save('flights.pdf');
  };

  const exportToCSV = () => {
    const filteredFlights = filterFlights(flights); // Ensure filteredFlights is available here
    try {
      const csv = json2csv(filteredFlights, {
        delimiter: {
          field: ';' // Используем точку с запятой как разделитель полей
        }
      });
      const csvWithBom = '\uFEFF' + csv;  // Добавление BOM для корректной интерпретации символов
      const blob = new Blob([csvWithBom], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'flights.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Ошибка экспорта в CSV:', error);
    }
  };
  

  return (
    <div>
      <FlightFilters
        startDate={startDate}
        endDate={endDate}
        incomingPort={incomingPort}
        outcomingPort={outcomingPort}
        cargoType={cargoType}
        cargoSizeMin={cargoSizeMin}
        cargoSizeMax={cargoSizeMax}
        vesselName={vesselName}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setIncomingPort={setIncomingPort}
        setOutcomingPort={setOutcomingPort}
        setCargoType={setCargoType}
        setCargoSizeMin={setCargoSizeMin}
        setCargoSizeMax={setCargoSizeMax}
        setVesselName={setVesselName}
        cargoTypes={cargoTypes}
      />
      <button className={buttonStyles.button} onClick={exportToCSV}>Экспорт в CSV</button>
      <button className={buttonStyles.button} onClick={calculateCargoSum}>Рассчитать сумму груза</button>
      <button className={buttonStyles.button} onClick={exportToPDF}>Экспорт в PDF</button>
      {cargoSum !== null && <CargoSum sum={cargoSum} />}
      <FlightTable flights={filteredFlights} />

    </div>
  );
};

export default Flights;