import React from 'react';
import {Link} from 'react-router-dom'
import { Alert } from 'reactstrap';
import classnames from "classnames";
import { withRouter } from "react-router-dom";

import ReactLoading from "react-loading";


import { Icon, InlineIcon } from '@iconify/react';
import userIcon from '@iconify/icons-feather/user';
import lockOutline from '@iconify/icons-ant-design/lock-outline';
import { observer } from "mobx-react"

import signinValidator from "../../../../shared/validation/signinValidation.js";
import ReCAPTCHA from "react-google-recaptcha";

@observer
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.onMessageDismiss = this.onMessageDismiss.bind(this);
    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReCAPTCHAChange = this.onReCAPTCHAChange.bind(this);


}
    onReCAPTCHAChange(value){
      this.props.signinStore.captcha = value;
    }
    onMessageDismiss(){
      this.props.signinStore.Message=""
      this.props.signinStore.MessageType=""
      this.props.signinStore.HasMessage = false;
    }
    passwordChanged(e) {
      this.props.signinStore.Password = e.target.value;
      this.props.signinStore.Errors.password = undefined;
    } 
    usernameChanged(e) {
      this.props.signinStore.Username = e.target.value;
      this.props.signinStore.Errors.username = undefined;
    }
    onSubmit(e) {
      e.preventDefault();
      this.props.signinStore.HasMessage = false;
      let data = {
        username: this.props.signinStore.Username,
        password: this.props.signinStore.Password,
      };
      const { errors, isValid } = signinValidator(data);
      if (!isValid) {
        this.props.signinStore.Errors = {
          ...this.props.signinStore.Errors,
          ...errors
        };
      } else
        this.props.signinStore.submitForm().then(
          data => {
            this.props.signinStore.Loading = false;
            this.props.signinStore.Errors = data;
            if (data.general)
            {
              this.props.signinStore.MessageType = "danger";
              this.props.signinStore.MessageTitle = "Error";
              this.props.signinStore.Message = data.general;
              this.props.signinStore.HasMessage = true;
            }
          }, //Fail
          user => {
            this.props.signinStore.Loading = false;
            this.props.authStore.pullUser()
            this.props.chatStore.reconnect();
            this.props.history.push("/");
          } // Success
        );
    }
    render(){
      const {
        Username,
        Password,
        Loading,
        Message,
        MessageTitle,
        MessageType,
        HasMessage,
        Errors,
        captcha
      } = this.props.signinStore;
        return (
        <div className="pad-bot">
            <form className="center pad-top" onSubmit={this.onSubmit}>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Sign In
                </h4>
                <Alert color={MessageType} isOpen={HasMessage} toggle={this.onMessageDismiss}>
                  <h4 className="alert-heading">{MessageTitle}</h4>
                  <p>
                    {Message}
                  </p>
                </Alert>
              <div className="form-group">
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input  className={classnames("stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control",{ "is-invalid": Errors.username })} 
                  type="text" name="user" placeholder="Enter User Name" value={Username} onChange={this.usernameChanged}/>
                  <Icon icon={userIcon} width="22" height="18" className="how-pos4 pointer-none"/>
                  </div>
                {Errors.username && ( <small className="form-text small-helper text-danger">{Errors.username}</small>)}               
                </div>
                <div className="form-group">
                  <div className="bor8 m-b-20 how-pos4-parent">
                    <input className={classnames("stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control",{ "is-invalid": Errors.password })}
                    type="password" name="password" placeholder="Enter Password" value={Password} onChange={this.passwordChanged}/>
                   <Icon icon={lockOutline} width="22" height="18" className="how-pos4 pointer-none"/>
                   </div>
                </div>
                {Errors.password && ( <small className="form-text small-helper text-danger">{Errors.password}</small>)}               
                <div className="form-group center_recaptcha">
                  <ReCAPTCHA
                    sitekey="6LeC3LMUAAAAAE-pqjN_VBR1BhxNuLdTThiLvoUi"
                    onChange={this.onReCAPTCHAChange}
                  />
                </div>
                {Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
                <button className="flex-c-m stext-101 cl0 size-121 center bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" disabled={Loading || !captcha}>
                  {Loading ? "Submiting..." : "Submit"}
                </button> 
            </form>
            <p className="mtext-107 cl2 txt-center p-b-30 pad-top">
                  Or <Link to="/sign-up" className="mtext-107 cl2 txt-center p-b-30">Sign Up</Link>
            </p>
            <p className="txt-center">
                  <Link className="txt-center" to="/forgotPassword"><u>Forgot password?</u></Link>
            </p>
        </div>
        )
  }
}
export default withRouter(SignIn);

    
