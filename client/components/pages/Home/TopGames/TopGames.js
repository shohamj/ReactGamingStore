
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GameCard from './../../Shop/Games/gameCard'
import {observer} from "mobx-react";
import ReactLoading from "react-loading";
import { th } from 'date-fns/esm/locale';
const a = require('./../../../../../public/images/games/enslaved/main.png')

@observer
export default class TopGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Loading: true, games: undefined};
    }
    componentDidMount(){
        this.setState({Loading:true});
        const that = this;
        var topGames = fetch('/api/games/topGamesList')
        .then(response => response.json())
        .then(function a(response){
            return response;
        });
        var value = topGames.then(function(result){
            that.state.games = result;
            that.setState({Loading:false});
            return result;
        });
    }
    render() {
        return (
        <section className="sec-product bg0 p-t-70">
            <div className="container">
              <div className="p-b-32">
                <h3 className="ltext-105 cl5 txt-center respon1 p-b-20">
                  Top Games
                </h3>
                </div>
                <div className="container">
                        {this.state.Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
                        {!this.state.Loading && 
                            <div className="row">
                                {this.state.games.map((game, index) => (
                                <div className="col-sm-6 col-md-4 p-b-40" key={index}>
                                    <GameCard  name={game.name} image={game.mainImage} price={game.price} id={game._id} key={index} /> 
                                </div>
                                ))}
                             </div>
                        }
                </div>
                </div>
        </section>
        
        );

    }
}
