import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TokenExpirationChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('Токен отсутствует');
      navigate('/login');
      return false;
    }

    const tokenData = parseToken(token);
    if (tokenData && tokenData.exp && tokenData.exp * 1000 < Date.now()) {
      localStorage.removeItem('jwt'); // Удаляем истекший токен
      console.log('Токен истек');
      navigate('/login');
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (location.pathname !== '/login') {
      const isValid = checkToken();
      setIsLoading(!isValid);
    } else {
      setIsLoading(false);
    }
  }, [location, navigate]);

  if (isLoading) {
    return null; // Если идет проверка токена, не отображаем ничего
  }

  return null;
};

const parseToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (error) {
    return null;
  }
};

export default TokenExpirationChecker;
