import React from 'react';
import PageBanner from "../Partials/pageBanner.js"
import ReactPlayer from 'react-player'

export default class About extends React.Component {
    render() {
      return (
      <div>
        <PageBanner title="About"/>	
        {/* Content page */}
        <section className="bg0 p-t-75 p-b-120">
       
          <div className="container">
            <div className="row p-b-148">
              <div className="col-md-7 col-lg-8">
                <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                  <h3 className="mtext-111 cl2 p-b-16">
                    Our Story
                  </h3>
                  <p className="stext-113 cl6 p-b-26">
                  BuyGames is an open marketplace for video games. It’s a platform that enables anyone to buy any game they want. As a seller you’re in charge of how it’s done: you set the price, you run sales, and you design your pages. It’s never necessary to get votes, likes, or follows to get your content approved, and you can make changes to how you distribute your work as frequently as you like.
                  </p>
                  <p className="stext-113 cl6 p-b-26">
                  Every year, we create dozens of experiments around discoverability, video, and more. You know who we thought might enjoy seeing them? Everyone.                  
                  We offer thousands of games on the Humble Store with sales happening every day.When you buy a cross-platform game, you get a version for each available OS.
                  </p>
                  <p className="stext-113 cl6 p-b-26">
                    We’re focused on playing a major role in the digital video game ecosystem and becoming the platform of choice to buy, discuss, promote and publish games. We place the customer at the centre of everything we do, driven by our technology, data, community, brand, partnerships and own publishing division.
                  </p>
                </div>
              </div>
              <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                <div className="how-bor1 ">
                  <div className="hov-img0">
                    <img src="/images/about/Game-PUBG-player-redy-for-match-with-pan-and-AKM.jpg" alt="IMG" />
                  </div>
                </div>
              </div>
            </div>
            
          
 
            <div className="row">
              <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
                <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                  <h3 className="mtext-111 cl2 p-b-16">
                    Our Mission
                  </h3>
                  <p className="stext-113 cl6 p-b-26">
                    To become THE global gaming destination of choice by bringing the magic of games to everyone, everywhere. We’re creating the portal to a million magical worlds. Anddamn, it’s going to be good. We believe the future of the digital entertainment industry will be driven by access to global gamers and great engaging content. And we’re ready to drive that ecosystem.
                  </p>
                 
                  <div className="bor16 p-l-29 p-b-9 m-t-22">
                    <p className="stext-114 cl6 p-r-40 p-b-11">
                      “Action video games are fast-paced, and there are peripheral images and events popping up, and disappearing. These video games are teaching people to become better at taking sensory data in, and translating it into correct decisions.”                    </p>
                    <span className="stext-111 cl8">
                      - Nobody
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
                <div className="how-bor2">
                  <div className="hov-img0">
                    <img src="/images/about/god_king_garen_lol_splash_art_league_of_legends-wallpaper-1280x1280.jpg" alt="IMG" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    }
}
