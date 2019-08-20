import React from 'react';
import {observer} from "mobx-react"
import ReactLoading from "react-loading";

@observer
export default class Post extends React.Component {

    render() {
        const {date, author, title, image, categories} = this.props;
        return (
                <div className="p-b-63">
                  <a href="blog-detail.html" className="hov-img0 how-pos5-parent">
                    <img src={image} width="200px" alt="IMG-BLOG" />
                    <div className="flex-col-c-m size-123 bg9 how-pos5">
                      <span className="ltext-107 cl2 txt-center">
                        {22}
                      </span>
                      <span className="stext-109 cl3 txt-center">
                        Jan 2018
                      </span>
                    </div>
                  </a>
                  <div className="p-t-32">
                    <h4 className="p-b-15">
                      <a href="blog-detail.html" className="ltext-108 cl2 hov-cl1 trans-04">
                        {title}
                      </a>
                    </h4>
                    <p className="stext-117 cl6">
                      Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius
                    </p>
                    <div className="flex-w flex-sb-m p-t-18">
                      <span className="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10">
                        <span>
                          <span className="cl4">By</span> {author}
                          <span className="cl12 m-l-4 m-r-6">|</span>
                        </span>
                        <span>
                          {categories.toString()}
                          <span className="cl12 m-l-4 m-r-6">|</span>
                        </span>
                      </span>
                      <a href="blog-detail.html" className="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                        Continue Reading
                        <i className="fa fa-long-arrow-right m-l-9" />
                      </a>
                    </div>
                  </div>
                </div>
        )
    }
}
