import React from 'react';
import PageBanner from "../Partials/pageBanner.js";
import { Alert} from "reactstrap";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";

import emailValidator from "../../../../shared/validation/emailValidation";

@observer
class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.emailChanged = this.emailChanged.bind(this);
    this.emailMessageChanged = this.emailMessageChanged.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onMessageDismiss = this.onMessageDismiss.bind(this);
  }

  
  emailChanged(e) {
    this.props.contactMailStore.Email = e.target.value;
    this.props.contactMailStore.Errors.email = undefined;  }

  emailMessageChanged(e) {
    this.props.contactMailStore.EmailMessage = e.target.value;
  }
  onMessageDismiss() {
    this.props.contactMailStore.HasMessage = false;

  }
  sendEmail(e) {
    e.preventDefault();

    let data = {
      email: this.props.contactMailStore.Email,
      emailMessage: this.props.contactMailStore.EmailMessage
    };
    this.props.contactMailStore.Email = "";
    this.props.contactMailStore.EmailMessage = "";
    const { errors, isValid } = emailValidator(data);
    if (!isValid) {
      this.props.contactMailStore.Errors = {
        ...this.props.contactMailStore.Errors,
        ...errors
      };
      console.log(this.props.contactMailStore.Errors);
    } else
    {
      this.props.contactMailStore.submitForm(data).then(
        data => {
          console.log('Email sent Fail');
          this.props.contactMailStore.Loading = false;
          this.props.contactMailStore.Errors = data;
        }, //Fail
        data => {
          console.log('Email sent Success');
          this.props.contactMailStore.Loading = false;
          this.props.contactMailStore.Message = "An email has been sent to your email address";
          this.props.contactMailStore.MessageType = "success";
          this.props.contactMailStore.MessageTitle = "Email sent successfully";
          this.props.contactMailStore.HasMessage = true;
          //this.props.history.push("sign-in");
        } // Success
      );
    }
  }


  render() {
    var Email = "";
    var EmailMessage = "";
    var {
      Loading,
      Message,
      MessageTitle,
      MessageType,
      HasMessage,
    } = this.props.contactMailStore;
    return (
      <div>
      <PageBanner title="Contact"/>
      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          <div className="flex-w flex-tr">
            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form onSubmit={this.sendEmail}>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Send Us A Message
                </h4>
                <Alert color={MessageType} isOpen={HasMessage} toggle={this.onMessageDismiss}>
                  <h4 className="alert-heading">{MessageTitle}</h4>
                  <p>
                    {Message}
                  </p>
                </Alert>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input id="emailSource"
                   className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" 
                   name="email" 
                   onChange={this.emailChanged}
                   placeholder="Your Email Address" />
                  <img className="how-pos4 pointer-none" src="/images/icons/icon-email.png" alt="ICON" />
                </div>
                <div className="bor8 m-b-30">
                  <textarea id="emailMessage" onChange={this.emailMessageChanged} className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25" name="msg" placeholder="How Can We Help?" defaultValue={""} />
                </div>
                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" disabled={this.props.contactMailStore.Loading}>
                  {Loading ? "Submiting..." : "Submit"}
                </button>
              </form>
            </div>
            
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker" />
                </span>
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">
                    Address
                  </span>
                  <p className="stext-115 cl6 size-213 p-t-18">
                    Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
                  </p>
                </div>
              </div>
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset" />
                </span>
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">
                    Lets Talk
                  </span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    +972 054 3536632
                  </p>
                </div>
              </div>
              <div className="flex-w w-full">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-envelope" />
                </span>
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">
                    Sale Support
                  </span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    React2019JCT@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
  }
}
export default withToastManager(withRouter(Contact));