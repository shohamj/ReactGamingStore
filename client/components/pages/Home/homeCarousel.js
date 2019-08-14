import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
export default class HomeCarousel extends React.Component {
    
    render() {
        return (
            <Carousel showArrows={true} interval={4000} transitionTime={1000} autoPlay={true}
                      showThumbs={false} showStatus={false} infiniteLoop={true} >
                <div>
                    <img src="/images/HomeCarousel/lawbreakers_video_game_2017-wallpaper-1920x600.jpg" />
                </div>
                <div>
                    <img src="/images/HomeCarousel/games_6-wallpaper-1920x600.jpg"/>
                </div>
                <div>
                    <img src="/images/HomeCarousel/destiny.jpg"/>
                </div>
            </Carousel>
        );
    }
}