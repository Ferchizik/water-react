import React, { useState } from "react";

const AddFlightStatus: React.FC = () => {
  const [statusName, setStatusName] = useState('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStatus = { statusName };

    fetch('https://water-react.ru/php/add_flight_status.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStatus)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setResponseMessage(`Ошибка: ${data.error}`);
      } else {
        setResponseMessage(`Успех: ${data.success}`);
        // Сброс формы
        setStatusName('');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage('Ошибка отправки данных');
    });
  };

  return (
    <div id="add-flight-status-form" style={{ display: "block" }}>
      <h3>Добавить <br/> новый статус рейса</h3>
      <form id="new-flight-status-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="status-name">Название статуса:</label><br />
          <input
            type="text"
            id="status-name"
            name="status-name"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            placeholder="Задержан"
            required
          />
        </div>
        <br />
        <button id="add-flight-status-button" type="submit">Добавить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddFlightStatus;
