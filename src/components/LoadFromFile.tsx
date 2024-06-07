// src/components/LoadFromFile.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface LoadFromFileProps {
    onLoad: () => void;
}

const LoadFromFile: React.FC<LoadFromFileProps> = ({ onLoad }) => {
    const [message, setMessage] = useState('');

    const handleLoadFromFile = async () => {
        try {
            const response = await axios.get('https://water-react.ru/php/load_from_file.php');
            setMessage(response.data.success || response.data.error);
            if (response.data.success) {
                onLoad();
            }
        } catch (error) {
            setMessage('Ошибка загрузки данных');
        }
    };

    const handleLoadFromAnotherFile = async () => {
        try {
            const response = await axios.get('https://water-react.ru/php/load_from_another_file.php');
            setMessage(response.data.success || response.data.error);
            if (response.data.success) {
                onLoad();
            }
        } catch (error) {
            setMessage('Ошибка загрузки данных из другого файла');
        }
    };

    return (
        <div>
            <h1>Обновить координаты</h1>
            <button className="download" onClick={handleLoadFromFile}>Загрузить</button><br/>
            <button onClick={handleLoadFromAnotherFile}>Загрузить дефолтные</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoadFromFile;
