import React, { useState } from "react";

const AddCargoType: React.FC = () => {
  const [cargoTypeName, setCargoTypeName] = useState('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCargoType = { cargoTypeName };

    fetch('https://water-react.ru/php/add_cargo_type.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8' // добавьте charset=UTF-8
      },
      body: JSON.stringify(newCargoType)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setResponseMessage(`Ошибка: ${data.error}`);
      } else {
        setResponseMessage(`Успех: ${data.success}`);
        // Сброс формы
        setCargoTypeName('');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage('Ошибка отправки данных');
    });
  };

  return (
    <div id="add-cargo-type-form" style={{ display: "block" }}>
      <h3>Добавить <br/> новый тип груза</h3>
      <form id="new-cargo-type-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cargo-type-name">Название груза:</label><br />
          <input
            type="text"
            id="cargo-type-name"
            name="cargo-type-name"
            value={cargoTypeName}
            onChange={(e) => setCargoTypeName(e.target.value)}
            placeholder="Газ"
            required
          />
        </div>
        <br />
        <button id="add-cargo-type-button" type="submit">Добавить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddCargoType;
