import React from 'react';
import './styles/RegulationsPage.css';
import { Link } from 'react-router-dom';

function RegulationsPage() {
  return (
    <div className="regulations-container">
      <header className="regulations-header">
        <h1>Betting Regulations</h1>
      </header>

      <main className="regulations-content">
        <div className="regulations-text">
          <h2>Chicago Sports Gambling Regulations</h2>
          <p>
            Sports betting has been legal in Illinois since 2019, with the first legal bet placed in March 2020. The Illinois Gaming Board (IGB) is the regulatory body that oversees all licensed gambling operations in the state, including sports betting, casinos, and video gaming.
          </p>
          <p>
            <strong>Age Requirements:</strong> You must be at least 21 years of age to place sports bets in Chicago and throughout Illinois. This applies to both retail locations and online sportsbooks. Valid photo identification is required for age verification when placing bets at physical locations and when creating an online betting account.
          </p>
          <p>
            <strong>Local Restrictions:</strong> As of July 1, 2024, betting on Illinois collegiate teams is prohibited through online platforms, but is still permitted at retail casinos. All other college and professional sports betting remains legal both online and in person.
          </p>
          <p>
            <strong>Taxation:</strong> Illinois has implemented a progressive tax rate on sports betting as of July 2024. The tax rates range from 20% on annual adjusted gross sports wagering receipts up to $30 million, increasing to 40% for receipts exceeding $200 million. An additional 2% tax applies to sports wagers placed within Cook County.
          </p>
          <p>
            <strong>Licensed Operators:</strong> All sports betting operators must be licensed by the Illinois Gaming Board. The state is home to 15 casinos, 15 approved sportsbooks, and more than 8,700 licensed video gaming establishments. Unlicensed or offshore betting platforms are not legally permitted to operate within Illinois.
          </p>
          <p>
            <strong>Self-Exclusion Program:</strong> Illinois maintains a Self-Exclusion Program for individuals with gambling problems. Once enrolled, participants are banned from entering gambling establishments or collecting winnings. Problem gambling services can be accessed by calling 1-800-GAMBLER (1-800-426-2537) or texting GAMB to 833234.
          </p>
          <p>
            <strong>Marketing Regulations:</strong> The Illinois Gaming Board has implemented strict advertising and marketing rules across all gambling sectors. These regulations prohibit targeting individuals under 21, false claims about winning chances, and misleading promotions.
          </p>
          <p>
            <strong>Mobile Betting Requirements:</strong> Online sports betting is available throughout Chicago and Illinois, but you must be physically located within state borders when placing bets. Geolocation technology verifies your location before allowing wagers through mobile apps or websites.
          </p>
          <p>
            <strong>Future Developments:</strong> The state legislature is considering bills to legalize online casino gaming (iGaming), which would expand online gambling options beyond sports betting. Additionally, discussions are ongoing about allowing video lottery terminals (VLTs) within Chicago city limits.
          </p>
        </div>
      </main>

      <div className="return-button-container">
      <Link to="/" className="btn btn-blue">
        Return to Profile
      </Link>
      </div>
    </div>
  );
}

export default RegulationsPage;