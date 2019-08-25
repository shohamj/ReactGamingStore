import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import { Alert} from "reactstrap";
import Modal from 'react-responsive-modal';

import ReactLoading from "react-loading";

// Icons
import { Icon, InlineIcon } from "@iconify/react";
import lockOutline from "@iconify/icons-ant-design/lock-outline";

import passwordValidator from "../../../../../shared/validation/passwordValidation.js";

@observer
class resetPassword extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.passwordChanged = this.passwordChanged.bind(this);
    this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMessageDismiss = this.onMessageDismiss.bind(this);
    this.props.resetPassStore.HasMessage = false;
  }

 
  passwordChanged(e) {
    this.props.resetPassStore.Password = e.target.value;
    this.props.resetPassStore.Errors.password = undefined;
  }
  confirmPasswordChanged(e) {
    this.props.resetPassStore.ConfirmPassword = e.target.value;
    this.props.resetPassStore.Errors.confirmPassword = undefined;
  }
  onMessageDismiss() {
    console.log("on Message dismis 2019");
    this.props.resetPassStore.HasMessage = false;
  }
  onSubmit(e) {
    e.preventDefault();
    let data = {
      password: this.props.resetPassStore.Password,
      confirmPassword: this.props.resetPassStore.ConfirmPassword
    };
    const { errors, isValid } = passwordValidator(data);
    if (!isValid) {
      this.props.resetPassStore.Errors = {
        ...this.props.resetPassStore.Errors,
        ...errors
      };
      console.log(this.props.resetPassStore.Errors);
    } else
      this.props.resetPassStore.submitForm().then(
        data => {
          console.log('Password Fail');
          this.props.resetPassStore.Loading = false;
          this.props.resetPassStore.Errors = data;
        }, //Fail
        data => {
          console.log('Password Success');
          this.props.resetPassStore.Loading = false;
          this.props.resetPassStore.Message =
            "password updated successfully! You can now sign in.";
            this.props.resetPassStore.MessageType = "success";
            this.props.resetPassStore.MessageTitle = "password updated successfully";
            this.props.resetPassStore.HasMessage = true;
          //this.props.history.push("sign-in");
        } // Success
      );
  }
  render() {
    const {
      Password,
      ConfirmPassword,
      Loading,
      LoadingMessage,
      MessageType,
      HasMessage,
      MessageTitle,
      Message,
      Errors
    } = this.props.resetPassStore;
    return (
    <div>
      <div className="pad-bot">
        <form className="center pad-top" onSubmit={this.onSubmit}>
          <h4 className="mtext-105 cl2 txt-center p-b-30">New password</h4>
          <Alert color={MessageType} isOpen={HasMessage} toggle={this.onMessageDismiss}>
            <h4 className="alert-heading">{MessageTitle}</h4>
            <p>
              {Message}
            </p>
          </Alert>
          <div className="form-group">
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control",
                  { "is-invalid": Errors.password }
                )}
                type="password"
                name="password"
                placeholder="Enter Password"
                value={Password}
                onChange={this.passwordChanged}
              />
              <Icon
                icon={lockOutline}
                width="22"
                height="18"
                className="how-pos4 pointer-none"
              />
            </div>
            {Errors.password && (
              <small className="form-text small-helper text-danger">
                {Errors.password}
              </small>
            )}
          </div>

          <div className="form-group">
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control",
                  { "is-invalid": Errors.confirmPassword }
                )}
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={ConfirmPassword}
                onChange={this.confirmPasswordChanged}
              />
              <Icon
                icon={lockOutline}
                width="22"
                height="18"
                className="how-pos4 pointer-none"
              />
            </div>
            {Errors.confirmPassword && (
              <small className="form-text small-helper text-danger">
                {Errors.confirmPassword}
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
export default withToastManager(withRouter(resetPassword));
