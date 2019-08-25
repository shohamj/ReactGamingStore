import React from 'react';
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import PageBanner from "../Partials/pageBanner.js"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ReactLoading from "react-loading";
import {CreateKeyFromPublic, Encrypt} from '../../../../shared/encryption/RSAUtills';


import { Icon, InlineIcon } from '@iconify/react';
import accountIcon from '@iconify/icons-zmdi/account';
import lockOutline from '@iconify/icons-ant-design/lock-outline';
import { observer } from "mobx-react"

import UpdateInfoValidator from "../../../../shared/validation/updateInfoValidation.js";

@observer
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state ={currentPassword: "", newPassword: "", email:this.props.authStore.email, errors:{}, loading: false}
    this.onCurrentChanged = this.onCurrentChanged.bind(this);
    this.onNewChanged = this.onNewChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onCurrentChanged(e){
  this.setState({currentPassword: e.target.value, errors: {currentPassword: undefined, newPassword: this.state.errors.newPassword}})
}

onNewChanged(e){
  this.setState({newPassword: e.target.value, errors: {newPassword: undefined, currentPassword: this.state.errors.currentPassword}})
}
onEmailChanged(e){
  let errors = this.state.errors;
  errors.email = undefined;
  this.setState({email: e.target.value, errors})
}
submitInfo(){
  this.setState({loading:true});
  return fetch('/api/users/key')
        .then(response => response.text())
        .then(publicKeyString => CreateKeyFromPublic(publicKeyString))
        .then(key => { return {"currentPassword": Encrypt(this.state.currentPassword, key), 
        "newPassword": Encrypt(this.state.newPassword, key),"email":this.state.email}})
        .then(data => fetch('/api/users/updateInfo', {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
        }))
        .catch(err => {return {general:"Server error: " + err}}) 
        .then(function(response) {
          if (response.status == 200)
            throw "Status is 200";
          if (response.status != 400)
            return {currentPassword: "Server Error!"};
          return response.json();
        })
}
onSubmit(e) {
  e.preventDefault();
  let data = {
    currentPassword: this.state.currentPassword,
    newPassword: this.state.newPassword,
    email: this.state.email,
  };
  const { errors, isValid } = UpdateInfoValidator(data);
  if (!isValid) {
    this.setState({errors: {
      ...this.state.errors,
      ...errors
    }});
  } else
    this.submitInfo()
    .then(
      data => {
        this.setState({loading:false, errors:data});
      }, //Fail
      () => {
        this.setState({loading:false});
        this.setState({newPassword: "", currentPassword: ""})
        this.props.authStore.email = this.state.email;
        confirmAlert({
          title: 'Success',
          message: 'Your info has been updated.',
          buttons: [
            {
              label: 'Ok',
              onClick: undefined
            },
          ]
        })
      } // Success
    );
}
    render(){
      const {
        currentUser,
        role,
        email,
        joined,
        games_bought,
        money_spent,
      } = this.props.authStore;
        return (
          <div>
          <PageBanner title="My Account"/>
          <section className="bg0 p-t-20 p-b-116">
          <div className="container">
            <div className="flex-w flex-tr">
            <div className="size-210 bor10 p-lr-70 p-t-20 p-b-70 p-lr-15-lg w-full-md">
              <form  onSubmit={this.onSubmit}>
                  <h4 className="mtext-105 cl2 txt-center p-b-30">
                    Personal Info
                  </h4>  
                  <label>Username</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="p-r-30 form-control" type="text" value={currentUser} disabled/>
                  </div>
                  <label>Email</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className={classnames("p-r-30 form-control", { "is-invalid": this.state.errors.email })} type="email" value={this.state.email} onChange={this.onEmailChanged}/>
                  </div>
                  {this.state.errors.email && ( <small className="form-text small-helper text-danger">{this.state.errors.email}</small>)}               
                  <div className="form-group">
                  <label>New Password</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input type="password" className={classnames("p-r-30 form-control", { "is-invalid": this.state.errors.newPassword })} type="password" value={this.state.newPassword} onChange={this.onNewChanged} placeholder="Enter new password..."/>
                  </div> 
                  {this.state.errors.newPassword && ( <small className="form-text small-helper text-danger">{this.state.errors.newPassword}</small>)}               
                  </div> 
                  <div className="form-group">
                    <label>Current Password *</label>
                    <div className="bor8 m-b-20 how-pos4-parent">
                      <input className={classnames("p-r-30 form-control", { "is-invalid": this.state.errors.currentPassword })} type="password" value={this.state.currentPassword} onChange={this.onCurrentChanged} placeholder="Enter current password..." autoComplete="new-password"/>
                    </div>  
                    {this.state.errors.currentPassword && ( <small className="form-text small-helper text-danger">{this.state.errors.currentPassword}</small>)}               
                  </div>
                 {this.state.loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
                  <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer m-t-50" disabled={this.state.loading}>
                    {this.state.loading ? "Updating..." : "Update Info"}
                  </button>                 
              </form>
              </div>
              <div className="size-210 bor10 p-lr-70 p-t-20 p-b-70 p-lr-15-lg w-full-md">
              <div>
                  <h4 className="mtext-105 cl2 txt-center p-b-30">
                    System Info
                  </h4>
                  <label>Role</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="p-r-30 form-control" type="text" value={role} disabled/>
                  </div>
                  <label>Joined At</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="p-r-30 form-control" type="text" value={joined.split('T')[0].split('-').reverse().join("/")} disabled/>
                  </div>      
                  <label>Games Bought</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="p-r-30 form-control" type="text" value={games_bought} disabled/>
                  </div>
                  <label>Money Spent</label>
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className="p-r-30 form-control" type="text" value={"$"+money_spent} disabled/>
                  </div>         
              </div>
              </div>
            </div>
          </div>
        </section>
        </div>
        )
  }
}
export default withRouter(Account);

    
