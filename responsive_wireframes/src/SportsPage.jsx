import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/SportsPage.css';
import BetSlip from './BetSlip.jsx';

function SportsPage({ betSlip = [], addToBetSlip, removeBet, clearBetSlip}) {
  // State for active sport filter
  const [activeSport, setActiveSport] = useState('all');
  // State for mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // State for odds dropdowns
  const [showOddsDropdown, setShowOddsDropdown] = useState({});
  // State for bet amount
  const [betAmount, setBetAmount] = useState('');
  // State for risk modal
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [currentRiskAssessment, setCurrentRiskAssessment] = useState(null);

  // Mock data for different sports
  const sportsData = {
    football: [
      {
        id: 101,
        league: 'NFL',
        teams: { home: 'Kansas City Chiefs', away: 'Buffalo Bills' },
        time: 'Sunday, 4:25 PM',
        odds: { 
          draftkings: { home: '-135', away: '+115', draw: null },
          fanduel: { home: '-130', away: '+110', draw: null },
          espnbet: { home: '-140', away: '+120', draw: null },
          caesars: { home: '-135', away: '+115', draw: null },
          bestOdds: { home: '-130', away: '+120', draw: null }
        }
      },
      {
        id: 102,
        league: 'NFL',
        teams: { home: 'San Francisco 49ers', away: 'Dallas Cowboys' },
        time: 'Sunday, 8:20 PM',
        odds: { 
          draftkings: { home: '-175', away: '+150', draw: null },
          fanduel: { home: '-170', away: '+145', draw: null },
          espnbet: { home: '-180', away: '+155', draw: null },
          caesars: { home: '-175', away: '+150', draw: null },
          bestOdds: { home: '-170', away: '+155', draw: null }
        }
      },
      {
        id: 103,
        league: 'NCAAF',
        teams: { home: 'Alabama Crimson Tide', away: 'Georgia Bulldogs' },
        time: 'Saturday, 3:30 PM',
        odds: { 
          draftkings: { home: '+110', away: '-130', draw: null },
          fanduel: { home: '+115', away: '-135', draw: null },
          espnbet: { home: '+105', away: '-125', draw: null },
          caesars: { home: '+110', away: '-130', draw: null },
          bestOdds: { home: '+115', away: '-125', draw: null }
        }
      }
    ],
    basketball: [
      {
        id: 201,
        league: 'NBA',
        teams: { home: 'Boston Celtics', away: 'Los Angeles Lakers' },
        time: 'Tonight, 7:30 PM',
        odds: { 
          draftkings: { home: '-200', away: '+170', draw: null },
          fanduel: { home: '-205', away: '+175', draw: null },
          espnbet: { home: '-195', away: '+165', draw: null },
          caesars: { home: '-200', away: '+170', draw: null },
          bestOdds: { home: '-195', away: '+175', draw: null }
        }
      },
      {
        id: 202,
        league: 'NBA',
        teams: { home: 'Golden State Warriors', away: 'Phoenix Suns' },
        time: 'Tomorrow, 10:00 PM',
        odds: { 
          draftkings: { home: '-115', away: '-105', draw: null },
          fanduel: { home: '-110', away: '-110', draw: null },
          espnbet: { home: '-120', away: '+100', draw: null },
          caesars: { home: '-115', away: '-105', draw: null },
          bestOdds: { home: '-110', away: '+100', draw: null }
        }
      }
    ],
    baseball: [
      {
        id: 301,
        league: 'MLB',
        teams: { home: 'New York Yankees', away: 'Boston Red Sox' },
        time: 'Tonight, 7:05 PM',
        odds: { 
          draftkings: { home: '-150', away: '+130', draw: null },
          fanduel: { home: '-145', away: '+125', draw: null },
          espnbet: { home: '-155', away: '+135', draw: null },
          caesars: { home: '-150', away: '+130', draw: null },
          bestOdds: { home: '-145', away: '+135', draw: null }
        }
      },
      {
        id: 302,
        league: 'MLB',
        teams: { home: 'Los Angeles Dodgers', away: 'San Francisco Giants' },
        time: 'Tonight, 10:10 PM',
        odds: { 
          draftkings: { home: '-180', away: '+160', draw: null },
          fanduel: { home: '-175', away: '+155', draw: null },
          espnbet: { home: '-185', away: '+165', draw: null },
          caesars: { home: '-180', away: '+160', draw: null },
          bestOdds: { home: '-175', away: '+165', draw: null }
        }
      }
    ],
    hockey: [
      {
        id: 401,
        league: 'NHL',
        teams: { home: 'Toronto Maple Leafs', away: 'Montreal Canadiens' },
        time: 'Tomorrow, 7:00 PM',
        odds: { 
          draftkings: { home: '-160', away: '+140', draw: null },
          fanduel: { home: '-155', away: '+135', draw: null },
          espnbet: { home: '-165', away: '+145', draw: null },
          caesars: { home: '-160', away: '+140', draw: null },
          bestOdds: { home: '-155', away: '+145', draw: null }
        }
      }
    ],
    soccer: [
      {
        id: 501,
        league: 'Premier League',
        teams: { home: 'Manchester United', away: 'Liverpool' },
        time: 'Saturday, 10:00 AM',
        odds: { 
          draftkings: { home: '+180', away: '+150', draw: '+220' },
          fanduel: { home: '+185', away: '+145', draw: '+225' },
          espnbet: { home: '+175', away: '+155', draw: '+215' },
          caesars: { home: '+180', away: '+150', draw: '+220' },
          bestOdds: { home: '+185', away: '+155', draw: '+225' }
        }
      },
      {
        id: 502,
        league: 'La Liga',
        teams: { home: 'Barcelona', away: 'Real Madrid' },
        time: 'Sunday, 3:00 PM',
        odds: { 
          draftkings: { home: '+110', away: '+240', draw: '+250' },
          fanduel: { home: '+115', away: '+235', draw: '+245' },
          espnbet: { home: '+105', away: '+245', draw: '+255' },
          caesars: { home: '+110', away: '+240', draw: '+250' },
          bestOdds: { home: '+115', away: '+245', draw: '+255' }
        }
      }
    ],
    mma: [
      {
        id: 601,
        league: 'UFC',
        teams: { home: 'Jon Jones', away: 'Francis Ngannou' },
        time: 'Saturday, 10:00 PM',
        odds: { 
          draftkings: { home: '-130', away: '+110', draw: null },
          fanduel: { home: '-125', away: '+105', draw: null },
          espnbet: { home: '-135', away: '+115', draw: null },
          caesars: { home: '-130', away: '+110', draw: null },
          bestOdds: { home: '-125', away: '+115', draw: null }
        }
      }
    ]
  };

  // Helper to get all games or filtered by sport
  const getFilteredGames = () => {
    if (activeSport === 'all') {
      return Object.values(sportsData).flat();
    }
    return sportsData[activeSport] || [];
  };

  // Toggle odds dropdown
  const toggleOddsDropdown = (gameId, betType) => {
    const key = `${gameId}-${betType}`;
    setShowOddsDropdown(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Select sportsbook and add to bet slip
  const selectSportsbook = (sportsbook, gameId, betType, selection) => {
    // Find the game across all sports
    const allGames = Object.values(sportsData).flat();
    const game = allGames.find(g => g.id === gameId);
    if (!game) return;
    
    // Add to betslip with the selected sportsbook
    const newBet = {
      id: `${gameId}-${betType}-${selection}-${sportsbook}`,
      game: game,
      type: betType,
      selection: selection,
      odds: game.odds[sportsbook][selection],
      sportsbook: sportsbook
    };
    
    // Use addToBetSlip from props
    if (addToBetSlip) {
      addToBetSlip(newBet);
    }
    
    // Close the dropdown
    toggleOddsDropdown(gameId, betType);
  };

  // Calculate risk level for a game
  const calculateRiskLevel = (game) => {
    // In a real app, this would be a much more sophisticated algorithm
    // that would consider odds disparity, team performance, injuries, etc.
    
    // For now, we'll use a simple calculation based on the odds
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
      case 'NCAAF':
        riskFactors.push('High variance in football games this season');
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
      case 'Premier League':
      case 'La Liga':
        riskFactors.push('Draw is always a significant possibility');
        opportunityFactors.push('Consider "Draw No Bet" markets for lower risk');
        break;
      case 'UFC':
        riskFactors.push('Single strike can end the fight at any moment');
        opportunityFactors.push('Prop bets on method of victory often offer value');
        break;
      default:
        riskFactors.push('Limited historical data to assess risk');
        break;
    }
    
    // Add sports betting pattern insights
    if (game.time.includes('Tonight')) {
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
  
  // Open risk assessment modal
  const openRiskAssessment = (game) => {
    const assessment = calculateRiskLevel(game);
    setCurrentRiskAssessment(assessment);
    setShowRiskModal(true);
  };
  
  // Close risk modal
  const closeRiskModal = () => {
    setShowRiskModal(false);
  };

  // Add effect to check window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🐝</span>
          <h1>beeBettor</h1>
        </div>
        <h1>Sports</h1>
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
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/sports" className="nav-link active">Sports</Link>
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
        {/* Left Side - Sports Content */}
        <div className="sports-section">
          {/* Top Banner */}
          <div className="promo-banner">
            <h2>Sports Betting Special</h2>
            <p>Bet $50 on any game this weekend and get a $10 free bet!</p>
            <button className="btn">Claim Now</button>
          </div>

          {/* Sports Filters */}
          <div className="sports-filters">
            <button 
              className={`sport-filter-btn ${activeSport === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSport('all')}
            >
              All Sports
            </button>
            <button 
              className={`sport-filter-btn ${activeSport === 'football' ? 'active' : ''}`}
              onClick={() => setActiveSport('football')}
            >
              🏈 Football
            </button>
            <button 
              className={`sport-filter-btn ${activeSport === 'basketball' ? 'active' : ''}`}
              onClick={() => setActiveSport('basketball')}
            >
              🏀 Basketball
            </button>
            <button 
              className={`sport-filter-btn ${activeSport === 'baseball' ? 'active' : ''}`}
              onClick={() => setActiveSport('baseball')}
            >
              ⚾ Baseball
            </button>
            <button 
              className={`sport-filter-btn ${activeSport === 'hockey' ? 'active' : ''}`}
              onClick={() => setActiveSport('hockey')}
            >
              🏒 Hockey
            </button>
            <button 
              className={`sport-filter-btn ${activeSport === 'soccer' ? 'active' : ''}`}
              onClick={() => setActiveSport('soccer')}
            >
              ⚽ Soccer
            </button>
            <button 
              className={`sport-filter-btn ${activeSport === 'mma' ? 'active' : ''}`}
              onClick={() => setActiveSport('mma')}
            >
              🥊 MMA
            </button>
          </div>

          {/* Sport-specific sections */}
          {activeSport === 'all' ? (
            // Show all sports organized in sections
            Object.entries(sportsData).map(([sport, games]) => (
              games.length > 0 && (
                <div key={sport} className="sport-section">
                  <h2 className="section-title">
                    {sport === 'football' && '🏈 Football'}
                    {sport === 'basketball' && '🏀 Basketball'}
                    {sport === 'baseball' && '⚾ Baseball'}
                    {sport === 'hockey' && '🏒 Hockey'}
                    {sport === 'soccer' && '⚽ Soccer'}
                    {sport === 'mma' && '🥊 MMA'}
                  </h2>
                  <div className="game-list">
                    {games.map(game => (
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
                              <span className="odds">{game.odds.bestOdds.away}</span>
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
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'away')}
                                  >
                                    <span className="sportsbook-name">DraftKings</span>
                                    <span className="sportsbook-odds">{game.odds.draftkings.away}</span>
                                  </div>
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'away')}
                                  >
                                    <span className="sportsbook-name">FanDuel</span>
                                    <span className="sportsbook-odds">{game.odds.fanduel.away}</span>
                                  </div>
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'away')}
                                  >
                                    <span className="sportsbook-name">ESPN BET</span>
                                    <span className="sportsbook-odds">{game.odds.espnbet.away}</span>
                                  </div>
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'away')}
                                  >
                                    <span className="sportsbook-name">Caesars</span>
                                    <span className="sportsbook-odds">{game.odds.caesars.away}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {game.odds.bestOdds.draw && (
                            <div className="bet-dropdown-container">
                              <button 
                                className="bet-btn"
                                onClick={() => toggleOddsDropdown(game.id, 'draw')}
                              >
                                <span className="odds">{game.odds.bestOdds.draw}</span>
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
                                    <div 
                                      className="sportsbook-option" 
                                      onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'draw')}
                                    >
                                      <span className="sportsbook-name">DraftKings</span>
                                      <span className="sportsbook-odds">{game.odds.draftkings.draw}</span>
                                    </div>
                                    <div 
                                      className="sportsbook-option" 
                                      onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'draw')}
                                    >
                                      <span className="sportsbook-name">FanDuel</span>
                                      <span className="sportsbook-odds">{game.odds.fanduel.draw}</span>
                                    </div>
                                    <div 
                                      className="sportsbook-option" 
                                      onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'draw')}
                                    >
                                      <span className="sportsbook-name">ESPN BET</span>
                                      <span className="sportsbook-odds">{game.odds.espnbet.draw}</span>
                                    </div>
                                    <div 
                                      className="sportsbook-option" 
                                      onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'draw')}
                                    >
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
                              <span className="odds">{game.odds.bestOdds.home}</span>
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
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'home')}
                                  >
                                    <span className="sportsbook-name">DraftKings</span>
                                    <span className="sportsbook-odds">{game.odds.draftkings.home}</span>
                                  </div>
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'home')}
                                  >
                                    <span className="sportsbook-name">FanDuel</span>
                                    <span className="sportsbook-odds">{game.odds.fanduel.home}</span>
                                  </div>
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'home')}
                                  >
                                    <span className="sportsbook-name">ESPN BET</span>
                                    <span className="sportsbook-odds">{game.odds.espnbet.home}</span>
                                  </div>
                                  <div 
                                    className="sportsbook-option" 
                                    onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'home')}
                                  >
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
                    <div className="view-more-container">
                      <button className="view-more-btn">
                        View More {sport === 'football' && 'Football'} 
                        {sport === 'basketball' && 'Basketball'} 
                        {sport === 'baseball' && 'Baseball'} 
                        {sport === 'hockey' && 'Hockey'} 
                        {sport === 'soccer' && 'Soccer'} 
                        {sport === 'mma' && 'MMA'} Games
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))
          ) : (
            // Show filtered games for selected sport
            <div className="sport-section">
              <h2 className="section-title">
                {activeSport === 'football' && '🏈 Football'}
                {activeSport === 'basketball' && '🏀 Basketball'}
                {activeSport === 'baseball' && '⚾ Baseball'}
                {activeSport === 'hockey' && '🏒 Hockey'}
                {activeSport === 'soccer' && '⚽ Soccer'}
                {activeSport === 'mma' && '🥊 MMA'}
              </h2>
              <div className="game-list">
                {getFilteredGames().map(game => (
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
                      {/* Away team betting option */}
                      <div className="bet-dropdown-container">
                        <button 
                          className="bet-btn" 
                          onClick={() => toggleOddsDropdown(game.id, 'away')}
                        >
                          <span className="odds">{game.odds.bestOdds.away}</span>
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
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'away')}
                              >
                                <span className="sportsbook-name">DraftKings</span>
                                <span className="sportsbook-odds">{game.odds.draftkings.away}</span>
                              </div>
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'away')}
                              >
                                <span className="sportsbook-name">FanDuel</span>
                                <span className="sportsbook-odds">{game.odds.fanduel.away}</span>
                              </div>
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'away')}
                              >
                                <span className="sportsbook-name">ESPN BET</span>
                                <span className="sportsbook-odds">{game.odds.espnbet.away}</span>
                              </div>
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'away')}
                              >
                                <span className="sportsbook-name">Caesars</span>
                                <span className="sportsbook-odds">{game.odds.caesars.away}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Draw betting option (if available) */}
                      {game.odds.bestOdds.draw && (
                        <div className="bet-dropdown-container">
                          <button 
                            className="bet-btn"
                            onClick={() => toggleOddsDropdown(game.id, 'draw')}
                          >
                            <span className="odds">{game.odds.bestOdds.draw}</span>
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
                                <div 
                                  className="sportsbook-option" 
                                  onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'draw')}
                                >
                                  <span className="sportsbook-name">DraftKings</span>
                                  <span className="sportsbook-odds">{game.odds.draftkings.draw}</span>
                                </div>
                                <div 
                                  className="sportsbook-option" 
                                  onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'draw')}
                                >
                                  <span className="sportsbook-name">FanDuel</span>
                                  <span className="sportsbook-odds">{game.odds.fanduel.draw}</span>
                                </div>
                                <div 
                                  className="sportsbook-option" 
                                  onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'draw')}
                                >
                                  <span className="sportsbook-name">ESPN BET</span>
                                  <span className="sportsbook-odds">{game.odds.espnbet.draw}</span>
                                </div>
                                <div 
                                  className="sportsbook-option" 
                                  onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'draw')}
                                >
                                  <span className="sportsbook-name">Caesars</span>
                                  <span className="sportsbook-odds">{game.odds.caesars.draw}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Home team betting option */}
                      <div className="bet-dropdown-container">
                        <button 
                          className="bet-btn"
                          onClick={() => toggleOddsDropdown(game.id, 'home')}
                        >
                          <span className="odds">{game.odds.bestOdds.home}</span>
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
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('draftkings', game.id, 'moneyline', 'home')}
                              >
                                <span className="sportsbook-name">DraftKings</span>
                                <span className="sportsbook-odds">{game.odds.draftkings.home}</span>
                              </div>
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('fanduel', game.id, 'moneyline', 'home')}
                              >
                                <span className="sportsbook-name">FanDuel</span>
                                <span className="sportsbook-odds">{game.odds.fanduel.home}</span>
                              </div>
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('espnbet', game.id, 'moneyline', 'home')}
                              >
                                <span className="sportsbook-name">ESPN BET</span>
                                <span className="sportsbook-odds">{game.odds.espnbet.home}</span>
                              </div>
                              <div 
                                className="sportsbook-option" 
                                onClick={() => selectSportsbook('caesars', game.id, 'moneyline', 'home')}
                              >
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
            </div>
          )}
        </div>

        {/* Right Side - Bet Slip and Upcoming Highlights */}
        <div className="bet-slip-and-highlights">
          
            <BetSlip 
        betSlip={betSlip} 
        removeBet={removeBet}
        clearBetSlip={clearBetSlip}
        />

          {/* Highlights Section */}
          <div className="upcoming-highlights">
            <h2 className="highlights-title">Trending Games</h2>
            <div className="highlights-list">
              <div className="highlight-item">
                <div className="highlight-header">
                  <span className="highlight-league">NFL</span>
                  <span className="highlight-time">Today, 8:20 PM</span>
                </div>
                <div className="highlight-teams">Kansas City Chiefs vs Buffalo Bills</div>
                <div className="highlight-stat">Most bet game of the week</div>
                <button className="highlight-btn">View Game</button>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-header">
                  <span className="highlight-league">NBA</span>
                  <span className="highlight-time">Tomorrow, 7:30 PM</span>
                </div>
                <div className="highlight-teams">Los Angeles Lakers vs Boston Celtics</div>
                <div className="highlight-stat">90% of bets on over 212.5</div>
                <button className="highlight-btn">View Game</button>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-header">
                  <span className="highlight-league">Premier League</span>
                  <span className="highlight-time">Saturday, 10:00 AM</span>
                </div>
                <div className="highlight-teams">Manchester United vs Liverpool</div>
                <div className="highlight-stat">Odds shifting toward Liverpool</div>
                <button className="highlight-btn">View Game</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer Navigation */}
      {isMobile && (
        <nav className="footer-nav">
          <Link to="/home" className="nav-item">
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

      {/* Risk Assessment Modal */}
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

export default SportsPage;