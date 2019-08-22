import React from "react";
import { observer } from "mobx-react";
import PageBanner from "../Partials/pageBanner.js";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import classnames from "classnames";
import chatUserValidator from '../../../../shared/validation/chatUserValidator.js';
import ReactLoading from "react-loading";

@observer
export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.nameChanged = this.nameChanged.bind(this);
    this.imageChanged = this.imageChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  imageChanged(e) {
    this.props.chatStore.registerImage = e.target.files;
    this.props.chatStore.errors.image = undefined;
  }
  nameChanged(e) {
    this.props.chatStore.registerName = e.target.value;
    this.props.chatStore.errors.name = undefined;
  }
  onSubmit(e) {
    e.preventDefault();
    const { errors, isValid } = chatUserValidator(this.props.chatStore.registerName,this.props.chatStore.registerImage[0]);
    if (!isValid) {
      this.props.chatStore.errors = {
        ...this.props.chatStore.errors,
        ...errors
      };
    } else
        this.props.chatStore.submitRegisterForm().then(
        data => {
          this.props.chatStore.registerLoading = false;
          this.props.chatStore.errors = data;
        }, //Fail
        () => {
          this.props.chatStore.registerLoading = false;
          this.props.chatStore.pullUser();
        } // Success
      );
  }
  componentDidMount(){
    if (!this.props.chatStore.loading)
      confirmAlert({
        title: 'Welcome',
        message: "It seems that you don't have a chat account yet. Please sign up to the chat service first.",
        buttons: [
          {
            label: 'Ok',
            onClick: undefined
          },
        ]
      })
  }
  render() {
    const chatStore = this.props.chatStore;
    return (
      <div>
        <PageBanner title="Chat" />
        <div className="">
          <form
            className="center pad-top"
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
          >
            <h4 className="mtext-105 cl2 txt-center p-b-10">
              Create Chat User
            </h4>   
            <div className="form-group">
              <label>Your Image</label>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className={classnames(
                    "stext-111 cl2 plh3 size-116 p-r-30 form-control inputfile",
                    { "is-invalid": chatStore.errors.image }
                  )}
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  name="image"
                  files={ chatStore.registerImage }
                  onChange={this.imageChanged}
                />
              </div>
              {chatStore.errors.image && (
                <small className="form-text small-helper text-danger">
                  {chatStore.errors.image}
                </small>
              )}
            </div>
            <div className="form-group">
              <label>Your Name</label>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className={classnames(
                    "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                    { "is-invalid": chatStore.errors.name }
                  )}
                  type="text"
                  name="name"
                  placeholder="Choose a name..."
                  value={chatStore.registerName}
                  onChange={this.nameChanged}
                />
              </div>
              {chatStore.errors.name && (
                <small className="form-text small-helper text-danger">
                  {chatStore.errors.name}
                </small>
              )}
            </div>  
            {chatStore.registerLoading && (
              <ReactLoading
                type={"spin"}
                className="center pad-bot"
                color={"#428bca"}
                height={70}
                width={70}
              />
            )}
            <button
              className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer m-b-40"
              disabled={chatStore.registerLoading}
            >
              {chatStore.registerLoading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
