import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CSSGrid, layout } from 'react-stonecutter';
import SingleHomeBlog from './SingleHomeBlog';
import {observer} from "mobx-react";
import ReactLoading from "react-loading";

@observer
export default class HomeBlog extends React.Component {

    constructor(props) {
      super(props);
      this.state = {Loading: true, posts: undefined};
    }
    componentDidMount(){
        console.log("DIdmount");
        this.setState({Loading:true});
        const that = this;
        var ourPosts = fetch('/api/blog/limitPostsList')
        .then(response => response.json())
        .then(function a(response){
            return response;
        });
        var value = ourPosts.then(function(result){
            that.state.posts = result;
            console.log("here we are",  that.state.posts);
            that.setState({Loading:false});
            return result;
        });
    }

 


    render() {
      console.log("im in HomneBlog");
      return(
        
        <section className="sec-blog bg0 p-t-70 p-b-90">
          <div className="container">
            <div className="p-b-66">
              <h3 className="ltext-105 cl5 txt-center respon1">
                Our Blogs
              </h3>
            </div>
          <div className="flex-w flex-c-m">
            {this.state.Loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70}/>}
            {!this.state.Loading && 
              <div className="row">
                  {this.state.posts.map((post, index) => (
                    <SingleHomeBlog author={post.author} id={post._id} image={post.image} text={post.text} title={post.title} category={post.categories} date={post.date} key={index}/>
                ))}
              </div>
            }
          </div>
        </div>
      </section>

      );
    }
}
