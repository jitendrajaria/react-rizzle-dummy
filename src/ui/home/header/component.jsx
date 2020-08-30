import React from 'react';

import './style.css'

const HeaderComponent = () => {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <button className="btn btn-primary"><a href={process.env.PUBLIC_URL + "/resume.pdf"} download="Jitendra_resume">About Me</a></button>
          </li>
        </ul>
      </nav>
      <div className="main-header__banner">
        <img src={process.env.PUBLIC_URL + "/images/rizzle_banner.png"} alt="banner"></img>
      </div>
    </header>
  );
}

export default HeaderComponent;
