import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <div className="titel-picture">
        <img src="/clinic/hero-home.jpg" alt="dentisry" className="hero-home" />
        <h1 className="home-title">
          ברוכים הבאים למרפאה עירונית מלכימוב קליניק
        </h1>
      </div>
      <div>
        <p className="home-description">
          המרפאה שלנו מציעה מגוון טיפולי שיניים מתקדמים, שירות אדיב וצוות מקצועי
          עם ניסיון של שנים.
        </p>
      </div>
      <button className="home-button">קבע תור</button>
    </div>
  );
}

export default Home;
