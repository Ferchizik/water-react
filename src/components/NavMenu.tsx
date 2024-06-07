import React from "react";
import { Link } from 'react-router-dom';
import Profile from "./profile/Profile";
import styles from '../module_css/Navmenu.module.css';

function NavMenu() {
    return (
        <div className={styles.menu}>
          <div className={styles.nav_menu}>
            <ul>
              <div className={styles.logo}>
              <Profile />
                {/* <img src={`./img/${1.img}`} alt={"Логотип"}/> */}
              </div>
              <li><Link to="/map">Карта</Link></li>
              <li><Link to="/analytics">Аналитика</Link></li>
              <li><Link to="/admin">Админ панель</Link></li>
              <li><Link to="/news">Новости</Link></li>
              <li><a href="cargo-types.html">Виды грузов</a></li>
              <li><a href="database.html">База данных</a></li>
              <li><a href="auth-registration.html">Авторизация</a></li>
              <li><a href="add-route.html">Добавление маршрута</a></li>
              <li><Link to="/login">Выйти</Link></li>
            </ul>
          </div>
        </div>
    );
}

export default NavMenu;
