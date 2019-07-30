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
import emailIcon from "@iconify/icons-mdi-light/email";
import userIcon from "@iconify/icons-feather/user";
import lockOutline from "@iconify/icons-ant-design/lock-outline";

import signupValidator from "../../../../shared/validation/signupValidation.js";

@observer
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.usernameChanged = this.usernameChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMessageDismiss = this.onMessageDismiss.bind(this);
  }

  usernameChanged(e) {
    this.props.signupStore.Username = e.target.value;
    this.props.signupStore.Errors.username = undefined;
  }
  emailChanged(e) {
    this.props.signupStore.Email = e.target.value;
    this.props.signupStore.Errors.email = undefined;
  }
  passwordChanged(e) {
    this.props.signupStore.Password = e.target.value;
    this.props.signupStore.Errors.password = undefined;
  }
  confirmPasswordChanged(e) {
    this.props.signupStore.ConfirmPassword = e.target.value;
    this.props.signupStore.Errors.confirmPassword = undefined;
  }
  onMessageDismiss() {
    this.props.signupStore.Errors.general = undefined;
  }
  onSubmit(e) {
    e.preventDefault();
    let data = {
      username: this.props.signupStore.Username,
      email: this.props.signupStore.Email,
      password: this.props.signupStore.Password,
      confirmPassword: this.props.signupStore.ConfirmPassword
    };
    const { errors, isValid } = signupValidator(data);
    if (!isValid) {
      this.props.signupStore.Errors = {
        ...this.props.signupStore.Errors,
        ...errors
      };
      console.log(this.props.signupStore.Errors);
    } else
      this.props.signupStore.submitForm().then(
        data => {
          this.props.signupStore.Loading = false;
          this.props.signupStore.Errors = data;
        }, //Fail
        data => {
          this.props.signupStore.Loading = false;
          this.props.signinStore.Message =
            "Signed up successfully! You can now sign in.";
            this.props.signinStore.MessageType = "success";
            this.props.signinStore.MessageTitle = "User added successfully";
            this.props.signinStore.HasMessage = true;
          this.props.signinStore.Username = this.props.signupStore.Username;
          this.props.signinStore.Password = this.props.signupStore.Password;
          this.props.history.push("sign-in");
        } // Success
      );
  }
  render() {
    const {
      Username,
      Email,
      Password,
      ConfirmPassword,
      Loading,
      LoadingMessage,
      Errors
    } = this.props.signupStore;
    return (
    <div>
      <div className="pad-bot">
        <form className="center pad-top" onSubmit={this.onSubmit}>
          <h4 className="mtext-105 cl2 txt-center p-b-30">Sign Up</h4>
          <Alert
            color={"danger"}
            isOpen={Errors.general !== undefined}
            toggle={this.onMessageDismiss}
          >
            <h4 className="alert-heading">Error!</h4>
            <p>{Errors.general}</p>
          </Alert>
          <div className="form-group">
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-l-62 p-r-30 form-control",
                  { "is-invalid": Errors.username }
                )}
                type="text"
                name="username"
                placeholder="Enter User Name"
                value={Username}
                onChange={this.usernameChanged}
              />
              <Icon
                icon={userIcon}
                width="22"
                height="18"
                className="how-pos4 pointer-none"
              />
            </div>
            {Errors.username && (
              <small className="form-text small-helper text-danger">
                {Errors.username}
              </small>
            )}
          </div>

          <div className="form-group">
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
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
        <p className="mtext-107 cl2 txt-center p-b-30 pad-top">
          Or <Link to="/sign-in" className="mtext-107 cl2 txt-center p-b-30">
            Sign In
          </Link>
        </p>
        </div>
      </div>
    );
  }
}
export default withToastManager(withRouter(SignUp));
