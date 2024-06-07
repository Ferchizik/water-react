import React from 'react';

interface CargoSumProps {
  sum: number;
}

const CargoSum: React.FC<CargoSumProps> = ({ sum }) => {
  return (
    <div>
      <h2>Сумма груза: {sum} Т</h2>
    </div>
  );
};

export default CargoSum;
