import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import { Alert} from "reactstrap";

import ReactLoading from "react-loading";
// Icons
import { Icon } from "@iconify/react";
import emailIcon from "@iconify/icons-mdi-light/email";

import emailValidation from "../../../../shared/validation/emailValidation.js";

@observer
class passwordRecovery extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.emailChanged = this.emailChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMessageDismiss = this.onMessageDismiss.bind(this);
    this.props.passwordRecoveryStore.HasMessage = false;
    this.props.passwordRecoveryStore.Email = "";
  }
 
  emailChanged(e) {
    this.props.passwordRecoveryStore.Email = e.target.value;
    this.props.passwordRecoveryStore.Errors.email = undefined;
  }
  
  onMessageDismiss() {
    this.props.passwordRecoveryStore.Errors.general = undefined;
    this.props.passwordRecoveryStore.HasMessage = false;

  }
  onSubmit(e) {
    e.preventDefault();
    let data ={
        email: this.props.passwordRecoveryStore.Email
    };
    console.log('THIS IS THE EMAIL', data);
      
    const { errors, isValid } = emailValidation(data);
    console.log('THIS IS THE EMAIL', data);

    if (!isValid) {
      this.props.passwordRecoveryStore.Errors = {
        ...this.props.passwordRecoveryStore.Errors,
        ...errors
      };
      console.log(this.props.passwordRecoveryStore.Errors);
    } else {
      this.props.passwordRecoveryStore.submitForm(data)
      .then(
        data => {
          console.log("Fail", data);

          this.props.passwordRecoveryStore.Loading = false;
          this.props.passwordRecoveryStore.Errors = data;

          this.props.passwordRecoveryStore.MessageType = "danger";
          this.props.passwordRecoveryStore.MessageTitle = "Error";
          this.props.passwordRecoveryStore.HasMessage = true;
            //a.props.history.push("sign-in");
            // setTimeout(function(){
            //   a.props.history.push("sign-in");
            // },4000); //delay is in milliseconds 
          
        }, //Fail
        data => {
          console.log("Successed");
          this.props.passwordRecoveryStore.Loading = false;
          this.props.passwordRecoveryStore.Message =
            "Email Have been sent to reset your password";
            this.props.passwordRecoveryStore.MessageType = "success";
            this.props.passwordRecoveryStore.MessageTitle = "Success";
            this.props.passwordRecoveryStore.HasMessage = true;
        } //Success
    );
    }
  }
  render() {
    const {
      Email,
      Loading,
      LoadingMessage,
      Message,
      MessageType,
      HasMessage,
      MessageTitle,
      Errors
    } = this.props.passwordRecoveryStore;
    return (
    <div>
      <div className="pad-bot">
        <form className="center pad-top" onSubmit={this.onSubmit}>
          <h4 className="mtext-105 cl2 txt-center p-b-30">Password recovery</h4>
          <Alert color={MessageType} isOpen={HasMessage} toggle={this.onMessageDismiss}>
            <h4 className="alert-heading">{MessageTitle}</h4>
            <p>
              {Message}
            </p>
          </Alert>
          <div className="form-group">
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                id='email'
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control",
                  { "is-invalid": Errors.email }
                )}
                type="text"
                name="email"
                placeholder="Enter Email Address"
                value={Email}
                onChange={this.emailChanged}
              />
              <Icon
                icon={emailIcon}
                width="22"
                height="18"
                className="how-pos4 pointer-none"
              />
            </div>
            {Errors.email && (
              <small className="form-text small-helper text-danger">
                {Errors.email}
              </small>
            )}
          </div>
          {Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
          <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" disabled={Loading}>
            {Loading ? "Submiting..." : "Submit"}
          </button> 
        </form>
        </div>
      </div>
    );
  }
}
export default withToastManager(withRouter(passwordRecovery));
