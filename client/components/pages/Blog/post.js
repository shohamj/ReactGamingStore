import React from 'react';
import {observer} from "mobx-react"
import ReactLoading from "react-loading";
import {Link} from 'react-router-dom'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
@observer
export default class Post extends React.Component {

    render() {
        const {author, title, image, categories, text, id} = this.props;
        const date = new Date(this.props.date);
        return (
                <div className="p-b-63">
                  <Link to={`/blog/details/${id}`} className="hov-img0 how-pos5-parent">
                    <img src={image} width="200px" alt="IMG-BLOG" />
                    <div className="flex-col-c-m size-123 bg9 how-pos5">
                      <span className="ltext-107 cl2 txt-center">
                        {date.getDate()}
                      </span>
                      <span className="stext-109 cl3 txt-center">
                      {monthNames[date.getMonth()]} {date.getFullYear()}
                      </span>
                    </div>
                  </Link>
                  <div className="p-t-32">
                    <h4 className="p-b-15">
                      <Link to={`/blog/details/${id}`} className="ltext-108 cl2 hov-cl1 trans-04">
                        {title}
                      </Link>
                    </h4>
                    <p className="stext-117 cl6">
                        {text.split(" ").slice(0, 35).join(' ') + "..."}
                    </p>
                    <div className="flex-w flex-sb-m p-t-18">
                      <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                        <span>
                          <span className="cl4">By</span> {author}
                          <span className="cl12 m-l-4 m-r-6">|</span>
                        </span>
                        <span>
                          {categories.toString()}
                          <span className="cl12 m-l-4 m-r-6">&nbsp;|</span>
                        </span>
                      </span>
                      <Link to={`/blog/details/${id}`} className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                        Continue Reading
                        <i className="fa fa-long-arrow-right m-l-9" />
                      </Link>
                    </div>
                  </div>
                </div>
        )
    }
}
