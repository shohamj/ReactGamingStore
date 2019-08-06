import React from 'react';
import PageBanner from "../Partials/pageBanner.js"
import MUIDataTable from "mui-datatables";
import {toJS} from "mobx"
import {observer} from "mobx-react";
import Modali, { useModali } from 'modali';


@observer
export default class ManageUsers extends React.Component {
    
    componentDidMount(){
        this.props.userStore.getUsers();
    }
    render() {

        const columns = [
            {
             name: "_id",
             label: "ID",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "username",
             label: "Username",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "email",
             label: "Email",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "role",
             label: "Role",
             options: {
              filter: true,
              sort: true,
             }
            },
           ];
        const options = {
          filterType: 'checkbox',
          print: false
        };
        return (
        <div>
        <PageBanner title="Manage Users"/>
          <div className="container p-t-50 p-b-116">
            <MUIDataTable
              title={"User List"}
              data={toJS(this.props.userStore.users)}
              columns={columns}
              options={options}
            />
        </div>
      </div>
      );
    }
}
