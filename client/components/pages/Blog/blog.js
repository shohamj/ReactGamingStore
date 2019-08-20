import React from 'react';
import {observer} from "mobx-react"
import ReactLoading from "react-loading";
import PageBanner from "../Partials/pageBanner.js"
import Post from './post'
@observer
export default class Blog extends React.Component {

    render() {
        return (
        <div>
        <PageBanner title="Blog"/>	
        <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {this.props.blogStore.posts.map((post, index) => {
                     return <Post image={post.image} title={post.title} author={post.author} date={post.date} categories={post.categories} key={index} />
                })}              
              </div>
            </div>
            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">
                    Categories
                  </h4>
                  <ul>
                    <li className="bor18">
                      <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                        Fashion
                      </a>
                    </li>
                    <li className="bor18">
                      <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                        Beauty
                      </a>
                    </li>
                    <li className="bor18">
                      <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                        Street Style
                      </a>
                    </li>
                    <li className="bor18">
                      <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                        Life Style
                      </a>
                    </li>
                    <li className="bor18">
                      <a href="#" className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4">
                        DIY &amp; Crafts
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bor17 of-hidden pos-relative m-t-10">
                  <input className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55" type="text" name="search" placeholder="Search" />
                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search" />
                  </button>
                </div>
                <div className="bor17 of-hidden pos-relative m-t-10">
                <button className="flex-c-m stext-101 cl0 size-121 center bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                    Add New Post
                </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
        </div>
        )
    }
}
