import React from 'react';
import {Link} from 'react-router-dom';


export default class Footer extends React.Component {
        constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
      }

      onSubmit(data) {
        console.log(this.props.HomeCategoriesStore);
        console.log(data);
        this.props.HomeCategoriesStore.genre = data;
      }
    render() {
      return (
        <footer className="bg3 p-t-75 p-b-32 footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3 p-b-50">
                <h4 className="stext-301 cl0 p-b-30">
                  Navigate
                </h4>
                <ul>
                  <li className="p-b-10">
                    <Link to="/blog" className="stext-107 cl7 hov-cl1 trans-04"> 
                      Blog
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link to="/about" className="stext-107 cl7 hov-cl1 trans-04">
                      About us
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link to="/contact" className="stext-107 cl7 hov-cl1 trans-04">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-lg-3 p-b-50">
                <h4 className="stext-301 cl0 p-b-30">
                  Help
                </h4>
                <ul>
                  <li className="p-b-10">
                    <Link to="/sign-up" className="stext-107 cl7 hov-cl1 trans-04">
                      Join now
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link to="about" className="stext-107 cl7 hov-cl1 trans-04">
                      Learn more
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link to="Account" className="stext-107 cl7 hov-cl1 trans-04">
                      Manage Account
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-lg-3 p-b-50">
                <h4 className="stext-301 cl0 p-b-30">
                  GET IN TOUCH
                </h4>
                <p className="stext-107 cl7 size-201">
                  Any questions? Let us know in store at 8th floor, 21 H'avad Haleomi St, Jerusalem, IL or call us on (+972) 054 716 6879
                </p>
              </div>
              <div className="col-sm-6 col-lg-3 p-b-50">
                <h4 className="stext-301 cl0 p-b-30">
                  Newsletter
                </h4>
                <form>
                  <div className="wrap-input1 w-full p-b-4">
                    <input className="input1 bg-none plh1 stext-107 cl7" type="text" name="email" placeholder="email@example.com" />
                    <div className="focus-input1 trans-04" />
                  </div>
                  <div className="p-t-18">
                    <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="p-t-40">
              <p className="stext-107 cl6 txt-center">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </footer>
      );
    }
}
