import React, { useState } from 'react';
import './styles/ProfilePage.css';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [showGamblingData, setShowGamblingData] = useState(false);
  
  // Mock gambling data for demonstration
  const gamblingData = {
    totalDeposited: 15000,
    totalWithdrawn: 7500,
    totalWon: 23750,
    totalLost: 20000,
    netProfit: 3750,
    winRate: 54.3,
    betsPlaced: 245,
    favoriteSport: 'NFL',
    monthlyActivity: [
      { month: 'Jan', bets: 25, profit: 750 },
      { month: 'Feb', bets: 30, profit: -320 },
      { month: 'Mar', bets: 22, profit: 540 },
      { month: 'Apr', bets: 18, profit: 1200 },
      { month: 'May', bets: 40, profit: -800 },
      { month: 'Jun', bets: 35, profit: 950 },
      { month: 'Jul', bets: 20, profit: 380 },
      { month: 'Aug', bets: 10, profit: -150 },
      { month: 'Sep', bets: 15, profit: 600 },
      { month: 'Oct', bets: 30, profit: 1100 },
    ],
    sportDistribution: [
      { sport: 'NFL', percentage: 45 },
      { sport: 'NBA', percentage: 25 },
      { sport: 'MLB', percentage: 15 },
      { sport: 'NHL', percentage: 10 },
      { sport: 'Other', percentage: 5 },
    ],
    betTypeDistribution: [
      { type: 'Moneyline', percentage: 40 },
      { type: 'Spread', percentage: 30 },
      { type: 'Over/Under', percentage: 15 },
      { type: 'Parlay', percentage: 10 },
      { type: 'Prop', percentage: 5 },
    ]
  };

  const toggleGamblingData = () => {
    setShowGamblingData(!showGamblingData);
  };

  // Calculate bar heights for profit chart
  const calculateBarHeight = (value) => {
    const maxProfit = Math.max(...gamblingData.monthlyActivity.map(month => Math.abs(month.profit)));
    const percentage = (Math.abs(value) / maxProfit) * 80; // Maximum 80% height for visibility
    return Math.max(percentage, 10); // Minimum 10% height for visibility
  };

  // Helper functions for chart colors with brighter colors
  const getSportColor = (sport) => {
    const colorMap = {
      'NFL': '#f8cd00', // beeBettor yellow
      'NBA': '#ff6b6b', // bright red
      'MLB': '#4cc9f0', // bright blue
      'NHL': '#8338ec', // purple
      'Other': '#06d6a0' // teal
    };
    return colorMap[sport] || '#f8cd00';
  };

  const getBetTypeColor = (type) => {
    const colorMap = {
      'Moneyline': '#f8cd00', // beeBettor yellow
      'Spread': '#4cc9f0',    // bright blue
      'Over/Under': '#8338ec', // purple
      'Parlay': '#ff6b6b',    // bright red
      'Prop': '#06d6a0'       // teal
    };
    return colorMap[type] || '#f8cd00';
  };

  return (
    <div className="profile-container">
      {/* Header with buttons */}
      <header className="header">
        <h1>Profile Dashboard</h1>
        <div className="top-buttons">
          <Link to="/home" className="btn btn-blue">Home</Link>
          <Link to="/bets" className="btn btn-blue">My Bets</Link>
          <Link to="/" className="btn btn-red">Account</Link>
        </div>
      </header>

      {/* left side */}
      <main className="main-content">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <div className="avatar-placeholder">
              <span>EP</span>
            </div>
          </div>
          <h2>Ethan Pekkarinen</h2>
          <p className="profile-text">
            Welcome to your profile dashboard. Here you can manage your account
            settings and view your personal information and stats.
          </p>
          
          <button 
            className="btn btn-yellow full-width gambling-data-btn" 
            onClick={toggleGamblingData}
          >
            {showGamblingData ? 'Hide Gambling Data' : 'View Gambling Data'}
          </button>
          
          <div className="bottom-section">
            <p>Info on regulations changing based on state</p>
            <Link to="/regulations" className="btn btn-blue full-width">
                View Regulations
            </Link>
          </div>
        </div>
        
        {/* right side */}
        {!showGamblingData ? (
          <div className="profile-details">
            <h2 className="section-title">Account Information</h2>
            
            <div className="info-fields">
              <div className="field-group">
                <label>Username</label>
                <div className="input-group">
                  <input type="text" value="ethanp123" readOnly />
                  <button className="btn-small">Edit</button>
                </div>
              </div>
              
              <div className="field-group">
                <label>Password</label>
                <div className="input-group">
                  <input type="password" value="********" readOnly />
                  <button className="btn-small">Change</button>
                </div>
              </div>
              
              <div className="field-group">
                <label>Location</label>
                <div className="input-group">
                  <input type="text" value="Chicago, IL" readOnly />
                  <button className="btn-small">Update</button>
                </div>
              </div>
              
              <div className="field-group">
                <label>Available Funds</label>
                <div className="input-group">
                  <input type="text" value="$1,250,000.00" readOnly />
                  <button className="btn-small">Deposit</button>
                </div>
              </div>
              
              <div className="field-group">
                <label>Linked Bank Account</label>
                <div className="input-group">
                  <input type="text" value="**** **** **** 4832" readOnly />
                  <button className="btn-small">Manage</button>
                </div>
              </div>
            </div>
            
            {/* bottom right button */}
            <div className="save-section">
              <button className="btn btn-purple">Save All Changes</button>
            </div>
          </div>
        ) : (
          <div className="gambling-data-container">
            <h2 className="section-title">Your Gambling Statistics</h2>
            
            <div className="stats-overview">
              <div className="stat-card">
                <span className="stat-value">${gamblingData.totalDeposited.toLocaleString()}</span>
                <span className="stat-label">Total Deposited</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">${gamblingData.totalWithdrawn.toLocaleString()}</span>
                <span className="stat-label">Total Withdrawn</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">${gamblingData.totalWon.toLocaleString()}</span>
                <span className="stat-label">Total Won</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">${gamblingData.totalLost.toLocaleString()}</span>
                <span className="stat-label">Total Lost</span>
              </div>
              <div className="stat-card">
                <span className={`stat-value ${gamblingData.netProfit >= 0 ? 'profit' : 'loss'}`}>
                  ${gamblingData.netProfit.toLocaleString()}
                </span>
                <span className="stat-label">Net Profit/Loss</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{gamblingData.winRate}%</span>
                <span className="stat-label">Win Rate</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{gamblingData.betsPlaced}</span>
                <span className="stat-label">Bets Placed</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{gamblingData.favoriteSport}</span>
                <span className="stat-label">Favorite Sport</span>
              </div>
            </div>
            
            <div className="charts-section">
              <div className="chart-container">
                <h3>Monthly Profit/Loss</h3>
                <div className="bar-chart">
                  {gamblingData.monthlyActivity.map((month, index) => (
                    <div className="bar-group" key={index}>
                      <div 
                        className={`bar ${month.profit >= 0 ? 'profit-bar' : 'loss-bar'}`}
                        style={{height: `${calculateBarHeight(month.profit)}%`}}
                      >
                        <span className="bar-value">${month.profit}</span>
                      </div>
                      <span className="bar-label">{month.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Improved Sports Distribution Pie Chart */}
              <div className="chart-container">
                <h3>Sports Distribution</h3>
                <div className="pie-chart">
                  <div className="pie-container" style={{
                    background: `conic-gradient(
                      ${getSportColor('NFL')} 0deg ${gamblingData.sportDistribution[0].percentage * 3.6}deg,
                      ${getSportColor('NBA')} ${gamblingData.sportDistribution[0].percentage * 3.6}deg ${(gamblingData.sportDistribution[0].percentage + gamblingData.sportDistribution[1].percentage) * 3.6}deg,
                      ${getSportColor('MLB')} ${(gamblingData.sportDistribution[0].percentage + gamblingData.sportDistribution[1].percentage) * 3.6}deg ${(gamblingData.sportDistribution[0].percentage + gamblingData.sportDistribution[1].percentage + gamblingData.sportDistribution[2].percentage) * 3.6}deg,
                      ${getSportColor('NHL')} ${(gamblingData.sportDistribution[0].percentage + gamblingData.sportDistribution[1].percentage + gamblingData.sportDistribution[2].percentage) * 3.6}deg ${(gamblingData.sportDistribution[0].percentage + gamblingData.sportDistribution[1].percentage + gamblingData.sportDistribution[2].percentage + gamblingData.sportDistribution[3].percentage) * 3.6}deg,
                      ${getSportColor('Other')} ${(gamblingData.sportDistribution[0].percentage + gamblingData.sportDistribution[1].percentage + gamblingData.sportDistribution[2].percentage + gamblingData.sportDistribution[3].percentage) * 3.6}deg 360deg
                    )`
                  }}>
                  </div>
                  <div className="pie-legend">
                    {gamblingData.sportDistribution.map((item, index) => (
                      <div className="legend-item" key={index}>
                        <div 
                          className="legend-color" 
                          style={{backgroundColor: getSportColor(item.sport)}}
                        ></div>
                        <span className="legend-label">{item.sport} ({item.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Improved Bet Type Distribution Pie Chart */}
              <div className="chart-container">
                <h3>Bet Type Distribution</h3>
                <div className="pie-chart">
                  <div className="pie-container" style={{
                    background: `conic-gradient(
                      ${getBetTypeColor('Moneyline')} 0deg ${gamblingData.betTypeDistribution[0].percentage * 3.6}deg,
                      ${getBetTypeColor('Spread')} ${gamblingData.betTypeDistribution[0].percentage * 3.6}deg ${(gamblingData.betTypeDistribution[0].percentage + gamblingData.betTypeDistribution[1].percentage) * 3.6}deg,
                      ${getBetTypeColor('Over/Under')} ${(gamblingData.betTypeDistribution[0].percentage + gamblingData.betTypeDistribution[1].percentage) * 3.6}deg ${(gamblingData.betTypeDistribution[0].percentage + gamblingData.betTypeDistribution[1].percentage + gamblingData.betTypeDistribution[2].percentage) * 3.6}deg,
                      ${getBetTypeColor('Parlay')} ${(gamblingData.betTypeDistribution[0].percentage + gamblingData.betTypeDistribution[1].percentage + gamblingData.betTypeDistribution[2].percentage) * 3.6}deg ${(gamblingData.betTypeDistribution[0].percentage + gamblingData.betTypeDistribution[1].percentage + gamblingData.betTypeDistribution[2].percentage + gamblingData.betTypeDistribution[3].percentage) * 3.6}deg,
                      ${getBetTypeColor('Prop')} ${(gamblingData.betTypeDistribution[0].percentage + gamblingData.betTypeDistribution[1].percentage + gamblingData.betTypeDistribution[2].percentage + gamblingData.betTypeDistribution[3].percentage) * 3.6}deg 360deg
                    )`
                  }}>
                  </div>
                  <div className="pie-legend">
                    {gamblingData.betTypeDistribution.map((item, index) => (
                      <div className="legend-item" key={index}>
                        <div 
                          className="legend-color" 
                          style={{backgroundColor: getBetTypeColor(item.type)}}
                        ></div>
                        <span className="legend-label">{item.type} ({item.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="responsible-gambling">
              <h3>Responsible Gambling Reminder</h3>
              <p>Remember to gamble responsibly. Set limits on your deposits and time spent gambling. If you need help, call 1-800-GAMBLER (1-800-426-2537).</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;