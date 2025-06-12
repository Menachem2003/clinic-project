import React from "react";
import './Home.css';

function Home() {
  return (
    <div className="container">
      <div className="titel">
       <h1 className="home-title">ברוכים הבאים למרפאה עירונית מלכימוב קליניק</h1>
       </div>
       <div>
        <div className="picture">
          <img src="/clinic/dentistry1.jpeg" alt="dentisry" className="picture-home"/>
        </div>
      <p className="home-description">
        המרפאה שלנו מציעה מגוון טיפולי שיניים מתקדמים, שירות אדיב וצוות מקצועי עם ניסיון של שנים.
      </p>
      </div>
      <button className="home-button">קבע תור</button>
    </div>

  );
}

export default Home;
