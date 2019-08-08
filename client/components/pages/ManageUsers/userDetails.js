import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { Alert} from "reactstrap";
import ReactLoading from "react-loading";
import Select from 'react-select';

// Icons
import { Icon, InlineIcon } from "@iconify/react";
import emailIcon from "@iconify/icons-mdi-light/email";
import userIcon from "@iconify/icons-feather/user";
import lockOutline from "@iconify/icons-ant-design/lock-outline";

import signupValidator from "../../../../shared/validation/signupValidation.js";
import signupStore from "../../../stores/signupStore.js";
const options = [
  { value: 'customer', label: 'Customer' },
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
];

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
    this.roleChanged = this.roleChanged.bind(this);
  }

  usernameChanged(e) {
    signupStore.Username = e.target.value;
    signupStore.Errors.username = undefined;
  }
  emailChanged(e) {
    signupStore.Email = e.target.value;
    signupStore.Errors.email = undefined;
  }
  roleChanged(e) {
    signupStore.RoleLabel = e.label;
    signupStore.RoleValue = e.value;
  }
  passwordChanged(e) {
    signupStore.Password = e.target.value;
    signupStore.Errors.password = undefined;
  }
  confirmPasswordChanged(e) {
    signupStore.ConfirmPassword = e.target.value;
    signupStore.Errors.confirmPassword = undefined;
  }
  onMessageDismiss() {
    signupStore.Errors.general = undefined;
    signupStore.Message="";
    signupStore.MessageType="";
    signupStore.HasMessage = false;
  }
  onSubmit(e) {
    e.preventDefault();
    let data = {
      username: signupStore.Username,
      email: signupStore.Email,
      password: signupStore.Password,
      confirmPassword: signupStore.ConfirmPassword
    };
    const { errors, isValid } = signupValidator(data);
    if (!isValid) {
      signupStore.Errors = {
        ...signupStore.Errors,
        ...errors
      };
      console.log(signupStore.Errors);
    } else
      signupStore.submitForm().then(
        data => {
          signupStore.Loading = false;
          signupStore.Errors = data;
        }, //Fail
        data => {
          signupStore.Loading = false;
          signupStore.MessageTitle =
            "Success!";
          signupStore.MessageType = "success";
          signupStore.Message = "User added successfully";
          signupStore.HasMessage = true;
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
      MessageType,
      MessageTitle,
      Message,
      HasMessage,
      Errors,
      RoleLabel,
      RoleValue
    } = signupStore;
    return (
    <div >
      <div className="">
        <form className="center80 pad-top" onSubmit={this.onSubmit}>
          <h4 className="mtext-105 cl2 txt-center p-b-10">{this.props.title}</h4>
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
          <div className="form-group">
            <Select
                 options={options}
                 value={{ label: RoleLabel, value: RoleValue }}
                 onChange={this.roleChanged}
                 className="bor8 m-b-20 how-pos4-parent"
                 placeholder="Select User's Role..."
            />
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
export default SignUp;
