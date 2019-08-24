import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from "./carouselItem"
 
export default class HomeCarousel extends React.Component {
    
    render() {
        return (
            <Carousel showArrows={true} interval={4000} transitionTime={1000} autoPlay={true}
                      showThumbs={false} showStatus={false} infiniteLoop={true} >

                <CarouselItem image="/images/HomeCarousel/metro_moon-wallpaper-1920x1080.jpg" firstHeader="Adventure Games" secondHeader="Find &amp; Explore"/> 
                <CarouselItem image="/images/HomeCarousel/tom_clancys_rainbow_six_siege-wallpaper-1920x1080.jpg" firstHeader="Multiplayer Games" secondHeader="Play With Friends"/> 
                <CarouselItem image="/images/HomeCarousel/destiny_2_2017_video_game-wallpaper-1920x1080.jpg" firstHeader="Games for Consoles" secondHeader="Destiny &amp; More"/> 


            </Carousel>
        );
    }
}