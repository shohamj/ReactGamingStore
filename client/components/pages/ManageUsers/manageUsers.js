import React from 'react';
import PageBanner from "../Partials/pageBanner.js"
import MUIDataTable from "mui-datatables";
import {toJS} from "mobx"
import {observer} from "mobx-react";
import Modali, { useModali } from 'modali';
import ManageUsersTable from "./manageUsersTable";
import managerUserCss from "./../../../css/mangmentTables.css"

@observer
export default class ManageUsers extends React.Component {
    
    componentDidMount(){
        this.props.userStore.getUsers();
    }
    render() {
        return (
        <div>
          <ManageUsersTable userStore={this.props.userStore}/>
        </div>
      );
    }
}
