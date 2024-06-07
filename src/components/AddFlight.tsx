import React, { useState } from 'react';

function AddFlight() {
  const [dateDeparture, setDateDeparture] = useState('');
  const [dateDestination, setDateDestination] = useState('');
  const [incomingPortId, setIncomingPortId] = useState('');
  const [outcomingPortId, setOutcomingPortId] = useState('');
  const [vesselsId, setVesselsId] = useState('');
  const [statusFlightId, setStatusFlightId] = useState('');
  const [cargoId, setCargoId] = useState('');
  const [size, setSize] = useState('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFlight = {
      date_departure: dateDeparture,
      date_destination: dateDestination || null,
      incoming_port_id: parseInt(incomingPortId),
      outcoming_port_id: parseInt(outcomingPortId),
      vessels_id: parseInt(vesselsId),
      status_flight_id: parseInt(statusFlightId),
      cargo_id: parseInt(cargoId),
      size: parseFloat(size)
    };

    fetch('https://water-react.ru/php/add_flight.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFlight)
    })
    .then(response => response.json())
    .then(data => {
      setResponseMessage(data.success || data.error);
      if (data.success) {
        // Reset form
        setDateDeparture('');
        setDateDestination('');
        setIncomingPortId('');
        setOutcomingPortId('');
        setVesselsId('');
        setStatusFlightId('');
        setCargoId('');
        setSize('');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage('Ошибка отправки данных');
    });
  };

  return (
    <div id="add-flight-form" style={{ display: "block" }}>
      <h3>Добавить <br /> новый рейс</h3>
      <form id="new-flight-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date-departure">Дата отправления:</label><br />
          <input
            type="date"
            id="date-departure"
            name="date-departure"
            value={dateDeparture}
            onChange={(e) => setDateDeparture(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date-destination">Дата прибытия:</label><br />
          <input
            type="date"
            id="date-destination"
            name="date-destination"
            value={dateDestination}
            onChange={(e) => setDateDestination(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="incoming-port-id">ID порта прибытия:</label><br />
          <input
            type="number"
            id="incoming-port-id"
            name="incoming-port-id"
            value={incomingPortId}
            placeholder='2'
            onChange={(e) => setIncomingPortId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="outcoming-port-id">ID порта отправления:</label><br />
          <input
            type="number"
            id="outcoming-port-id"
            name="outcoming-port-id"
            value={outcomingPortId}
            placeholder='3'
            onChange={(e) => setOutcomingPortId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="vessels-id">ID судна:</label><br />
          <input
            type="number"
            id="vessels-id"
            name="vessels-id"
            value={vesselsId}
            placeholder='4'
            onChange={(e) => setVesselsId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status-flight-id">ID статуса рейса:</label><br />
          <input
            type="number"
            id="status-flight-id"
            name="status-flight-id"
            value={statusFlightId}
            placeholder='1'
            onChange={(e) => setStatusFlightId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cargo-id">ID груза:</label><br />
          <input
            type="number"
            id="cargo-id"
            name="cargo-id"
            value={cargoId}
            placeholder='2'
            onChange={(e) => setCargoId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="size">Размер:</label><br />
          <input
            type="number"
            step="0.01"
            id="size"
            name="size"
            value={size}
            placeholder='234'
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <br />
        <button id="add-flight-button" type="submit">Добавить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default AddFlight;
