import React from 'react';

interface FetchErrorProps {
  message: string;
}

const FetchError: React.FC<FetchErrorProps> = ({ message }) => {
  return (
    <div>
      <h2>Ошибка: {message}</h2>
    </div>
  );
};

export default FetchError;
