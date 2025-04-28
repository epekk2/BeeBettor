import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/PromotionsPage.css';

function PromotionsPage() {
  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // State for selected promotion category
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for promotions
  const promotions = [
    {
      id: 1,
      title: "Welcome Bonus",
      category: "new-users",
      description: "Get up to $500 in free bets when you make your first deposit!",
      code: "WELCOME500",
      endDate: "Ongoing",
      terms: "New users only. Min deposit $10. Free bets awarded as 5x $100 free bet tokens. 1x wagering applies. Terms apply.",
      image: "welcome.jpg",
      featured: true
    },
    {
      id: 2,
      title: "NFL Season Kickoff Special",
      category: "sports",
      description: "Place a $50 bet on any NFL game and get a $10 free bet each week of the season!",
      code: "NFLKICKOFF",
      endDate: "September 30, 2025",
      terms: "Must place initial qualifying bet within promotional period. Free bets awarded weekly regardless of initial bet outcome. Terms apply.",
      image: "nfl.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Parlay Boost",
      category: "boost",
      description: "Get a 25% boost on all parlays with 4+ legs!",
      code: "BOOST25",
      endDate: "Ongoing",
      terms: "Minimum odds of -200 per selection. Maximum boost amount $250. Terms apply.",
      image: "parlay.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Refer-a-Friend",
      category: "referral",
      description: "Get $50 when you refer a friend who deposits $25 or more!",
      code: "No code needed",
      endDate: "Ongoing",
      terms: "Friend must use your referral link and make a qualifying deposit within 7 days. Terms apply.",
      image: "refer.jpg",
      featured: false
    },
    {
      id: 5,
      title: "NBA Playoffs Special",
      category: "sports",
      description: "Bet $25 on any playoff game and get a free $10 live bet to use during the game!",
      code: "NBAPLAYS",
      endDate: "End of playoffs",
      terms: "Pre-game bets only. Free live bet must be used during the same game. Terms apply.",
      image: "nba.jpg",
      featured: true
    },
    {
      id: 6,
      title: "Mobile App Exclusive",
      category: "app",
      description: "Download our mobile app and get a $25 free bet!",
      code: "APP25",
      endDate: "Ongoing",
      terms: "New app users only. Must place a bet of $25 or more to receive free bet. Terms apply.",
      image: "app.jpg",
      featured: false
    },
    {
      id: 7,
      title: "Deposit Match Monday",
      category: "deposit",
      description: "Every Monday, get a 50% match on your deposit up to $100!",
      code: "MONDAY50",
      endDate: "Every Monday",
      terms: "1x wagering requirement on deposit match amount. Maximum match $100. Terms apply.",
      image: "deposit.jpg",
      featured: false
    },
    {
      id: 8,
      title: "Risk-Free First Bet",
      category: "new-users",
      description: "Place your first bet risk-free up to $200!",
      code: "RISKFREE200",
      endDate: "Ongoing",
      terms: "New users only. If your first bet loses, receive a free bet of equal value up to $200. Terms apply.",
      image: "riskfree.jpg",
      featured: true
    }
  ];

  // Add effect to check window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter promotions by category
  const filteredPromotions = activeCategory === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.category === activeCategory);

  // Get featured promotions
  const featuredPromotions = promotions.filter(promo => promo.featured);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🐝</span>
          <h1>beeBettor</h1>
        </div>
        <h1>Promotions</h1>
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
            <Link to="/live" className="nav-link">Live Betting</Link>
            <Link to="/promotions" className="nav-link active">Promotions</Link>
          </div>
          <div className="nav-right">
            <Link to="/search" className="nav-link">Search</Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="promotions-content">
        {/* Featured Promotions Banner */}
        <div className="featured-promotions">
          <h2 className="featured-title">Featured Promotions</h2>
          <div className="featured-carousel">
            {featuredPromotions.map(promo => (
              <div className="featured-promo-card" key={promo.id}>
                <div className="promo-image-container">
                  <div className="promo-image-placeholder">
                    {/* In a real app, you would use: */}
                    {/* <img src={`/images/promotions/${promo.image}`} alt={promo.title} /> */}
                    <div className="image-placeholder-text">{promo.title}</div>
                  </div>
                </div>
                <div className="featured-promo-content">
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                  <button className="btn">Claim Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Category Filters */}
        <div className="promotion-filters">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Promotions
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'new-users' ? 'active' : ''}`}
            onClick={() => setActiveCategory('new-users')}
          >
            New Users
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'sports' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sports')}
          >
            Sports
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'boost' ? 'active' : ''}`}
            onClick={() => setActiveCategory('boost')}
          >
            Odds Boosts
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'deposit' ? 'active' : ''}`}
            onClick={() => setActiveCategory('deposit')}
          >
            Deposit Bonuses
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'referral' ? 'active' : ''}`}
            onClick={() => setActiveCategory('referral')}
          >
            Referrals
          </button>
        </div>

        {/* All Promotions Grid */}
        <div className="promotions-grid">
          {filteredPromotions.map(promo => (
            <div className="promotion-card" key={promo.id}>
              <div className="promo-image-container">
                <div className="promo-image-placeholder">
                  {/* In a real app, you would use: */}
                  {/* <img src={`/images/promotions/${promo.image}`} alt={promo.title} /> */}
                  <div className="image-placeholder-text">{promo.title}</div>
                </div>
              </div>
              <div className="promotion-content">
                <h3 className="promo-title">{promo.title}</h3>
                <p className="promo-description">{promo.description}</p>
                <div className="promo-details">
                  <div className="promo-detail">
                    <span className="detail-label">Promo Code:</span>
                    <span className="detail-value">{promo.code}</span>
                  </div>
                  <div className="promo-detail">
                    <span className="detail-label">Valid Until:</span>
                    <span className="detail-value">{promo.endDate}</span>
                  </div>
                </div>
                <div className="promo-terms">
                  <details>
                    <summary>Terms & Conditions</summary>
                    <p>{promo.terms}</p>
                  </details>
                </div>
                <button className="btn claim-btn">Claim Promotion</button>
              </div>
            </div>
          ))}
        </div>

        {/* Promotion Terms Banner */}
        <div className="terms-banner">
          <h3>General Promotion Terms</h3>
          <p>All promotions are subject to our general terms and conditions. You must be 21+ years old and located in a legal betting state to participate. Void where prohibited. Gambling problem? Call 1-800-GAMBLER.</p>
          <button className="btn-outline">View Full Terms</button>
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
    </div>
  );
}

export default PromotionsPage;