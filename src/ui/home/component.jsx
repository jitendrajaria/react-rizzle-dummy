import React from 'react';
import HeaderComponent from './header/component';
import './style.css'
import MobileComponent from './mobile/component';

const HomeComponent = (props) => {
  return (
    <main>
      <section>
        <HeaderComponent></HeaderComponent>
      </section>
      <section className="text-heading">
        <div className=" large-text">Talk to the world
        <br />through short videos
        </div>
      </section>
      {/* To do implement this dummy component to enhance the UI  */}
      {/* <section>
        <DummyCaraouselComponent videos={props.videosArray}></DummyCaraouselComponent>
      </section> */}
      <section>
        <MobileComponent videos={props.videosArray}></MobileComponent>
      </section>
    </main>
  );
}

export default HomeComponent;
