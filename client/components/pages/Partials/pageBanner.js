import React from 'react';

export default class PageBanner extends React.Component {
    render() {
      return (
        <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: `url("/images/about/top.jpg")`}}>
        <h2 className="ltext-105 cl0 txt-center">
          {this.props.title}
        </h2>
      </section>
      );
    }
}
