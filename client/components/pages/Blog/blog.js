import React from 'react';
import {observer} from "mobx-react"
import ReactLoading from "react-loading";
import PageBanner from "../Partials/pageBanner.js"
import Post from './post'
import Category from './category'
import {Link} from 'react-router-dom'

@observer
export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchChanged = this.onSearchChanged.bind(this);
      }
    componentDidMount(){
        this.props.blogStore.getPosts();
    }
    onSearchChanged(e){
        this.props.blogStore.search = e.target.value;
    }
    render() {
        return (
        <div>
        <PageBanner title="Blog"/>	
        {this.props.blogStore.loading && <ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70} />}
        {!this.props.blogStore.loading && <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {this.props.blogStore.filteredPosts.map((post, index) => {
                     return <Post id={post._id} image={`/images/blog/${post.image}`} text={post.text} title={post.title} author={post.author} date={post.date} categories={post.categories} key={index} />
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
                    <Category blogStore={this.props.blogStore} category="General News"/>
                    <Category blogStore={this.props.blogStore} category="Hardware"/>
                    <Category blogStore={this.props.blogStore} category="Software"/>
                    <Category blogStore={this.props.blogStore} category="Reviews"/>
                    <Category blogStore={this.props.blogStore} category="Consoles"/>
                    <Category blogStore={this.props.blogStore} category="Portables"/>
                  </ul>
                </div>
                <div className="bor17 of-hidden pos-relative m-t-10">
                  <input className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55" type="text" name="search" placeholder="Search" value={this.props.blogStore.search} onChange={this.onSearchChanged} />
                  <i className="zmdi zmdi-search flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04" />
                </div>
                <div className="bor17 of-hidden pos-relative m-t-10">
                <Link to="/blog/post" className="flex-c-m stext-101 cl0 size-121 center bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                    Add New Post
                </Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
        }
        </div>
        )
    }
}
