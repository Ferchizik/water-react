import React, { useEffect, useState } from 'react';

// Определите интерфейс для данных порта
interface Port {
    name: string;
}

// Определите интерфейс для ошибки
interface FetchError {
    message: string;
}

const Ports: React.FC = () => {
    const [ports, setPorts] = useState<Port[]>([]);
    const [error, setError] = useState<FetchError | null>(null);

    useEffect(() => {
        fetch('https://water-react.ru')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPorts(data))
            .catch((error: Error) => setError({ message: error.message }));
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Порты</h1>
            <ul>
                {ports.map((port, index) => (
                    <li key={index}>{port.name} </li>
                ))}
            </ul>
        </div>
    );
}

export default Ports;
