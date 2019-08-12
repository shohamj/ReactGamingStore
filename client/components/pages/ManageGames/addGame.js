import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { Alert} from "reactstrap";
import ReactLoading from "react-loading";
import Select from 'react-select';

import signupValidator from "../../../../shared/validation/signupValidation.js";
import addGameStore from "../../../stores/addGameStore.js";
import Toggle from 'react-toggle'

import '../../../css/toggle.css'

const genres = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Indie', label: 'Indie' },
  { value: 'Multiplayer', label: 'Multiplayer' },
  { value: 'Racing', label: 'Racing' },
  { value: 'Sports', label: 'Sports' }
]

const platforms = [
  { value: 'PC', label: 'PC' },
  { value: 'Linux', label: 'Linux' },
  { value: 'MAC', label: 'MAC OSX' }
]
@observer
class AddGame extends React.Component {
  constructor(props) {
    super(props);
    this.nameChanged = this.nameChanged.bind(this);
    this.imageChanged = this.imageChanged.bind(this);
    this.priceChanged = this.priceChanged.bind(this);
    this.releaseChanged = this.releaseChanged.bind(this);
    this.controllerChanged = this.controllerChanged.bind(this);
    this.platformChanged = this.platformChanged.bind(this);
    this.genreChanged = this.genreChanged.bind(this);
  }
 
  nameChanged(e) {
    addGameStore.Name = e.target.value;
    addGameStore.Errors.name = undefined;
  }
  imageChanged(e) {
    addGameStore.Image = e.target.files;
    addGameStore.Errors.image = undefined;
  }
  priceChanged(e) {
    addGameStore.Price = e.target.value;
    addGameStore.Errors.price = undefined;
  }
  releaseChanged(e) {
    addGameStore.Release = e.target.value;
    addGameStore.Errors.release = undefined;
  }
  controllerChanged(e) {
    console.log(e.target.value)
    addGameStore.Controller = e.target.checked;
    addGameStore.Errors.controller = undefined;
  }
  platformChanged(options) {
    addGameStore.Platforms = options;
    addGameStore.Errors.platforms = undefined;
  }
  genreChanged(options) {
    addGameStore.Genres = options;
    addGameStore.Errors.genres = undefined;
  }
  onMessageDismiss() {
    addGameStore.addGameStore.Errors.general = undefined;
    addGameStore.Message="";
    addGameStore.MessageType="";
    addGameStore.HasMessage = false;
  }
  // onSubmit(e) {
  //   e.preventDefault();
  //   let data = {
  //     username: addGameStore.Username,
  //     email: addGameStore.Email,
  //     password: addGameStore.Password,
  //     confirmPassword: addGameStore.ConfirmPassword
  //   };
  //   const { errors, isValid } = signupValidator(data);
  //   if (!isValid) {
  //     addGameStore.addGameStore.Errors = {
  //       ...addGameStore.addGameStore.Errors,
  //       ...errors
  //     };
  //     console.log(addGameStore.addGameStore.Errors);
  //   } else
  //     addGameStore.submitForm().then(
  //       data => {
  //         addGameStore.Loading = false;
  //         addGameStore.addGameStore.Errors = data;
  //       }, //Fail
  //       data => {
  //         addGameStore.Loading = false;
  //         addGameStore.MessageTitle =
  //           "Success!";
  //         addGameStore.MessageType = "success";
  //         addGameStore.Message = "User added successfully";
  //         addGameStore.HasMessage = true;
  //       } // Success
  //     );
  // }
  onSubmit(e) {
    e.preventDefault();
    addGameStore.submitForm();
  }
  render() {
    return (
    <div >
      <div className="">
        <form className="center80 pad-top" onSubmit={this.onSubmit} enctype="multipart/form-data">
          <h4 className="mtext-105 cl2 txt-center p-b-10">{this.props.title}</h4>
          <Alert color={addGameStore.MessageType} isOpen={addGameStore.HasMessage} toggle={this.onMessageDismiss}>
                  <h4 className="alert-heading">{addGameStore.MessageTitle}</h4>
                  <p>
                    {addGameStore.Message}
                  </p>
          </Alert>    
          <div className="form-group">
          <label>Game's Image</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control inputfile",
                  { "is-invalid": addGameStore.Errors.image }
                )}
                type="file"
                name="image"
                files={addGameStore.Image}
                onChange={this.imageChanged}
              />
            </div>
            {addGameStore.Errors.image && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.image}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Game's Name</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                  { "is-invalid": addGameStore.Errors.name }
                )}
                type="text"
                name="name"
                placeholder="Enter Game's Name..."
                value={addGameStore.name}
                onChange={this.nameChanged}
              />
            </div>
            {addGameStore.Errors.name && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.name}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Price</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                  { "is-invalid": addGameStore.Errors.password }
                )}
                type="number"
                name="price"
                min="0"
                placeholder="Enter Price..."
                value={addGameStore.price}
                onChange={this.priceChanged}
              />
            </div>
            {addGameStore.Errors.price && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.price}
              </small>
            )}
          </div>
          
          <div className="form-group">
           <label>Game's Genre</label>
          <Select           
                 isMulti    
                 options={genres}
                 value={addGameStore.Genres}
                 onChange={this.genreChanged}
                 className="basic-multi-select bor8 m-b-20 how-pos4-parent"
                 classNamePrefix="select"
                 placeholder="Select Game's Genres..."
            />
            </div>   
          <div className="form-group">
           <label>Supported Platforms</label>
          <Select           
                 isMulti                
                 options={platforms}
                 value={addGameStore.Platforms}
                 onChange={this.platformChanged}
                 className="basic-multi-select bor8 m-b-20 how-pos4-parent"
                 classNamePrefix="select"
                 placeholder="Select Supported Platforms..."
          />  
          </div>
           <div className="form-group">
           <label>Release Date</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "p-r-30 form-control",
                  { "is-invalid": addGameStore.Errors.release }
                )}
                type="date"
                name="released"
                value={addGameStore.Release}
                onChange={this.releaseChanged}
              />
            </div>
            {addGameStore.Errors.release && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.release}
              </small>
            )}
          </div>
          <div className="form-group">
           <label>Has Controller Support</label>
            <label>
              <Toggle
                defaultChecked={false}
                checked={addGameStore.Controller}
                onChange={this.controllerChanged} />
            </label>
          </div>
          {addGameStore.Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
          <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" disabled={addGameStore.Loading}>
            {addGameStore.Loading ? "Submiting..." : "Submit"}
          </button> 
        </form>
        </div>
      </div>
    );
  }
}
export default AddGame;
