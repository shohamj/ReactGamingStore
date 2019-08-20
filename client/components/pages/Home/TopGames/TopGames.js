
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SingleTopGames from './SingleTopGames';
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
        if(this.state.games != undefined)
            console.log("im rendering", this.state.games);
        return (
        <div className="flex-w flex-c-m">
            {this.state.Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
            {!this.state.Loading && <table>
            <tbody>              
                <tr>
                    {this.state.games.map((game, index) => (
                        <td style={{"padding":"10px"}} key={index}>
                            <SingleTopGames  name={game.name} image={'./../../../../../public/images/games/' + game.mainImage} price={game.price} id={game.id} key={index} /> 
                        </td>
                    ))}
                </tr>
          </tbody>
                </table> }
        </div>
        
        );

    }
}
