import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const DummyCaraouselComponent = (props) => {
  return (
    <Carousel>
      {props.videos.map((item) => (
        <div key={item.id}>
          <img src={item.video.coverImageUrl} width="100" alt="cover" />
          <p className="legend">Legend 1</p>
        </div>
      ))}

    </Carousel>
  );
}

export default DummyCaraouselComponent;
