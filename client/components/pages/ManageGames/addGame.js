import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { Alert} from "reactstrap";
import ReactLoading from "react-loading";
import Select from 'react-select';

import gameValidator from "../../../../shared/validation/gameValidator.js";
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
    this.descriptionChanged = this.descriptionChanged.bind(this);
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
    addGameStore.Errors.platform = undefined;
  }
  genreChanged(options) {
    addGameStore.Genres = options;
    addGameStore.Errors.genre = undefined;
  }
  descriptionChanged(e) {
    addGameStore.Description = e.target.value;
    addGameStore.Errors.description = undefined;
  }
  onMessageDismiss() {
    addGameStore.addGameStore.Errors.general = undefined;
    addGameStore.Message="";
    addGameStore.MessageType="";
    addGameStore.HasMessage = false;
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("test")
    let data = {
      name: addGameStore.Name,
      image: addGameStore.Image[0],
      genre: addGameStore.Genres.map((elem) => elem.value),
      platform: addGameStore.Platforms.map((elem) => elem.value),
      price: addGameStore.Price,
      released: addGameStore.Release,
      controller: addGameStore.Controller,
      description: addGameStore.Description,
  }
    const { errors, isValid } = gameValidator(data, data.image);
    if (!isValid) {
      addGameStore.Errors = {
        ...addGameStore.Errors,
        ...errors
      };
    } else
      addGameStore.submitForm().then(
        data => {
          addGameStore.Loading = false;
          addGameStore.Errors = data;
        }, //Fail
        data => {
          addGameStore.Loading = false;
          addGameStore.MessageTitle =
            "Success!";
          addGameStore.MessageType = "success";
          addGameStore.Message = "Game added successfully";
          addGameStore.HasMessage = true;
        } // Success
      );
  }
  render() {
    return (
    <div >
      <div className="">
        <form className="center80 pad-top" onSubmit={this.onSubmit} encType="multipart/form-data">
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
                  { "is-invalid": addGameStore.Errors.price }
                )}
                type="number"
                name="price"
                min="0"
                step="0.01"
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
                 className={"basic-multi-select  m-b-20 how-pos4-parent " + (addGameStore.Errors.genre? "bor8-invalid" : "bor8")} 
                 classNamePrefix="select"
                 placeholder="Select Game's Genres..."
            />
            {addGameStore.Errors.genre && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.genre}
              </small>
            )}
            </div>   
          <div className="form-group">
           <label>Supported Platforms</label>
          <Select           
                 isMulti                
                 options={platforms}
                 value={addGameStore.Platforms}
                 onChange={this.platformChanged}
                 className={"basic-multi-select  m-b-20 how-pos4-parent " + (addGameStore.Errors.platform? "bor8-invalid" : "bor8")} 
                 classNamePrefix="select"
                 placeholder="Select Supported Platforms..."
          />  
          {addGameStore.Errors.platform && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.platform}
              </small>
            )}
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
          <div className="form-group">
            <label>Game's Description</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <textarea
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                  { "is-invalid": addGameStore.Errors.description }
                )}
                name="description"
                placeholder="Enter Game's Description..."
                value={addGameStore.description}
                onChange={this.descriptionChanged}
              />
            </div>
            {addGameStore.Errors.description && (
              <small className="form-text small-helper text-danger">
                {addGameStore.Errors.description}
              </small>
            )}
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
