import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Page/PageLogin';
import PageMap from './Page/PageMap';
import PageAnalytics from './Page/PageAnalytics';
import TokenExpirationChecker from './components/TokenExpirationChecker';
import PageAdmin from './Page/PageAdmin';
import PageNews from './Page/PageNews';

const App: React.FC = () => {

  const token = localStorage.getItem('token') || '';
  
  return (
    <Router>
      <TokenExpirationChecker/> {/*  Проверка токена при каждом роуте */}
      <Routes>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/map" element={<PageMap/>}/>
        <Route path="/analytics" element={<PageAnalytics/>}/>
        <Route path="/admin" element={<PageAdmin/>}/>
        <Route path="/news" element={<PageNews/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    
  );
};

// Компонент для защиты маршрутов
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/login" />;
};

export default App;