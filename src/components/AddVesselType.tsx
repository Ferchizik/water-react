import React, { useState } from "react";

const AddVesselType: React.FC = () => {
  const [vesselTypeName, setVesselTypeName] = useState('');
  const [icon, setIcon] = useState('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVesselType = { vesselTypeName, icon };

    fetch('https://water-react.ru/php/add_vessel_type.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVesselType)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setResponseMessage(`Ошибка: ${data.error}`);
      } else {
        setResponseMessage(`Успех: ${data.success}`);
        // Сброс формы
        setVesselTypeName('');
        setIcon('');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage('Ошибка отправки данных');
    });
  };

  return (
    <div id="add-vessel-type-form" style={{ display: "block" }}>
      <h3>Добавить <br/> новый тип судна</h3>
      <form id="new-vessel-type-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vessel-type-name">Название типа:</label><br />
          <input
            type="text"
            id="vessel-type-name"
            name="vessel-type-name"
            value={vesselTypeName}
            onChange={(e) => setVesselTypeName(e.target.value)}
            placeholder="Газовоз"
            required
          />
        </div>
        <div>
          <label htmlFor="icon">Иконка:</label><br />
          <input
            type="text"
            id="icon"
            name="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Имя картинки"
            required
          />
        </div>
        <br />
        <button id="add-vessel-type-button" type="submit">Добавить</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddVesselType;
