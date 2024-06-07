// src/pages/PageLogin.tsx
import React, { useState } from 'react'; // Импортируем React и useState для создания компонента и управления состоянием
import axios from 'axios'; // Импортируем axios для выполнения HTTP-запросов
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для навигации по страницам
import './PageLogin.css'; // Импортируем CSS для стилизации компонента

const LoginForm: React.FC = () => {// Определяем функциональный компонент LoginForm с типом React.FC
  const [login, setLogin] = useState(''); // Определяем состояние для логина и функцию его обновления
  const [password, setPassword] = useState(''); // Определяем состояние для пароля и функцию его обновления
  const [name, setName] = useState(''); // Определяем состояние для имени и функцию его обновления
  const [family, setFamily] = useState(''); // Определяем состояние для фамилии и функцию его обновления
  const [patronymic, setPatronymic] = useState(''); // Определяем состояние для отчества и функцию его обновления
  const [post, setPost] = useState(''); // Определяем состояние для должности и функцию его обновления
  const [error, setError] = useState(''); // Определяем состояние для ошибки и функцию его обновления
  const [success, setSuccess] = useState(''); // Определяем состояние для успешного сообщения и функцию его обновления
  const navigate = useNavigate(); // Определяем переменную для навигации

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Определяем функцию для обработки отправки формы
    event.preventDefault();
    // Предотвращаем перезагрузку страницы при отправке формы

    try {
      const response = await axios.post('https://water-react.ru/php/get_auth.php', {
        login,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Выполняем POST-запрос для авторизации пользователя

      if (response.data.error) {
        // Проверяем наличие ошибки в ответе
        setError(response.data.error);
        setSuccess('');
      } else {
        // Если ошибки нет, сохраняем данные пользователя и перенаправляем на карту
        setError('');
        setSuccess('Вход выполнен успешно!');
        localStorage.setItem('jwt', response.data.jwt);
        setName(response.data.name);
        setFamily(response.data.family);
        setPatronymic(response.data.patronymic);
        setPost(response.data.post);
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('family', response.data.family);
        localStorage.setItem('patronymic', response.data.patronymic);
        localStorage.setItem('post', response.data.post);
        navigate('/map');
      }
    } catch (error) {
      // Обрабатываем ошибку в случае неудачной авторизации
      setError('Пользователь найден, неверно введен пароль!');
      setSuccess('');
    }
  };

  return (
    <>
      <h1>Авторизация</h1> {/* Заголовок страницы */}
      <div className="form-wrapper"> {/* Обертка для формы */}
        <form className="form" onSubmit={handleSubmit}> {/* Форма для авторизации */}
          <h2 className='form-go'>Вход</h2>{/* Заголовок формы */}
          <div className="form-group"> {/* Группа полей для ввода логина */}
            <label className="label">Логин:</label> {/* Метка для поля ввода логина */}
            <input
              type="text"
              className="input"
              value={login}
              onChange={(e) => setLogin(e.target.value)} />
            {/* Поле ввода логина */}
          </div>
          <div className="form-group">{/* Группа полей для ввода пароля */}
            <label className="label">Пароль:</label> {/* Метка для поля ввода пароля */}
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {/* Поле ввода пароля */}
          </div>
          <button type="submit" className="button">Войти</button> {/* Кнопка для отправки формы */}
          {error && <p className="message error">{error}</p>}
          {/* Отображение сообщения об ошибке, если есть */}
          {success && (
            <div>
              <p className="message success">{success}</p>
              <ul>
                <li>Имя: {name}</li>
                <li>Фамилия: {family}</li>
                <li>Отчество: {patronymic}</li>
                <li>Должность: {post}</li>
              </ul>
              {/* Отображение успешного сообщения и данных пользователя */}
            </div>
          )}
        </form>
        <div className='footer'>
          &copy; 2024 Сайт судоходства - Маршруты
          {/* Подвал страницы с копирайтом */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
// Экспортируем компонент LoginForm по умолчанию




