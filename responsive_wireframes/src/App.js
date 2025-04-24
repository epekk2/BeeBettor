import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProfilePage from './ProfilePage.jsx';
import RegulationsPage from './RegulationsPage.jsx';
import HomePage from './HomePage.jsx'
import MyBetsPage from './MyBetsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/regulations" element={<RegulationsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bets" element={<MyBetsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
