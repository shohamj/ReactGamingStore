import React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import ReactLoading from "react-loading";
import Select from 'react-select';

import gameValidator from "../../../../shared/validation/gameValidator.js";
import addPostStore from "../../../stores/addPostStore.js";


const categories = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Indie', label: 'Indie' },
  { value: 'Multiplayer', label: 'Multiplayer' },
  { value: 'Racing', label: 'Racing' },
  { value: 'Sports', label: 'Sports' }
]

@observer
export default class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.authorChanged = this.authorChanged.bind(this);
    this.imageChanged = this.imageChanged.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.textChanged = this.textChanged.bind(this);
    this.categoriesChanged = this.categoriesChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
 
  authorChanged(e) {
    addPostStore.Author = e.target.value;
    addPostStore.Errors.author = undefined;
  }
  imageChanged(e) {
    addPostStore.Image = e.target.files;
    addPostStore.Errors.image = undefined;
  }
  titleChanged(e) {
    addPostStore.Title = e.target.value;
    addPostStore.Errors.title = undefined;
  }
  textChanged(e) {
    addPostStore.Text = e.target.value;
    addPostStore.Errors.text = undefined;
  }
  categoriesChanged(options) {
    addPostStore.Categories = options;
    addPostStore.Errors.categories = undefined;
  }
  onSubmit(e) {
    e.preventDefault();
    let data = {
      name: addPostStore.Name,
      image: addPostStore.Image[0],
      genre: addPostStore.Genres.map((elem) => elem.value),
      platform: addPostStore.Platforms.map((elem) => elem.value),
      price: addPostStore.Price,
      released: addPostStore.Release,
      controller: addPostStore.Controller,
      description: addPostStore.Description,
  }
    const { errors, isValid } = gameValidator(data);
    if (!isValid) {
      addPostStore.Errors = {
        ...addPostStore.Errors,
        ...errors
      };
    } else
      addPostStore.submitForm().then(
        data => {
          addPostStore.Loading = false;
          addPostStore.Errors = data;
        }, //Fail
        data => {
          addPostStore.Loading = false;
          addPostStore.MessageTitle =
            "Success!";
          addPostStore.MessageType = "success";
          addPostStore.Message = "Game added successfully";
          addPostStore.HasMessage = true;
        } // Success
      );
  }
  render() {
    return (
    <div >
      <div className="center p-b-30">
        <form className="center80 pad-top" onSubmit={this.onSubmit} encType="multipart/form-data">
          <h4 className="mtext-105 cl2 txt-center p-b-10">Add New Post</h4>  
          <div className="form-group">
          <label>Image</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control inputfile",
                  { "is-invalid": addPostStore.Errors.image }
                )}
                type="file"
                name="image"
                files={addPostStore.Image}
                onChange={this.imageChanged}
              />
            </div>
            {addPostStore.Errors.image && (
              <small className="form-text small-helper text-danger">
                {addPostStore.Errors.image}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Author</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                  { "is-invalid": addPostStore.Errors.author }
                )}
                type="text"
                placeholder="Enter Author's Name..."
                value={addPostStore.author}
                onChange={this.authorChanged}
              />
            </div>
            {addPostStore.Errors.name && (
              <small className="form-text small-helper text-danger">
                {addPostStore.Errors.author}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Title</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                  { "is-invalid": addPostStore.Errors.title }
                )}
                type="text"
                placeholder="Enter Post's Title..."
                value={addPostStore.title}
                onChange={this.priceChanged}
              />
            </div>
            {addPostStore.Errors.title && (
              <small className="form-text small-helper text-danger">
                {addPostStore.Errors.title}
              </small>
            )}
          </div>
          <div className="form-group">
           <label>Categories</label>
          <Select           
                 isMulti                
                 options={categories}
                 value={addPostStore.Categories}
                 onChange={this.categoriesChanged}
                 className={"basic-multi-select  m-b-20 how-pos4-parent " + (addPostStore.Errors.categories? "bor8-invalid" : "bor8")} 
                 classNamePrefix="select"
                 placeholder="Select Post's Categories..."
          />  
          {addPostStore.Errors.categories && (
              <small className="form-text small-helper text-danger">
                {addPostStore.Errors.categories}
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Text</label>
            <div className="bor8 m-b-20 how-pos4-parent">
              <textarea
                className={classnames(
                  "stext-111 cl2 plh3 size-116 p-r-30 form-control",
                  { "is-invalid": addPostStore.Errors.text }
                )}
                name="description"
                placeholder="Enter Post's Text..."
                value={addPostStore.Text}
                onChange={this.textChanged}
              />
            </div>
            {addPostStore.Errors.text && (
              <small className="form-text small-helper text-danger">
                {addPostStore.Errors.text}
              </small>
            )}
          </div>
          {addPostStore.Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
          <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" disabled={addPostStore.Loading}>
            {addPostStore.Loading ? "Submiting..." : "Submit"}
          </button> 
        </form>
        </div>
      </div>
    );
  }
}
