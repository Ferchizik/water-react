import React, { useState } from 'react';

function AddPort() {
  const [portName, setPortName] = useState('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPort = {
      portName,
    };

    fetch('https://water-react.ru/php/add_port.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPort)
    })
    .then(response => response.json())
    .then(data => {
      setResponseMessage(data.success || data.error);
      if (data.success) {
        // Reset form
        setPortName('');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage('Ошибка отправки данных');
    });
  };

  return (
    <div id="add-port-form" style={{ display: "block" }}>
      <h3>Добавить <br /> новый порт</h3>
      <form id="new-port-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="port-name">Название порта:</label><br />
          <input
            type="text"
            id="port-name"
            name="port-name"
            value={portName}
            onChange={(e) => setPortName(e.target.value)}
            placeholder="Омск"
            required
          />
        </div>
        <br />
        <button id="add-port-button" type="submit">Добавить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default AddPort;
