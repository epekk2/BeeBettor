import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import ProfilePage from './ProfilePage.jsx';
import RegulationsPage from './RegulationsPage.jsx';
import HomePage from './HomePage.jsx';
import MyBetsPage from './MyBetsPage.jsx';
import LiveGamesTab from './LiveGamesTab.jsx';
import SportsPage from "./SportsPage.jsx";
import PromotionsPage from "./PromotionsPage.jsx";
import GuidePage from "./GuidePage.jsx";

function App() {
  // Shared state for bet slip across components
  const [betSlip, setBetSlip] = useState([]);
  
  // Function to add to bet slip
  const addToBetSlip = (bet) => {
    setBetSlip(prevBetSlip => {
      // Check if bet already exists in slip
      const existingBet = prevBetSlip.find(b => b.id === bet.id);
      if (existingBet) {
        return prevBetSlip; // Don't add duplicates
      }
      return [...prevBetSlip, bet];
    });
  };
  
  // Function to remove from bet slip
  const removeBet = (betId) => {
    setBetSlip(prevBetSlip => prevBetSlip.filter(bet => bet.id !== betId));
  };
  
  // Function to clear all bets
  const clearBetSlip = () => {
    setBetSlip([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/regulations" element={<RegulationsPage />} />
        <Route path="/promotions" element={<PromotionsPage />} />
        <Route path="guide" element={<GuidePage />} />
        <Route 
          path="/home" 
          element={
            <HomePage 
              betSlip={betSlip}
              addToBetSlip={addToBetSlip}
              removeBet={removeBet}
              clearBetSlip={clearBetSlip}
            />
          } 
        />
        <Route 
          path="/bets" 
          element={
            <MyBetsPage 
              betSlip={betSlip}
              removeBet={removeBet}
            />
          } 
        />
        <Route 
          path="/live" 
          element={
            <LiveGamesTab 
              betSlip={betSlip}
              addToBetSlip={addToBetSlip}
              removeBet={removeBet}
            />
          } 
        />
        <Route
        path="/sports"
        element={
          <SportsPage 
              betSlip={betSlip}
              addToBetSlip={addToBetSlip}
              removeBet={removeBet}
              clearBetSlip={clearBetSlip}
            />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;