import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [family, setFamily] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [post, setPosition] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка наличия JWT-токена
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      navigate('/PageMap');
      return;
    }

    // Получение данных пользователя из локального хранилища
    const name = localStorage.getItem('name');
    const family = localStorage.getItem('family');
    const patronymic = localStorage.getItem('patronymic');
    const post = localStorage.getItem('post');

    if (name && family && patronymic && post) {
      setName(name);
      setFamily(family);
      setPatronymic(patronymic);
      setPosition(post);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="profile" >
        <div className="profile-circle">
        <span>{name.charAt(0)}{family.charAt(0)}</span>
        <div className="profile-tooltip">
          <ul>
            <li>{family} {name} {patronymic} {post}</li>
          </ul>
        </div>
{/* 
          <ul>
            <li>{family} {name} {patronymic}</li>
            <li>{post}</li>
          </ul> */}
            {/* <li> {family} {name} {patronymic} <br /> {post}</li> */}
    </div>
</div>
  );
};

export default Profile;