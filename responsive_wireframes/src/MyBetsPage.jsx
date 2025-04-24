import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/MyBetsPage.css';

function MyBetsPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Mock data for active bets
  const activeBets = [
    {
      id: 1,
      type: 'Moneyline',
      event: 'Philadelphia Eagles vs Dallas Cowboys',
      selection: 'Philadelphia Eagles',
      odds: '-110',
      stake: 100,
      potentialWin: 90.91,
      sportsbook: 'ESPN BET',
      placedOn: 'April 23, 2025',
      status: 'Active',
      eventTime: 'Today, 8:30 PM'
    },
    {
      id: 2,
      type: 'Over/Under',
      event: 'Los Angeles Lakers vs Brooklyn Nets',
      selection: 'Over 224.5',
      odds: '-115',
      stake: 50,
      potentialWin: 43.48,
      sportsbook: 'DraftKings',
      placedOn: 'April 22, 2025',
      status: 'Active',
      eventTime: 'Tomorrow, 9:00 PM'
    },
    {
      id: 3,
      type: 'Parlay',
      event: 'Multiple Events',
      selection: '3-Leg Parlay',
      odds: '+650',
      stake: 200,
      potentialWin: 1500,
      sportsbook: 'FanDuel',
      placedOn: 'April 21, 2025',
      status: 'Active',
      eventTime: 'April 25, 2025'
    }
  ];

  // Mock data for completed bets
  const completedBets = [
    {
      id: 4,
      type: 'Moneyline',
      event: 'Chicago Bears vs Green Bay Packers',
      selection: 'Chicago Bears',
      odds: '+150',
      stake: 100,
      potentialWin: 150,
      actualWin: 150,
      sportsbook: 'Caesars',
      placedOn: 'April 16, 2025',
      status: 'Won',
      completedOn: 'April 17, 2025'
    },
    {
      id: 5,
      type: 'Spread',
      event: 'New York Yankees vs Boston Red Sox',
      selection: 'Yankees -1.5',
      odds: '-110',
      stake: 110,
      potentialWin: 100,
      actualWin: 0,
      sportsbook: 'DraftKings',
      placedOn: 'April 15, 2025',
      status: 'Lost',
      completedOn: 'April 15, 2025'
    },
    {
      id: 6,
      type: 'Prop Bet',
      event: 'Vegas Golden Knights vs Toronto Maple Leafs',
      selection: 'Mark Stone Anytime Goalscorer',
      odds: '+200',
      stake: 50,
      potentialWin: 100,
      actualWin: 100,
      sportsbook: 'ESPN BET',
      placedOn: 'April 12, 2025',
      status: 'Won',
      completedOn: 'April 12, 2025'
    },
    {
      id: 7,
      type: 'Parlay',
      event: 'Multiple Events',
      selection: '4-Leg Parlay',
      odds: '+1200',
      stake: 100,
      potentialWin: 1300,
      actualWin: 0,
      sportsbook: 'FanDuel',
      placedOn: 'April 10, 2025',
      status: 'Lost',
      completedOn: 'April 11, 2025'
    },
    {
      id: 8,
      type: 'Future',
      event: 'NBA Championship 2024-25',
      selection: 'Boston Celtics',
      odds: '+450',
      stake: 200,
      potentialWin: 1100,
      actualWin: 1100,
      sportsbook: 'Caesars',
      placedOn: 'October 15, 2024',
      status: 'Won',
      completedOn: 'April 5, 2025'
    }
  ];

  // Add effect to check window size
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate statistics
  const totalBets = activeBets.length + completedBets.length;
  const wonBets = completedBets.filter(bet => bet.status === 'Won').length;
  const winRate = Math.round((wonBets / completedBets.length) * 100);
  const totalWinnings = completedBets.reduce((sum, bet) => sum + bet.actualWin, 0);
  const totalStaked = [...activeBets, ...completedBets].reduce((sum, bet) => sum + bet.stake, 0);
  const roi = Math.round(((totalWinnings / totalStaked) * 100) - 100);

  return (
    <div className="mybets-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🐝</span>
          <h1>beeBettor</h1>
        </div>
        <h1>My Bets</h1>
        <div className="account-info">
          <div className="balance">
            <span>Balance</span>
            <strong>$1,250,000.00</strong>
          </div>
          <Link to="/home" className="btn">Home</Link>
          <Link to="/bets" className="btn btn-green">My Bets</Link>
          <Link to="/" className="btn">Account</Link>
        </div>
      </header>
      
      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <span className="stat-value">{totalBets}</span>
          <span className="stat-label">Total Bets</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{winRate}%</span>
          <span className="stat-label">Win Rate</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">${totalWinnings.toFixed(2)}</span>
          <span className="stat-label">Total Winnings</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{roi > 0 ? '+' : ''}{roi}%</span>
          <span className="stat-label">ROI</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Bets
        </button>
        <button 
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Bets
        </button>
      </div>

      {/* Bets Container */}
      <div className="bets-container">
        {activeTab === 'active' ? (
          // Active Bets
          activeBets.length > 0 ? (
            <div className="bet-list">
              {activeBets.map(bet => (
                <div className="bet-card" key={bet.id}>
                  <div className="bet-header">
                    <div className="bet-type-badge">{bet.type}</div>
                    <div className="bet-time">{bet.eventTime}</div>
                  </div>
                  <div className="bet-details">
                    <div className="bet-event">{bet.event}</div>
                    <div className="bet-selection">
                      <span className="selection-label">Your Pick:</span>
                      <span className="selection-value">{bet.selection}</span>
                    </div>
                    <div className="bet-odds-stake">
                      <div className="bet-odds">
                        <span className="odds-label">Odds:</span>
                        <span className="odds-value">{bet.odds}</span>
                      </div>
                      <div className="bet-stake">
                        <span className="stake-label">Stake:</span>
                        <span className="stake-value">${bet.stake.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="bet-potential">
                      <span className="potential-label">Potential Win:</span>
                      <span className="potential-value">${bet.potentialWin.toFixed(2)}</span>
                    </div>
                    <div className="bet-footer">
                      <div className="sportsbook-tag">
                        <span>{bet.sportsbook}</span>
                      </div>
                      <div className="bet-placed">
                        <span>Placed: {bet.placedOn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-bets-message">
              <p>You don't have any active bets. Ready to make some picks?</p>
              <Link to="/" className="btn">Place a Bet</Link>
            </div>
          )
        ) : (
          // Completed Bets
          completedBets.length > 0 ? (
            <div className="bet-list">
              {completedBets.map(bet => (
                <div className={`bet-card ${bet.status.toLowerCase()}`} key={bet.id}>
                  <div className="bet-header">
                    <div className="bet-type-badge">{bet.type}</div>
                    <div className={`bet-status-badge ${bet.status.toLowerCase()}`}>
                      {bet.status}
                    </div>
                  </div>
                  <div className="bet-details">
                    <div className="bet-event">{bet.event}</div>
                    <div className="bet-selection">
                      <span className="selection-label">Your Pick:</span>
                      <span className="selection-value">{bet.selection}</span>
                    </div>
                    <div className="bet-odds-stake">
                      <div className="bet-odds">
                        <span className="odds-label">Odds:</span>
                        <span className="odds-value">{bet.odds}</span>
                      </div>
                      <div className="bet-stake">
                        <span className="stake-label">Stake:</span>
                        <span className="stake-value">${bet.stake.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="bet-result">
                      <span className="result-label">Result:</span>
                      <span className="result-value">
                        {bet.status === 'Won' ? `Won $${bet.actualWin.toFixed(2)}` : 'Lost'}
                      </span>
                    </div>
                    <div className="bet-footer">
                      <div className="sportsbook-tag">
                        <span>{bet.sportsbook}</span>
                      </div>
                      <div className="bet-completed">
                        <span>Completed: {bet.completedOn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-bets-message">
              <p>You don't have any completed bets yet.</p>
              <Link to="/" className="btn">Place Your First Bet</Link>
            </div>
          )
        )}
      </div>

      {/* Footer Navigation - Only shown on mobile */}
      {isMobile && (
        <nav className="footer-nav">
          <Link to="/" className="nav-item">
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link to="/search" className="nav-item">
            <span className="nav-icon">🔍</span>
            <span>Search</span>
          </Link>
          <Link to="/live" className="nav-item">
            <span className="nav-icon">📡</span>
            <span>Live</span>
          </Link>
          <Link to="/my-bets" className="nav-item active">
            <span className="nav-icon">📝</span>
            <span>My Bets</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <span className="nav-icon">👤</span>
            <span>Account</span>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default MyBetsPage;