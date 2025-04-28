import React, { useState } from 'react';
import './styles/BetSlip.css';

function BetSlip({ betSlip = [], removeBet, clearBetSlip }) {
  const [betAmount, setBetAmount] = useState('');
  
  const calculatePotentialWinnings = () => {
    if (!betAmount || betSlip.length === 0) return 0;
    
    let winnings = 0;
    betSlip.forEach(bet => {
      const betOdds = parseFloat(bet.odds.replace('+', ''));
      if (bet.odds.startsWith('+')) {
        winnings += parseFloat(betAmount) * (betOdds / 100);
      } else {
        winnings += parseFloat(betAmount) * (100 / Math.abs(betOdds));
      }
    });
    
    return winnings.toFixed(2);
  };

  const placeBet = () => {
    // Parse the betAmount to a number first
    const amount = parseFloat(betAmount);
    
    // Validate bet amount
    if (betSlip.length === 0) {
      alert('Your bet slip is empty. Please add selections before placing a bet.');
      return;
    }
    
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid bet amount.');
      return;
    }
    
    // Calculate potential winnings
    const potentialWinnings = calculatePotentialWinnings();
    
    // Show confirmation
    alert(`Bet placed successfully!\nAmount: $${amount.toFixed(2)}\nPotential Winnings: $${potentialWinnings}`);
    
    // Clear the bet slip after successful placement
    if (clearBetSlip) {
      clearBetSlip();
    }
    
    // Reset the bet amount
    setBetAmount('');
  };

  return (
    <div className="bet-slip">
      <h2 className="bet-slip-title">Bet Slip <span className="bet-count">{betSlip.length}</span></h2>
      
      {betSlip.length === 0 ? (
        <div className="empty-slip">
          <p>Your bet slip is empty</p>
          <p className="hint">Click on odds to add selections</p>
        </div>
      ) : (
        <>
          <div className="bet-selections">
            {betSlip.map(bet => (
              <div className="bet-selection" key={bet.id}>
                <div className="bet-selection-header">
                  <span className="bet-type">{bet.type || 'Moneyline'}</span>
                  <button className="remove-btn" onClick={() => removeBet(bet.id)}>✕</button>
                </div>
                <div className="bet-selection-details">
                  {bet.game && bet.game.teams && (
                    <p className="bet-game">
                      {bet.game.teams.away} @ {bet.game.teams.home}
                    </p>
                  )}
                  <p className="bet-pick">
                    {bet.selection === 'home' ? bet.game.teams.home : 
                     bet.selection === 'away' ? bet.game.teams.away : 'Draw'}
                  </p>
                  <div className="bet-odds-row">
                    <span className="bet-odds">{bet.odds}</span>
                    <span className="sportsbook-tag">{bet.sportsbook}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bet-inputs">
            <div className="input-group">
              <label>Bet Amount</label>
              <div className="amount-input">
                <span className="currency">$</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="potential-winnings">
              <span>Potential Winnings:</span>
              <span className="winnings-amount">${calculatePotentialWinnings()}</span>
            </div>
          </div>
          
          <button className="place-bet-btn" onClick={placeBet}>Place Bet</button>
          
          <div className="bet-options">
            <button className="btn-outline">Save Bet</button>
            <button className="btn-outline" onClick={clearBetSlip}>Clear Slip</button>
          </div>
        </>
      )}
    </div>
  );
}

export default BetSlip;