import React from 'react';
import {observer} from "mobx-react"
import ReactLoading from "react-loading";
import PageBanner from "../Partials/pageBanner.js"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
@observer
export default class FullPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: {}, loading: true};
    }
    componentDidMount(){
        fetch(`/api/blog/getPost/${this.props.id}`)
        .then(res => res.json())
        .then(res => this.setState({post: res, loading: false}))
        .catch(() => this.setState({post: {}, loading: false}))
    }
    render() {
        console.log(this.state.blog);
        const {author, title, image, categories, text} = this.state.post;
        const date = new Date(this.state.post.date);
        return (
        <div>
            <PageBanner title="Blog Post"/>
            {this.state.loading &&<ReactLoading type={"spin"} className="center pad-bot" color={"#428bca"} height={70} width={70} />}
            {(isEmpty(this.state.post) && !this.state.loading) && <h1>Blog Not found</h1>}
            {!this.state.loading && !isEmpty(this.state.post) && <section className="bg0 p-t-62 p-b-60">
            <div className="container ">
              <div className="col-md-12 col-lg-12 p-b-80">                 
                  <div className="wrap-pic-w how-pos5-parent">
                    <img src={`/images/blog/${image}`} alt="IMG-BLOG" />
                    <div className="flex-col-c-m size-123 bg9 how-pos5">
                      <span className="ltext-107 cl2 txt-center">
                        {date.getDate()}
                      </span>
                      <span className="stext-109 cl3 txt-center">
                      {monthNames[date.getMonth()]} {date.getFullYear()}
                      </span>
                    </div>
                  </div>
                  <div className="p-t-32">
                    <span className="flex-w flex-m stext-111 cl2 p-b-19">
                      <span>
                        <span className="cl4">By</span> {author}  
                        <span className="cl12 m-l-4 m-r-6">|</span>
                      </span>
                      <span>
                        {date.getDate()} {monthNames[date.getMonth()]}, {date.getFullYear()}

                        <span className="cl12 m-l-4 m-r-6">|</span>
                      </span>
                      <span>
                        {categories.join(", ")}  
                        <span className="cl12 m-l-4 m-r-6">|</span>
                      </span>
                    </span>
                    <h4 className="ltext-109 cl2 p-b-28">
                      {title}
                    </h4>
                    <p className="stext-117 cl6 p-b-26">
                        {text}
                    </p>
                  </div>
              </div>
          </div>
          </section>
            }
          </div>
        )
    }
}
