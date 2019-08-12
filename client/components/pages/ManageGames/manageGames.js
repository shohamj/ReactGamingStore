import React from 'react';
import PageBanner from "../Partials/pageBanner.js"
import MUIDataTable from "mui-datatables";
import {toJS} from "mobx"
import {observer} from "mobx-react";
import Modali, { useModali } from 'modali';
import GamesTable from "./gamesTable.js";
import "./../../../css/mangmentTables.css"

@observer
export default class ManageGames extends React.Component {
    
    componentDidMount(){
        this.props.gameStore.getGames();
    }
    render() {
        return (
        <div>
          <GamesTable gameStore={this.props.gameStore}/>
        </div>
      );
    }
}
