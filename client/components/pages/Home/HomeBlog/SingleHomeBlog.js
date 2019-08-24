import React from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react";
import ReadMoreReact from 'read-more-react';

@observer
export default class SingleHomeBlog extends React.Component {
    
    render(){
        let {
            author,
            image,
            text,
            title, 
            categories, 
            id,
            date
        } = this.props;
        date = date.split('T')[0];
        var tempDate = date.split('-');
        date = tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0];
        let a = <b style={{color:"blue"}}>{" read more..."}</b>;
        return (
            <div className="col-sm-6 col-md-4 p-b-40" >
                <div className="blog-item" >
                <div className="hov-img0" style={{"borderRadius": "8px"}}>
                    <Link to={"/blog/details/" + id}>
                        <img src={"/images/blog/" + image} alt="IMG-BLOG" />
                    </Link>
                </div>
                <div className="p-t-15">
                    <div className="stext-107 flex-w p-b-14">
                    <span className="m-r-3">
                        <span className="cl4">
                        By {' '}
                        </span>
                        <span className="cl5">
                        {author}
                        </span>
                    </span>
                    <span>
                        <span className="cl4">
                        on {' '}
                        </span>
                        <span className="cl5">
                            {date}
                        </span>
                    </span>
                    </div>
                    <h4 className="p-b-12">
                    <Link to={"/blog/details/" + id} className="mtext-101 cl2 hov-cl1 trans-04">
                        {title}
                    </Link>
                    </h4>
                    <ReadMoreReact text={text} />

                </div>
                </div>
            </div>

       );
    }
}














////
/////
