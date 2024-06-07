// src/components/AddUser.tsx
import React, { useState } from 'react';
import './AddUser.css';

const AddUser: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [family, setFamily] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [post, setPost] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = { login, password, name, family, patronymic, post };

    try {
      const response = await fetch('https://water-react.ru/php/add_users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.error) {
        setError(true);
        setResponseMessage(data.error);
      } else {
        setError(false);
        setResponseMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(true);
      setResponseMessage('Ошибка при отправке запроса');
    }
  };

  return (
    <div>
      <h2 className="title">Добавить <br/> пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="login">Логин:</label>
          <input
            className="input"
            type="text"
            id="login"
            name="login"
            value={login}
            placeholder='Diplom_2024'
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">Пароль:</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="family">Фамилия:</label>
          <input
            className="input"
            type="text"
            id="family"
            name="family"
            value={family}
            placeholder='Волшебников'
            onChange={(e) => setFamily(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="name">Имя:</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder='Витя'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="patronymic">Отчество:</label>
          <input
            className="input"
            type="text"
            id="patronymic"
            name="patronymic"
            value={patronymic}
            placeholder='Борисович'
            onChange={(e) => setPatronymic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="post">Должность:</label>
          <input
            className="input"
            type="text"
            id="post"
            name="post"
            value={post}
            placeholder='Диспетчер'
            onChange={(e) => setPost(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Добавить пользователя</button>
      </form>
      {responseMessage && (
        <p className={`message ${error ? 'error' : 'success'}`}>{responseMessage}</p>
      )}
    </div>
  );
};

export default AddUser;
