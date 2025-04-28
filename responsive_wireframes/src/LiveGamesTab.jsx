import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/LiveGamesTab.css';
import BetSlip from './BetSlip';

function LiveGamesTab({ addToBetSlip, betSlip = [], removeBet, clearBetSlip }) {
  // State for live games data
  const [liveGames, setLiveGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // State for odds dropdowns
  const [showOddsDropdown, setShowOddsDropdown] = useState({});
  // State for risk modal
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [currentRiskAssessment, setCurrentRiskAssessment] = useState(null);
  // Filter for live games
  const [activeFilter, setActiveFilter] = useState('all');

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
    // Find the game
    const game = liveGames.find(g => g.id === gameId);
    if (!game) return;
    
    // Add to betslip with the selected sportsbook
    const newBet = {
      id: `${gameId}-${betType}-${selection}-${sportsbook}`,
      game: game,
      type: betType,
      selection: selection,
      odds: game.odds[sportsbook][selection],
      sportsbook: sportsbook,
      isLive: true
    };
    
    addToBetSlip(newBet);
    
    // Close the dropdown
    toggleOddsDropdown(gameId, betType);
  };

  // Calculate risk level for a game
  const calculateRiskLevel = (game) => {
    // In a real app, this would be a much more sophisticated algorithm
    let riskLevel = 'Medium';
    let riskScore = 50;
    let riskFactors = [];
    let opportunityFactors = [];
    
    // Calculate risk based on current score and time remaining
    const scoreDiff = Math.abs(game.score.home - game.score.away);
    const timeRemaining = getTimeRemainingPercent(game.period, game.clock);
    
    if (scoreDiff < 3 && timeRemaining < 20) {
      // Close game in final minutes
      riskLevel = 'High';
      riskScore = 75;
      riskFactors.push('Close game in final minutes - high volatility');
      opportunityFactors.push('Potential for dramatic swings in odds');
    } else if (scoreDiff > 10 && timeRemaining < 50) {
      // Big lead with substantial time played
      riskLevel = 'Low';
      riskScore = 25;
      riskFactors.push('Significant lead established');
      opportunityFactors.push('Consider alternate spreads for better value');
    }
    
    // Add sport-specific risk factors
    switch(game.league) {
      case 'NBA':
        riskFactors.push('NBA games often see late comebacks');
        opportunityFactors.push('Teams in the bonus offer higher free throw opportunities');
        break;
      case 'NFL':
        riskFactors.push('Turnovers can quickly change game dynamics');
        opportunityFactors.push('Red zone possessions often lead to scoring opportunities');
        break;
      case 'NHL':
        riskFactors.push('Empty net situations increase goal potential');
        opportunityFactors.push('Power plays significantly increase scoring probability');
        break;
      case 'MLB':
        riskFactors.push('Bullpen performance can vary greatly');
        opportunityFactors.push('Favorable batter/pitcher matchups in upcoming innings');
        break;
      default:
        riskFactors.push('Limited historical data to assess risk');
        break;
    }
    
    // Add momentum-based insights
    if (game.momentum === 'home') {
      opportunityFactors.push('Home team has momentum advantage');
    } else if (game.momentum === 'away') {
      opportunityFactors.push('Away team has momentum advantage');
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

  // Helper function to get time remaining as percentage
  const getTimeRemainingPercent = (period, clock) => {
    let totalGameMinutes = 0;
    let elapsedMinutes = 0;
    
    // Calculate based on sport (simplified)
    if (period.includes('Quarter')) {
      totalGameMinutes = 48; // NBA game
      const quarter = parseInt(period.split(' ')[0]);
      elapsedMinutes = (quarter - 1) * 12;
      
      // Add minutes from clock
      const [minutes, seconds] = clock.split(':').map(Number);
      elapsedMinutes += (12 - minutes) - (seconds / 60);
    } else if (period.includes('Period')) {
      totalGameMinutes = 60; // NHL game
      const periodNum = parseInt(period.split(' ')[0]);
      elapsedMinutes = (periodNum - 1) * 20;
      
      // Add minutes from clock
      const [minutes, seconds] = clock.split(':').map(Number);
      elapsedMinutes += (20 - minutes) - (seconds / 60);
    } else if (period.includes('Inning')) {
      // Baseball uses innings instead of minutes
      const totalInnings = 9;
      const currentInning = parseInt(period.split(' ')[0]);
      const topBottom = period.includes('Top') ? 0 : 0.5;
      
      return ((currentInning - 1 + topBottom) / totalInnings) * 100;
    } else {
      // Default calculation
      return 50; // Middle of the game
    }
    
    return (elapsedMinutes / totalGameMinutes) * 100;
  };

  // Fetch live games data
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const mockLiveGames = [
      {
        id: 101,
        league: 'NBA',
        teams: { home: 'Los Angeles Lakers', away: 'Brooklyn Nets' },
        score: { home: 87, away: 82 },
        period: '3rd Quarter',
        clock: '4:35',
        momentum: 'home',
        possession: 'home',
        lastPlay: 'James makes a 3-point shot',
        odds: { 
          draftkings: { home: '-140', away: '+120', draw: null },
          fanduel: { home: '-135', away: '+115', draw: null },
          espnbet: { home: '-145', away: '+125', draw: null },
          caesars: { home: '-140', away: '+120', draw: null },
          bestOdds: { home: '-135', away: '+125', draw: null }
        }
      },
      {
        id: 102,
        league: 'NFL',
        teams: { home: 'Philadelphia Eagles', away: 'Dallas Cowboys' },
        score: { home: 21, away: 17 },
        period: '3rd Quarter',
        clock: '8:12',
        momentum: 'away',
        possession: 'away',
        lastPlay: '15-yard pass completion',
        odds: { 
          draftkings: { home: '-110', away: '-110', draw: null },
          fanduel: { home: '-105', away: '-115', draw: null },
          espnbet: { home: '-110', away: '-110', draw: null },
          caesars: { home: '-115', away: '-105', draw: null },
          bestOdds: { home: '-105', away: '-105', draw: null }
        }
      },
      {
        id: 103,
        league: 'NHL',
        teams: { home: 'Toronto Maple Leafs', away: 'Boston Bruins' },
        score: { home: 2, away: 3 },
        period: '2nd Period',
        clock: '14:22',
        momentum: 'away',
        possession: null,
        lastPlay: 'Save by Bruins goaltender',
        odds: { 
          draftkings: { home: '+140', away: '-160', draw: null },
          fanduel: { home: '+145', away: '-165', draw: null },
          espnbet: { home: '+135', away: '-155', draw: null },
          caesars: { home: '+140', away: '-160', draw: null },
          bestOdds: { home: '+145', away: '-155', draw: null }
        }
      },
      {
        id: 104,
        league: 'MLB',
        teams: { home: 'New York Yankees', away: 'Boston Red Sox' },
        score: { home: 3, away: 2 },
        period: '5th Inning Top',
        clock: '0 Outs',
        momentum: 'away',
        possession: 'away',
        lastPlay: 'Single to center field',
        odds: { 
          draftkings: { home: '-130', away: '+110', draw: null },
          fanduel: { home: '-125', away: '+105', draw: null },
          espnbet: { home: '-135', away: '+115', draw: null },
          caesars: { home: '-130', away: '+110', draw: null },
          bestOdds: { home: '-125', away: '+115', draw: null }
        }
      },
      {
        id: 105,
        league: 'Soccer',
        teams: { home: 'Manchester United', away: 'Liverpool' },
        score: { home: 1, away: 1 },
        period: '72\'',
        clock: '',
        momentum: 'home',
        possession: 'home',
        lastPlay: 'Corner kick awarded',
        odds: { 
          draftkings: { home: '+180', away: '+150', draw: '+200' },
          fanduel: { home: '+185', away: '+145', draw: '+195' },
          espnbet: { home: '+175', away: '+155', draw: '+205' },
          caesars: { home: '+180', away: '+150', draw: '+200' },
          bestOdds: { home: '+185', away: '+155', draw: '+205' }
        }
      }
    ];

    // Set the data and loading state
    setLiveGames(mockLiveGames);
    setIsLoading(false);

    // Add window resize listener for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter games by league
  const filteredGames = activeFilter === 'all' 
    ? liveGames 
    : liveGames.filter(game => game.league === activeFilter);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🐝</span>
          <h1>beeBettor</h1>
        </div>
        <h1>Live Games</h1>
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
            <Link to="/sports" className="nav-link">Sports</Link>
            <Link to="/live" className="nav-link active">Live Betting</Link>
            <Link to="/promotions" className="nav-link">Promotions</Link>
          </div>
          <div className="nav-right">
            <Link to="/search" className="nav-link">Search</Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Live Games */}
        <div className="games-section">
          {/* Live Games Filters */}
          <div className="live-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Games
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'NBA' ? 'active' : ''}`}
              onClick={() => setActiveFilter('NBA')}
            >
              NBA
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'NFL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('NFL')}
            >
              NFL
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'NHL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('NHL')}
            >
              NHL
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'MLB' ? 'active' : ''}`}
              onClick={() => setActiveFilter('MLB')}
            >
              MLB
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Soccer' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Soccer')}
            >
              Soccer
            </button>
          </div>

          {/* Live Games Counter */}
          <div className="live-games-counter">
            <span className="live-indicator">LIVE</span>
            <span className="games-count">{filteredGames.length} Games</span>
          </div>

          {/* Live Games List */}
          {isLoading ? (
            <div className="loading-indicator">Loading live games...</div>
          ) : (
            <div className="live-games-list">
              {filteredGames.map(game => (
                <div className="live-game-card" key={game.id}>
                  <div className="game-header">
                    <span className="league-badge">{game.league}</span>
                    <div className="game-status">
                      <span className="live-tag">LIVE</span>
                      <span className="period">{game.period}</span>
                      {game.clock && <span className="clock">{game.clock}</span>}
                    </div>
                  </div>
                  
                  <div className="game-content">
                    <div className="teams-score">
                      <div className="team-container away">
                        <div className="team-name">
                          {game.possession === 'away' && <span className="possession-indicator">🏀</span>}
                          <span className="team">{game.teams.away}</span>
                        </div>
                        <div className="score">{game.score.away}</div>
                      </div>
                      
                      <div className="teams-separator">@</div>
                      
                      <div className="team-container home">
                        <div className="team-name">
                          {game.possession === 'home' && <span className="possession-indicator">🏀</span>}
                          <span className="team">{game.teams.home}</span>
                        </div>
                        <div className="score">{game.score.home}</div>
                      </div>
                    </div>
                    
                    <div className="last-play">
                      <span className="play-label">Last Play:</span>
                      <span className="play-description">{game.lastPlay}</span>
                    </div>
                    
                    <div className="momentum-indicator">
                      <div 
                        className="momentum-bar" 
                        style={{ 
                          background: game.momentum === 'home' 
                            ? 'linear-gradient(90deg, transparent, #f8cd00)' 
                            : game.momentum === 'away'
                              ? 'linear-gradient(90deg, #f8cd00, transparent)'
                              : '#333' 
                        }}
                      >
                        <span className="momentum-label">
                          {game.momentum === 'home' 
                            ? 'Momentum: Home' 
                            : game.momentum === 'away' 
                              ? 'Momentum: Away' 
                              : 'Neutral'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="betting-options">
                      <div className="bet-dropdown-container">
                        <button 
                          className="bet-btn live-bet" 
                          onClick={() => toggleOddsDropdown(game.id, 'away')}
                        >
                          {game.teams.away} <span className="odds">{game.odds.bestOdds.away}</span>
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
                      
                      {game.league === 'Soccer' && (
                        <div className="bet-dropdown-container">
                          <button 
                            className="bet-btn live-bet"
                            onClick={() => toggleOddsDropdown(game.id, 'draw')}
                          >
                            Draw <span className="odds">{game.odds.bestOdds.draw}</span>
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
                          className="bet-btn live-bet"
                          onClick={() => toggleOddsDropdown(game.id, 'home')}
                        >
                          {game.teams.home} <span className="odds">{game.odds.bestOdds.home}</span>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Bet Slip */}
        <div className="bet-slip-and-news">
        {/* Use the reusable BetSlip component */}
        <BetSlip 
            betSlip={betSlip} 
            removeBet={removeBet}
            clearBetSlip={clearBetSlip}
        />
        
        {/* Live Betting Tips Section */}
        <div className="live-tips-container">
            <h2 className="tips-title">Live Betting Tips</h2>
            <div className="tips-list">
            <div className="tip-item">
                <div className="tip-icon">💡</div>
                <div className="tip-text">React quickly to momentum shifts and injuries</div>
            </div>
            <div className="tip-item">
                <div className="tip-icon">💡</div>
                <div className="tip-text">Watch the game to spot opportunities before oddsmakers adjust</div>
            </div>
            <div className="tip-item">
                <div className="tip-icon">💡</div>
                <div className="tip-text">Consider smaller bet sizes for higher risk bets</div>
            </div>
            <div className="tip-item">
                <div className="tip-icon">💡</div>
                <div className="tip-text">Set strict loss limits for live betting sessions</div>
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
          <Link to="/live" className="nav-item active">
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
              <h2>Live Betting Risk Assessment</h2>
              <button className="close-modal" onClick={closeRiskModal}>×</button>
            </div>
            
            <div className="risk-modal-content">
              <div className="risk-game-details">
                <div className="risk-league">{currentRiskAssessment.game.league} - LIVE</div>
                <div className="risk-matchup">
                  {currentRiskAssessment.game.teams.away} vs {currentRiskAssessment.game.teams.home}
                </div>
                <div className="risk-score">
                  Score: {currentRiskAssessment.game.score.away} - {currentRiskAssessment.game.score.home}
                </div>
                <div className="risk-time">
                  {currentRiskAssessment.game.period} 
                  {currentRiskAssessment.game.clock && ` | ${currentRiskAssessment.game.clock}`}
                </div>
              </div>
              
              <div className="risk-level-indicator">
                <h3>Live Betting Risk Level: <span className={`risk-level-${currentRiskAssessment.riskLevel.toLowerCase()}`}>
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
                <h3>Live Betting Risk Factors</h3>
                <ul className="risk-factors-list">
                  {currentRiskAssessment.riskFactors.map((factor, index) => (
                    <li key={`risk-${index}`} className="risk-factor">
                      <span className="risk-icon">⚠️</span> {factor}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="opportunity-factors-section">
                <h3>Live Betting Opportunities</h3>
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
              
                              <div className="live-betting-tips">
                <h3>Live Betting Tips</h3>
                <ul className="tips-list">
                  <li>React quickly to momentum shifts and injuries</li>
                  <li>Consider smaller bet sizes for higher risk bets</li>
                  <li>Watch the game to spot opportunities before oddsmakers adjust</li>
                  <li>Set strict loss limits for live betting sessions</li>
                </ul>
              </div>
            </div>
            
            <div className="risk-modal-footer">
              <button className="btn btn-outline" onClick={closeRiskModal}>Close</button>
              <button className="btn">Add to Bet Slip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveGamesTab;