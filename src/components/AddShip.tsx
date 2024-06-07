import React, { useState } from "react";

function AddShip() {
  const [shipName, setShipName] = useState('');
  const [loader, setLoader] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [telephone, setTelephone] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [vesselType, setVesselType] = useState('Сухогруз'); // Default to "Сухогруз"
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newShip = {
      shipName,
      loader,
      img,
      description,
      telephone,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      vesselType
    };
  
    fetch('https://water-react.ru/php/add_ship.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newShip)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Reset form
      setShipName('');
      setLoader('');
      setImg('');
      setDescription('');
      setTelephone('');
      setLongitude('');
      setLatitude('');
      setVesselType('Сухогруз');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  return (
    <>
      <div id="coordinates"></div>
      <div id="add-ship-form" style={{ display: "block" }}>
        <h3>Добавить <br/> новый корабль</h3>
        <form id="new-ship-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ship-name">Название корабля:</label>
            <input
              type="text"
              id="ship-name"
              name="ship-name"
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
              placeholder="Акулов"
              required
            />
          </div>
          <div>
            <label htmlFor="loader">Загрузка:</label>
            <input
              type="text"
              id="loader"
              value={loader}
              onChange={(e) => setLoader(e.target.value)}
              placeholder="220"
              required
            />
          </div>
          <div>
            <label htmlFor="img">Изображение:</label>
            <input
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Akylov"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Описание:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Капитан судна - Алексей Семенов, Тип судна: Контейнеровоз, вмещает до 100 контейнеров стандартного размера, работает на транспортном коридоре Волга-Дон"
              required
            >
            </textarea>
          </div>
          <div>
            <label htmlFor="telephone">Телефон:</label>
            <input
              type="text"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="+79137770077"
              required
            />
          </div>
          <div>
            <label htmlFor="longitude">Долгота:</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="53.0660"
              required
            />
          </div>
          <div>
            <label htmlFor="latitude">Широта:</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="83.5050"
              required
            />
          </div>
          <div>
            <label htmlFor="types-vessels-id">Тип корабля: <></>
            <select 
              id="types-vessels-id"
              value={vesselType}
              onChange={(e) => setVesselType(e.target.value)}
              required
            >
              <option value="Сухогруз">Сухогруз</option>
              <option value="Танкер">Танкер</option>
              <option value="Буксир-Толкач">Буксир-Толкач</option>
              <option value="Контейнеровоз">Контейнеровоз</option>
            </select> 
            </label>
          </div>
          <br />
          <button id="add-ship-button" type="submit">Добавить</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </>
  );
}

export default AddShip;
