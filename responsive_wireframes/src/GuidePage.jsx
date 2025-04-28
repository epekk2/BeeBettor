import React from 'react';
import './styles/GuidePage.css';
import { Link } from 'react-router-dom';

function GuidePage() {
  return (
    <div className="guide-container">
      <header className="guide-header">
        <h1>Sports Betting Guide</h1>
      </header>

      <main className="guide-content">
        <section className="guide-section">
          <h2>Understanding Betting Odds</h2>
          
          <div className="odds-card">
            <h3>American Odds (Moneyline)</h3>
            <div className="odds-example">
              <div className="odds-box positive">+250</div>
              <div className="odds-box negative">-180</div>
            </div>
            <p>
              <strong>Positive odds (+250)</strong> show how much profit you would win on a $100 bet. 
              Example: A $100 bet at +250 odds would win you $250 in profit, plus your original $100 back.
            </p>
            <p>
              <strong>Negative odds (-180)</strong> show how much you need to bet to win $100 in profit. 
              Example: At -180 odds, you would need to bet $180 to win $100 in profit, plus your original $180 back.
            </p>
          </div>

          <div className="odds-card">
            <h3>Implied Probability</h3>
            <p>
              Odds represent the probability of an outcome happening. 
              For <strong>positive odds</strong>: Probability = 100 ÷ (odds + 100)
              For <strong>negative odds</strong>: Probability = |odds| ÷ (|odds| + 100)
            </p>
            <div className="odds-example">
              <div className="prob-box">
                <div>+250</div>
                <div className="arrow">↓</div>
                <div>28.6%</div>
              </div>
              <div className="prob-box">
                <div>-180</div>
                <div className="arrow">↓</div>
                <div>64.3%</div>
              </div>
            </div>
          </div>
        </section>

        <section className="guide-section">
          <h2>Types of Bets</h2>
          
          <div className="bet-type-grid">
            <div className="bet-type-card">
              <h3>Moneyline</h3>
              <p>A straightforward bet on which team will win the game. No point spreads involved – just pick the winner.</p>
              <div className="bet-example">
                <div>Chicago Bears <span className="odds">+150</span></div>
                <div>Green Bay Packers <span className="odds">-170</span></div>
              </div>
            </div>
            
            <div className="bet-type-card">
              <h3>Point Spread</h3>
              <p>A bet on the margin of victory. The favorite gives points, while the underdog gets points.</p>
              <div className="bet-example">
                <div>Lakers -6.5 <span className="odds">-110</span></div>
                <div>Nets +6.5 <span className="odds">-110</span></div>
              </div>
              <p className="bet-detail">Lakers must win by 7+ points for a "Lakers -6.5" bet to win.</p>
            </div>
            
            <div className="bet-type-card">
              <h3>Over/Under (Totals)</h3>
              <p>A bet on the combined score of both teams, regardless of who wins.</p>
              <div className="bet-example">
                <div>Over 220.5 <span className="odds">-110</span></div>
                <div>Under 220.5 <span className="odds">-110</span></div>
              </div>
              <p className="bet-detail">If the final score is 115-107 (222 total), the "Over" wins.</p>
            </div>
            
            <div className="bet-type-card">
              <h3>Parlays</h3>
              <p>A single bet that links together multiple bets. All selections must win for the parlay to pay out.</p>
              <div className="bet-example">
                <div>Bears +3.5 <span className="odds">-110</span></div>
                <div>Lakers ML <span className="odds">-160</span></div>
                <div>Yankees/Red Sox Over 8.5 <span className="odds">-110</span></div>
                <div className="parlay-odds">Parlay Odds: <span className="odds">+600</span></div>
              </div>
            </div>
            
            <div className="bet-type-card">
              <h3>Props</h3>
              <p>Bets on specific occurrences within a game, often unrelated to the final outcome.</p>
              <div className="bet-example">
                <div>LeBron James Over 27.5 Points <span className="odds">-115</span></div>
                <div>Patrick Mahomes Under 2.5 Touchdowns <span className="odds">+120</span></div>
              </div>
            </div>
            
            <div className="bet-type-card">
              <h3>Futures</h3>
              <p>Long-term bets on outcomes that will be decided in the future, like championship winners.</p>
              <div className="bet-example">
                <div>Chiefs to win Super Bowl <span className="odds">+600</span></div>
                <div>Lakers to win NBA Finals <span className="odds">+800</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="guide-section">
          <h2>Reading the Betting Interface</h2>
          
          <div className="interface-card">
            <h3>Game Cards</h3>
            <p>Each game card shows the matchup, with important details like:</p>
            <ul>
              <li><strong>Teams</strong> - The competing teams or players</li>
              <li><strong>Time/Date</strong> - When the game starts</li>
              <li><strong>Odds</strong> - Different betting options with their associated odds</li>
              <li><strong>Live Tag</strong> - Indicates in-play betting is available</li>
            </ul>
            <div className="interface-image-placeholder">
              <span>Game Card Example</span>
            </div>
          </div>
          
          <div className="interface-card">
            <h3>Bet Slip</h3>
            <p>Your bet slip shows your current selections and allows you to:</p>
            <ul>
              <li>Enter your wager amount</li>
              <li>See potential winnings</li>
              <li>Combine bets into parlays</li>
              <li>Remove selections</li>
              <li>Place your final bet</li>
            </ul>
            <div className="interface-image-placeholder">
              <span>Bet Slip Example</span>
            </div>
          </div>
          
          <div className="interface-card">
            <h3>Best Odds Feature</h3>
            <p>beeBettor compares odds across multiple sportsbooks to show you the best value for your bet. Look for the "Best" badge to find the most favorable odds.</p>
            <div className="best-odds-example">
              <div className="best-odds-option">
                <span className="sportsbook">DraftKings</span>
                <span className="odds">+180</span>
              </div>
              <div className="best-odds-option">
                <span className="sportsbook">FanDuel</span>
                <span className="odds">+175</span>
              </div>
              <div className="best-odds-option best">
                <span className="sportsbook">ESPN BET</span>
                <span className="odds">+195</span>
                <span className="best-badge">Best</span>
              </div>
            </div>
          </div>
        </section>

        <section className="guide-section">
          <h2>Responsible Betting Tips</h2>
          
          <div className="tips-container">
            <div className="tip-card">
              <div className="tip-icon">📊</div>
              <h3>Set a Budget</h3>
              <p>Only bet what you can afford to lose. Set daily, weekly, or monthly limits for your betting activities.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">⏰</div>
              <h3>Take Breaks</h3>
              <p>Don't chase losses or get caught up in extended betting sessions. Take regular breaks to maintain perspective.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">📚</div>
              <h3>Do Your Research</h3>
              <p>Make informed bets by researching teams, players, trends, and other relevant factors before placing wagers.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">📈</div>
              <h3>Understand Value</h3>
              <p>Look for bets where you believe the odds are in your favor compared to the actual probability of an outcome.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🎮</div>
              <h3>Use Betting Tools</h3>
              <p>Take advantage of beeBettor's risk assessment tools to evaluate potential bets before making decisions.</p>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🚫</div>
              <h3>Know When to Stop</h3>
              <p>If betting is no longer fun or is causing financial stress, take a break or seek help by calling 1-800-GAMBLER.</p>
            </div>
          </div>
        </section>
      </main>

      <div className="return-button-container">
        <Link to="/" className="btn">
          Return to Profile
        </Link>
        <Link to="/home" className="btn btn-yellow">
          Start Betting
        </Link>
      </div>
    </div>
  );
}

export default GuidePage;