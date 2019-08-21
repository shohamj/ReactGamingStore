import React from 'react';
import {observer} from "mobx-react";
import GameRow from "./gameRow";
import TableBottom from "./tableBottom"
import AddGame from "./addGame.js"
import { Icon, InlineIcon } from '@iconify/react';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import searchIcon from '@iconify/icons-fa-solid/search';
import redoIcon from '@iconify/icons-fa-solid/redo';
import {toJS} from "mobx"
import ReactLoading from "react-loading";
import SkyLight from 'react-skylight';
import CustomScroll from 'react-custom-scroll';

var dialog = {
    height: '80%',
    overflowY: "auto",
    overflowX: "hidden"
};

@observer
export default class GamesTable extends React.Component {
    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {modal: false};
    }
    showModal(){
        this.setState({modal: true})
        this.addGameDialog.show()
    }
    onClose(){
        this.setState({modal: false})
    }
    onSearchChange(e){
        this.props.gameStore.search = e.target.value;
    }
    reload(){
        this.props.gameStore.getGames();
    }
    deleteGame(){
        this.props.gameStore.deleteGame();
        this.props.gameStore.getGames();
        this.deleteGameDialog.hide();
    }
    render() {
        const pageGames = toJS(this.props.gameStore.pageGames);
        const currentpage = toJS(this.props.gameStore.currentpage);
        return (
            <div className="container">
            <div>
                <SkyLight dialogStyles={dialog} hideOnOverlayClicked ref={ref => this.addGameDialog = ref} afterClose={this.onClose} >
                    <CustomScroll>
                        {this.state.modal && <AddGame title="Add Game"/>}
                    </CustomScroll>
                </SkyLight>
                <SkyLight hideOnOverlayClicked ref={ref => this.deleteGameDialog = ref} >
                    <h4 className="mtext-105 cl2 txt-center p-b-10">Delete Game</h4>
                    <div className="m-t-100">
                    <p className="mtext-106 cl2 txt-center p-b-10 ">Are you sure you want to delete game?</p>
                    <button onClick={this.deleteGame} className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn4 p-lr-15 trans-04 pointer">
                        Delete Game
                    </button> 
                    </div>
                </SkyLight>
            </div>
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-5">
                            <h2>Game <b>Management</b></h2>
                        </div>
                        <div className="col-sm-7">
                            <button className="btn btn-primary" style={{height:"35px"}} onClick={this.showModal}><i className="material-icons"><Icon className="material-icons" icon={userPlus} height="20" width="20" /></i> <span>Add New Game</span></button>
                            <button className="btn btn-primary" style={{height:"35px"}} onClick={this.reload}><i className="material-icons"><Icon className="material-icons" icon={redoIcon} height="20" width="20" /></i> <span>Reload Games</span></button>
                            <div    className="btn btn-primary" style={{height:"35px"}}><i className="material-icons"><Icon className="material-icons" icon={searchIcon} height="20" width="20" /></i> <input type="text" placeholder="Search..." value={this.props.gameStore.search} onChange={this.onSearchChange} style={{background:"transparent"}}></input></div>
                        </div>
                    </div>
                </div>
                {this.props.gameStore.loading && <ReactLoading type={"spin"} className="center m-t-100" color={"#428bca"} height={100} width={100}/>}

                {!this.props.gameStore.loading && <table className="table table-striped table-hover">
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>						
                            <th>Genre</th>						
                            <th>Released</th>
                            <th>Added</th>
                            <th>Price</th>
                            <th>Controller</th>
                            <th>Platforms</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                 <tbody>
                 {pageGames.map((game, index) => {
                     return <GameRow game={game} index={index+(currentpage-1)*5 + 1} key={game._id} showDeleteDialog={() => this.deleteGameDialog.show()} gameStore={this.props.gameStore}/>
                    })}
                </tbody>
                </table>
                }
                <TableBottom gameStore={this.props.gameStore}/>
            </div>
        </div>   
        );
    }
}
