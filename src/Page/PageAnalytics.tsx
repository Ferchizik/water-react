import React, { useState } from "react";
import Flights from "../components/flights/Flights";
import buttonStyles from '../module_css/Button.module.css';
import NavMenu from "../components/NavMenu";

function PageAnalytics() {
    const [showFlights, setShowFlights] = useState(false);

    const toggleFlights = () => {
        setShowFlights(prevState => !prevState); // Противоположное значение showFlights
    };

    return (
        <div className="App">
            <header className="header">
                <h1>Аналитика речных судов</h1>
                <NavMenu/>
            </header>
            <Flights/>
            <div className='footer'>
            &copy; 2024 Сайт судоходства - Маршруты
            </div>
        </div>
    );
}

export default PageAnalytics;
