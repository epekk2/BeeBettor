import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';
import LiveGamesTab from './LiveGamesTab.jsx'
import './styles/LiveGamesTab.css';

function HomePage({ betSlip: propBetSlip = [], addToBetSlip: addedSlip, removeBet: removed, clearBetSlip: clearBet}) {
  const [activeTab, setActiveTab] = useState('featured');
  const [betSlip, setBetSlip] = useState([]);
  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [showRiskModal, setShowRiskModal] = useState(false);
  const [currentRiskAssessment, setCurrentRiskAssessment] = useState(null);

  const [betAmount, setBetAmount] = useState('');

  // If using local state
const [localBetSlip, setLocalBetSlip] = useState([]);

// Use props or local state for bet slip management
const effectiveBetSlip = betSlip.length > 0 ? betSlip : localBetSlip;

// Function to handle adding to bet slip 
const handleAddToBetSlip = (bet) => {
  if (addToBetSlip) {
    addToBetSlip(bet);
  } else {
    setLocalBetSlip(prev => {
      const existingBet = prev.find(b => b.id === bet.id);
      if (existingBet) return prev;
      return [...prev, bet];
    });
  }
};

  // Mock data for sports news
  const newsItems = [
    {
      id: 1,
      title: "Chiefs' star quarterback injured during practice",
      content: "Team reports it's a minor strain, expected to play Sunday",
      source: "ESPN",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Lakers acquire veteran point guard in trade",
      content: "Deal finalized ahead of tomorrow's deadline",
      source: "Sports Center",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "MLB announces new rule changes for next season",
      content: "Pitch clock adjustments and other modifications coming",
      source: "MLB Network",
      timestamp: "Yesterday"
    }
  ];

  // Mock data for upcoming games with multiple sportsbook odds
  const upcomingGames = [
    {
      id: 1,
      league: 'NFL',
      teams: { home: 'Chicago Bears', away: 'Green Bay Packers' },
      time: 'Today, 7:30 PM',
      odds: { 
        draftkings: { home: '+150', away: '-180', draw: '+450' },
        fanduel: { home: '+155', away: '-175', draw: '+460' },
        espnbet: { home: '+145', away: '-190', draw: '+440' },
        caesars: { home: '+160', away: '-170', draw: '+450' },
        bestOdds: { home: '+160', away: '-170', draw: '+460' }
      }
    },
    {
      id: 2,
      league: 'NBA',
      teams: { home: 'Los Angeles Lakers', away: 'Brooklyn Nets' },
      time: 'Today, 9:00 PM',
      odds: { 
        draftkings: { home: '-120', away: '+110', draw: null },
        fanduel: { home: '-115', away: '+105', draw: null },
        espnbet: { home: '-125', away: '+115', draw: null },
        caesars: { home: '-120', away: '+110', draw: null },
        bestOdds: { home: '-115', away: '+115', draw: null }
      }
    },
    {
      id: 3,
      league: 'MLB',
      teams: { home: 'New York Yankees', away: 'Boston Red Sox' },
      time: 'Tomorrow, 6:15 PM',
      odds: { 
        draftkings: { home: '-110', away: '-110', draw: null },
        fanduel: { home: '-108', away: '-112', draw: null },
        espnbet: { home: '-110', away: '-110', draw: null },
        caesars: { home: '-105', away: '-115', draw: null },
        bestOdds: { home: '-105', away: '-110', draw: null }
      }
    },
    {
      id: 4,
      league: 'NHL',
      teams: { home: 'Vegas Golden Knights', away: 'Toronto Maple Leafs' },
      time: 'Tomorrow, 8:00 PM',
      odds: { 
        draftkings: { home: '+130', away: '-150', draw: '+350' },
        fanduel: { home: '+125', away: '-145', draw: '+360' },
        espnbet: { home: '+135', away: '-155', draw: '+340' },
        caesars: { home: '+130', away: '-150', draw: '+350' },
        bestOdds: { home: '+135', away: '-145', draw: '+360' }
      }
    },
    {
      id: 5,
      league: 'UFC',
      teams: { home: 'Jon Jones', away: 'Francis Ngannou' },
      time: 'Saturday, 10:00 PM',
      odds: { 
        draftkings: { home: '-150', away: '+125', draw: '+1200' },
        fanduel: { home: '-155', away: '+130', draw: '+1100' },
        espnbet: { home: '-145', away: '+120', draw: '+1250' },
        caesars: { home: '-150', away: '+125', draw: '+1200' },
        bestOdds: { home: '-145', away: '+130', draw: '+1250' }
      }
    }
  ];

  // Mock data for popular bets
  const popularBets = [
    {
      id: 101,
      type: 'Same Game Parlay',
      description: 'Bears to win & over 42.5 points',
      odds: '+300'
    },
    {
      id: 102,
      type: 'Player Prop',
      description: 'LeBron James over 27.5 points',
      odds: '-110'
    },
    {
      id: 103,
      type: 'Futures',
      description: 'Chiefs to win Super Bowl',
      odds: '+600'
    }
  ];

  const [activeSportsbook, setActiveSportsbook] = useState('bestOdds');
  const [showOddsDropdown, setShowOddsDropdown] = useState({});
  
  const toggleOddsDropdown = (gameId, betType) => {
    const key = `${gameId}-${betType}`;
    setShowOddsDropdown(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const selectSportsbook = (sportsbook, gameId, betType, selection) => {
    // In a real app, this would set the selected sportsbook for this specific bet
    console.log(`Selected ${sportsbook} for ${gameId} ${betType} ${selection}`);
    // Close the dropdown
    toggleOddsDropdown(gameId, betType);
    // Add to betslip with the selected sportsbook
    addToBetSlip(gameId, betType, selection, sportsbook);
  };

  const addToBetSlip = (gameId, betType, selection, sportsbook) => {
    // Find the game
    const game = upcomingGames.find(g => g.id === gameId);
    if (!game) return;
    
    const newBet = {
      id: `${gameId}-${betType}-${selection}-${sportsbook}`,
      game: game,
      type: betType,
      selection: selection,
      odds: game.odds[sportsbook][selection],
      sportsbook: sportsbook
    };
    setBetSlip([...betSlip, newBet]);
  };

  const removeBet = (betId) => {
    setBetSlip(betSlip.filter(bet => bet.id !== betId));
  };

  // Add effect to check window size
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateRiskLevel = (game) => {
    // In a real app, this would be a much more sophisticated algorithm
    // this is just mock information
    
    // simple calculations for odds
    const homeOdds = parseFloat(game.odds.bestOdds.home.replace('+', ''));
    const awayOdds = parseFloat(game.odds.bestOdds.away.replace('+', ''));
    
    let riskLevel = 'Medium';
    let riskScore = 50;
    let riskFactors = [];
    let opportunityFactors = [];
    
    // Determine risk based on odds
    if (homeOdds > 200 || awayOdds > 200) {
      riskLevel = 'High';
      riskScore = 75;
      riskFactors.push('Significant underdog in this matchup');
    } else if (homeOdds < -200 || awayOdds < -200) {
      riskLevel = 'Low';
      riskScore = 25;
      riskFactors.push('Heavy favorite in this matchup');
      opportunityFactors.push('Consider parlay to increase potential return');
    }
    
    // League-specific risk factors
    switch(game.league) {
      case 'NFL':
        riskFactors.push('High variance in NFL games this season');
        opportunityFactors.push('Home teams have won 60% of games this season');
        break;
      case 'NBA':
        riskFactors.push('Key player injury concerns');
        opportunityFactors.push('Teams on back-to-back games tend to underperform');
        break;
      case 'MLB':
        riskFactors.push('Starting pitcher advantage can shift odds');
        opportunityFactors.push('Bullpen advantage in late-game situations');
        break;
      case 'NHL':
        riskFactors.push('Overtime games add unpredictability');
        opportunityFactors.push('Home ice advantage is significant');
        break;
      default:
        riskFactors.push('Limited historical data to assess risk');
        break;
    }
    
    // Add sports betting pattern insights
    if (game.time.includes('Today')) {
      opportunityFactors.push('Public tends to overbet favorites on game day');
    }
    
    return {
      game: game,
      riskLevel: riskLevel,
      riskScore: riskScore,
      riskFactors: riskFactors,
      opportunityFactors: opportunityFactors
    };
  };
  
  const openRiskAssessment = (game) => {
    const assessment = calculateRiskLevel(game);
    setCurrentRiskAssessment(assessment);
    setShowRiskModal(true);
  };
  
  const closeRiskModal = () => {
    setShowRiskModal(false);
  };

  const placeBet = () => {
    // Get the bet amount from the input field
    const betAmountElement = document.querySelector('.amount-input input');
    const betAmount = betAmountElement ? parseFloat(betAmountElement.value) : 0;
    
    if (betSlip.length === 0) {
      alert('Your bet slip is empty. Please add selections before placing a bet.');
      return;
    }
    
    if (!betAmount || betAmount <= 0) {
      alert('Please enter a valid bet amount.');
      return;
    }
    
    // Calculate potential winnings 
    let potentialWinnings = 0;
    let odds = 0;
    
    // Calculate 
    betSlip.forEach(bet => {
      const betOdds = parseFloat(bet.odds.replace('+', ''));
      if (bet.odds.startsWith('+')) {
        // Positive odds (underdog)
        potentialWinnings += betAmount * (betOdds / 100);
      } else {
        // Negative odds (favorite)
        potentialWinnings += betAmount * (100 / Math.abs(betOdds));
      }
      odds = betOdds;
    });
    
    // Show confirmation
    alert(`Bet placed successfully!\nAmount: $${betAmount.toFixed(2)}\nPotential Winnings: $${potentialWinnings.toFixed(2)}`);
    
    // Clear the bet slip after successful placement
    setBetSlip([]);
  };

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

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🐝</span>
          <h1>beeBettor</h1>
        </div>
        <h1> Dashboard </h1>
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
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="desktop-nav">
          <div className="nav-left">
            <Link to="/home" className="nav-link active">Home</Link>
            <Link to="/sports" className="nav-link">Sports</Link>
            <Link to="/live" className="nav-link">Live Betting</Link>
            <Link to="/promotions" className="nav-link">Promotions</Link>
          </div>
          <div className="nav-right">
            <Link to="/search" className="nav-link">Search</Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Games */}
        <div className="games-section">
          <div className="promo-banner">
            <h2>Welcome Bonus</h2>
            <p>Get up to $500 in free bets when you make your first deposit!</p>
            <button className="btn">Claim Now</button>
          </div>

          {/* Live Game Highlight */}
          <div className="live-highlight">
            <div className="live-tag">LIVE</div>
            <div className="game-info">
              <div className="teams">
                <span className="team">Philadelphia Eagles</span>
                <span className="score">21</span>
              </div>
              <div className="game-timer">
                <span>Q3 | 5:24</span>
              </div>
              <div className="teams">
                <span className="team">Dallas Cowboys</span>
                <span className="score">17</span>
              </div>
            </div>
            <div className="betting-options">
              <div className="bet-dropdown-container">
                <button 
                  className="bet-btn live-bet" 
                  onClick={() => toggleOddsDropdown(999, 'eagles-live')}
                >
                  Eagles Win <span className="odds">-110</span>
                  <span className="dropdown-icon">▼</span>
                </button>
                {showOddsDropdown[`999-eagles-live`] && (
                  <div className="odds-dropdown">
                    <div className="dropdown-header">
                      <span>Select Sportsbook</span>
                      <button 
                        className="close-dropdown"
                        onClick={() => toggleOddsDropdown(999, 'eagles-live')}
                      >×</button>
                    </div>
                    <div className="dropdown-options">
                      <div className="sportsbook-option" onClick={() => selectSportsbook('draftkings', 999, 'moneyline', 'home')}>
                        <span className="sportsbook-name">DraftKings</span>
                        <span className="sportsbook-odds">-110</span>
                      </div>
                      <div className="sportsbook-option" onClick={() => selectSportsbook('fanduel', 999, 'moneyline', 'home')}>
                        <span className="sportsbook-name">FanDuel</span>
                        <span className="sportsbook-odds">-105</span>
                      </div>
                      <div className="sportsbook-option best-odds" onClick={() => selectSportsbook('espnbet', 999, 'moneyline', 'home')}>
                        <span className="sportsbook-name">ESPN BET</span>
                        <span className="sportsbook-odds">-100</span>
                        <span className="best-odds-badge">Best</span>
                      </div>
                      <div className="sportsbook-option" onClick={() => selectSportsbook('caesars', 999, 'moneyline', 'home')}>
                        <span className="sportsbook-name">Caesars</span>
                        <span className="sportsbook-odds">-115</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bet-dropdown-container">
                <button 
                  className="bet-btn live-bet"
                  onClick={() => toggleOddsDropdown(999, 'cowboys-live')}
                >
                  Cowboys Win <span className="odds">+105</span>
                  <span className="dropdown-icon">▼</span>
                </button>
                {showOddsDropdown[`999-cowboys-live`] && (
                  <div className="odds-dropdown">
                    <div className="dropdown-header">
                      <span>Select Sportsbook</span>
                      <button 
                        className="close-dropdown"
                        onClick={() => toggleOddsDropdown(999, 'cowboys-live')}
                      >×</button>
                    </div>
                    <div className="dropdown-options">
                      <div className="sportsbook-option" onClick={() => selectSportsbook('draftkings', 999, 'moneyline', 'away')}>
                        <span className="sportsbook-name">DraftKings</span>
                        <span className="sportsbook-odds">+100</span>
                      </div>
                      <div className="sportsbook-option" onClick={() => selectSportsbook('fanduel', 999, 'moneyline', 'away')}>
                        <span className="sportsbook-name">FanDuel</span>
                        <span className="sportsbook-odds">+105</span>
                      </div>
                      <div className="sportsbook-option best-odds" onClick={() => selectSportsbook('espnbet', 999, 'moneyline', 'away')}>
                        <span className="sportsbook-name">ESPN BET</span>
                        <span className="sportsbook-odds">+110</span>
                        <span className="best-odds-badge">Best</span>
                      </div>
                      <div className="sportsbook-option" onClick={() => selectSportsbook('caesars', 999, 'moneyline', 'away')}>
                        <span className="sportsbook-name">Caesars</span>
                        <span className="sportsbook-odds">+105</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="game-card-footer">
              <button className="more-options-btn">More Bets</button>
              <button 
                className="risk-assessment-btn" 
                onClick={() => openRiskAssessment({
                  id: 999,
                  league: 'NFL',
                  teams: { home: 'Philadelphia Eagles', away: 'Dallas Cowboys' },
                  time: 'LIVE | Q3 | 5:24',
                  odds: { 
                    bestOdds: { home: '-110', away: '+105' }
                  }
                })}
                title="View Risk Assessment"
              >
                <span className="risk-icon">📊</span>
              </button>
            </div>
          </div>

                        {/* Upcoming Games */}
          <h2 className="section-title">Upcoming Games</h2>
          <div className="game-list">
            {upcomingGames.map(game => (
              <div className="game-card" key={game.id}>
                <div className="game-header">
                  <span className="league-badge">{game.league}</span>
                  <span className="game-time">{game.time}</span>
                </div>
                <div className="matchup">
                  <div className="team">{game.teams.away}</div>
                  <div className="team">{game.teams.home}</div>
                </div>
                <div className="betting-options">
                  <div className="bet-dropdown-container">
                    <button 
                      className="bet-btn" 
                      onClick={() => toggleOddsDropdown(game.id, 'away')}
                    >
                      <span className="odds">{game.odds[activeSportsbook].away}</span>
                      <span className="dropdown-icon">▼</span>
                    </button>
                    {showOddsDropdown[`${game.id}-away`] && (
                      <div className="odds-dropdown">
                        <div className="dropdown-header">
                          <span>Select Sportsbook</span>
                          <button 
                            className="close-dropdown"
                            onClick={() => toggleOddsDropdown(game.id, 'away')}
                          >×</button>
                        </div>
                        <div className="dropdown-options">
                          <div className="sportsbook-option" onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'away')}>
                            <span className="sportsbook-name">DraftKings</span>
                            <span className="sportsbook-odds">{game.odds.draftkings.away}</span>
                          </div>
                          <div className="sportsbook-option" onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'away')}>
                            <span className="sportsbook-name">FanDuel</span>
                            <span className="sportsbook-odds">{game.odds.fanduel.away}</span>
                          </div>
                          <div className="sportsbook-option" onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'away')}>
                            <span className="sportsbook-name">ESPN BET</span>
                            <span className="sportsbook-odds">{game.odds.espnbet.away}</span>
                          </div>
                          <div className="sportsbook-option" onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'away')}>
                            <span className="sportsbook-name">Caesars</span>
                            <span className="sportsbook-odds">{game.odds.caesars.away}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {game.odds[activeSportsbook].draw && (
                    <div className="bet-dropdown-container">
                      <button 
                        className="bet-btn"
                        onClick={() => toggleOddsDropdown(game.id, 'draw')}
                      >
                        <span className="odds">{game.odds[activeSportsbook].draw}</span>
                        <span className="dropdown-icon">▼</span>
                      </button>
                      {showOddsDropdown[`${game.id}-draw`] && (
                        <div className="odds-dropdown">
                          <div className="dropdown-header">
                            <span>Select Sportsbook</span>
                            <button 
                              className="close-dropdown"
                              onClick={() => toggleOddsDropdown(game.id, 'draw')}
                            >×</button>
                          </div>
                          <div className="dropdown-options">
                            <div className="sportsbook-option" onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'draw')}>
                              <span className="sportsbook-name">DraftKings</span>
                              <span className="sportsbook-odds">{game.odds.draftkings.draw}</span>
                            </div>
                            <div className="sportsbook-option" onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'draw')}>
                              <span className="sportsbook-name">FanDuel</span>
                              <span className="sportsbook-odds">{game.odds.fanduel.draw}</span>
                            </div>
                            <div className="sportsbook-option" onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'draw')}>
                              <span className="sportsbook-name">ESPN BET</span>
                              <span className="sportsbook-odds">{game.odds.espnbet.draw}</span>
                            </div>
                            <div className="sportsbook-option" onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'draw')}>
                              <span className="sportsbook-name">Caesars</span>
                              <span className="sportsbook-odds">{game.odds.caesars.draw}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="bet-dropdown-container">
                    <button 
                      className="bet-btn"
                      onClick={() => toggleOddsDropdown(game.id, 'home')}
                    >
                      <span className="odds">{game.odds[activeSportsbook].home}</span>
                      <span className="dropdown-icon">▼</span>
                    </button>
                    {showOddsDropdown[`${game.id}-home`] && (
                      <div className="odds-dropdown">
                        <div className="dropdown-header">
                          <span>Select Sportsbook</span>
                          <button 
                            className="close-dropdown"
                            onClick={() => toggleOddsDropdown(game.id, 'home')}
                          >×</button>
                        </div>
                        <div className="dropdown-options">
                          <div className="sportsbook-option" onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'home')}>
                            <span className="sportsbook-name">DraftKings</span>
                            <span className="sportsbook-odds">{game.odds.draftkings.home}</span>
                          </div>
                          <div className="sportsbook-option" onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'home')}>
                            <span className="sportsbook-name">FanDuel</span>
                            <span className="sportsbook-odds">{game.odds.fanduel.home}</span>
                          </div>
                          <div className="sportsbook-option" onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'home')}>
                            <span className="sportsbook-name">ESPN BET</span>
                            <span className="sportsbook-odds">{game.odds.espnbet.home}</span>
                          </div>
                          <div className="sportsbook-option" onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'home')}>
                            <span className="sportsbook-name">Caesars</span>
                            <span className="sportsbook-odds">{game.odds.caesars.home}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="game-card-footer">
                  <button className="more-options-btn">More Bets</button>
                  <button 
                    className="risk-assessment-btn" 
                    onClick={() => openRiskAssessment(game)}
                    title="View Risk Assessment"
                  >
                    <span className="risk-icon">📊</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Bets */}
          <h2 className="section-title">Popular Bets</h2>
          <div className="popular-bets">
            {popularBets.map(bet => (
              <div className="popular-bet-card" key={bet.id}>
                <div className="bet-info">
                  <span className="bet-type">{bet.type}</span>
                  <span className="bet-desc">{bet.description}</span>
                </div>
                <div className="bet-dropdown-container compact">
                  <button 
                    className="bet-btn small"
                    onClick={() => toggleOddsDropdown(bet.id, 'popular')}
                  >
                    <span className="odds">{bet.odds}</span>
                    <span className="dropdown-icon">▼</span>
                  </button>
                  {showOddsDropdown[`${bet.id}-popular`] && (
                    <div className="odds-dropdown">
                      <div className="dropdown-header">
                        <span>Select Sportsbook</span>
                        <button 
                          className="close-dropdown"
                          onClick={() => toggleOddsDropdown(bet.id, 'popular')}
                        >×</button>
                      </div>
                      <div className="dropdown-options">
                        <div className="sportsbook-option">
                          <span className="sportsbook-name">DraftKings</span>
                          <span className="sportsbook-odds">{bet.odds === '+300' ? '+280' : bet.odds === '-110' ? '-115' : '+550'}</span>
                        </div>
                        <div className="sportsbook-option">
                          <span className="sportsbook-name">FanDuel</span>
                          <span className="sportsbook-odds">{bet.odds === '+300' ? '+290' : bet.odds === '-110' ? '-110' : '+600'}</span>
                        </div>
                        <div className="sportsbook-option best-odds">
                          <span className="sportsbook-name">ESPN BET</span>
                          <span className="sportsbook-odds">{bet.odds === '+300' ? '+300' : bet.odds === '-110' ? '-105' : '+600'}</span>
                          <span className="best-odds-badge">Best</span>
                        </div>
                        <div className="sportsbook-option">
                          <span className="sportsbook-name">Caesars</span>
                          <span className="sportsbook-odds">{bet.odds === '+300' ? '+290' : bet.odds === '-110' ? '-110' : '+580'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bet-card-actions">
                  <button 
                    className="risk-assessment-btn small" 
                    onClick={() => openRiskAssessment({
                      id: bet.id,
                      league: bet.type,
                      teams: { home: '', away: '' },
                      description: bet.description,
                      time: 'Varies',
                      odds: { 
                        bestOdds: { home: bet.odds, away: '' }
                      }
                    })}
                    title="View Risk Assessment"
                  >
                    <span className="risk-icon">📊</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Bet Slip and news*/}\
        <div className="bet-slip-and-news">
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
                      <span className="bet-type">{bet.type}</span>
                      <button className="remove-btn" onClick={() => removeBet(bet.id)}>✕</button>
                    </div>
                    <div className="bet-selection-details">
                      {bet.game.teams && (
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
                <button className="btn-outline">Clear Slip</button>
              </div>
            </>
          )}
        </div>
        {/* Game News Section */}
        <div className="game-news">
          <h2 className="news-title">Sports News</h2>
          <div className="news-list">
            {newsItems.map(item => (
              <div className="news-item" key={item.id}>
                <div className="news-header">
                  <h3 className="news-headline">{item.title}</h3>
                  <span className="news-time">{item.timestamp}</span>
                </div>
                <p className="news-content">{item.content}</p>
                <div className="news-footer">
                  <span className="news-source">{item.source}</span>
                  <button className="news-read-more">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Footer Navigation - Only shown on mobile */}
      {isMobile && (
        <nav className="footer-nav">
          <Link to="/home" className="nav-item active">
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
          <Link to="/bets" className="nav-item">
            <span className="nav-icon">📝</span>
            <span>My Bets</span>
          </Link>
          <Link to="/" className="nav-item">
            <span className="nav-icon">👤</span>
            <span>Account</span>
          </Link>
        </nav>
      )}

      {showRiskModal && currentRiskAssessment && (
        <div className="risk-modal-overlay" onClick={closeRiskModal}>
          <div className="risk-modal" onClick={e => e.stopPropagation()}>
            <div className="risk-modal-header">
              <h2>Risk Assessment</h2>
              <button className="close-modal" onClick={closeRiskModal}>×</button>
            </div>
            
            <div className="risk-modal-content">
              <div className="risk-game-details">
                <div className="risk-league">{currentRiskAssessment.game.league}</div>
                <div className="risk-matchup">
                  {currentRiskAssessment.game.teams.away} vs {currentRiskAssessment.game.teams.home}
                </div>
                <div className="risk-time">{currentRiskAssessment.game.time}</div>
              </div>
              
              <div className="risk-level-indicator">
                <h3>Overall Risk Level: <span className={`risk-level-${currentRiskAssessment.riskLevel.toLowerCase()}`}>
                  {currentRiskAssessment.riskLevel}
                </span></h3>
                
                <div className="risk-meter-container">
                  <div className="risk-meter">
                    <div className="risk-meter-low">Low</div>
                    <div className="risk-meter-medium">Medium</div>
                    <div className="risk-meter-high">High</div>
                  </div>
                  <div 
                    className="risk-meter-indicator" 
                    style={{left: `${currentRiskAssessment.riskScore}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="risk-factors-section">
                <h3>Risk Factors to Consider</h3>
                <ul className="risk-factors-list">
                  {currentRiskAssessment.riskFactors.map((factor, index) => (
                    <li key={`risk-${index}`} className="risk-factor">
                      <span className="risk-icon">⚠️</span> {factor}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="opportunity-factors-section">
                <h3>Potential Opportunities</h3>
                <ul className="opportunity-factors-list">
                  {currentRiskAssessment.opportunityFactors.map((factor, index) => (
                    <li key={`opp-${index}`} className="opportunity-factor">
                      <span className="opportunity-icon">💡</span> {factor}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="risk-chart-container">
                <h3>Risk vs. Reward Chart</h3>
                <div className="risk-chart">
                  {/* This would be a real chart in a full implementation */}
                  <div className="chart-quadrants">
                    <div className="chart-quadrant high-risk-high-reward">
                      High Risk<br/>High Reward
                    </div>
                    <div className="chart-quadrant low-risk-high-reward">
                      Low Risk<br/>High Reward
                    </div>
                    <div className="chart-quadrant high-risk-low-reward">
                      High Risk<br/>Low Reward
                    </div>
                    <div className="chart-quadrant low-risk-low-reward">
                      Low Risk<br/>Low Reward
                    </div>
                  </div>
                  <div 
                    className="bet-position-indicator"
                    style={{
                      left: `${currentRiskAssessment.riskScore}%`,
                      bottom: `${currentRiskAssessment.riskLevel === 'High' ? 70 : 
                              currentRiskAssessment.riskLevel === 'Medium' ? 50 : 30}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="risk-modal-footer">
              <button className="btn btn-outline" onClick={closeRiskModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;