import React from 'react';
import {Link} from 'react-router-dom'
import { Alert } from 'reactstrap';


import { Icon, InlineIcon } from '@iconify/react';
import userIcon from '@iconify/icons-feather/user';
import lockOutline from '@iconify/icons-ant-design/lock-outline';
import { observer } from "mobx-react"

@observer
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.onMessageDismiss = this.onMessageDismiss.bind(this);
}
    onMessageDismiss(){
      this.props.signinStore.Message=""
      this.props.signinStore.MessageType=""

    }
    render(){
        return (
        <div className="pad-bot">
            <form className="center pad-top">
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Sign In
                </h4>
                <Alert color={this.props.signinStore.MessageType} isOpen={this.props.signinStore.Message} toggle={this.onMessageDismiss}>
                  <h4 className="alert-heading">Well done!</h4>
                  <p>
                    {this.props.signinStore.Message}
                  </p>
                </Alert>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control" type="text" name="email" placeholder="Enter User Name" value={this.props.signinStore.Username}/>
                  <Icon icon={userIcon} width="22" height="18" className="how-pos4 pointer-none"/>               
                </div>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" name="email" placeholder="Enter Password" value={this.props.signinStore.Password}/>
                  <Icon icon={lockOutline} width="22" height="18" className="how-pos4 pointer-none"/>               
                </div>
                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  Submit
                </button>
            </form>
            <p className="mtext-107 cl2 txt-center p-b-30 pad-top">
                  Or <Link to="/sign-up" className="mtext-107 cl2 txt-center p-b-30">Sign Up</Link>
            </p>
        </div>)
    }
}
    
