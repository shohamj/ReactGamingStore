import React from 'react';


export default class Home extends React.Component {
    render() {
      return (
        <div>
        <div id="cate" className="categories">
        <div className="container">
          <h3>CATEGORIES</h3>
          <div className="categorie-grids">
            <a href="bicycles.html" /><div className="col-md-4 cate-grid grid1"><a href="bicycles.html">
                <h4>FIXED / SINGLE SPEED</h4>
                <p>Are you ready for the 27.5 Revloution ?</p>
              </a><a className="store" href="bicycles.html">GO TO STORE</a>
            </div>
            <a href="bicycles.html" /><div className="col-md-4 cate-grid grid2"><a href="bicycles.html">
                <h4>PREMIMUM SERIES</h4>
                <p>Exclusive Bike Components</p>
              </a><a className="store" href="bicycles.html">GO TO STORE</a>
            </div>
            <a href="bicycles.html" /><div className="col-md-4 cate-grid grid3"><a href="bicycles.html">
                <h4>CITY BIKES</h4>
                <p>Street Playground</p>
              </a><a className="store" href="bicycles.html">GO TO STORE</a>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
      <div className="bikes">	
        <h3>POPULAR BIKES</h3>
        <div className="bikes-grids">			 
          <ul id="flexiselDemo1">
            <li>
              <img src={require("../../images/bik1.jpg")}/>
              <div className="bike-info">
                <div className="model">
                  <h4>FIXED GEAR<span>$249.00</span></h4>							 
                </div>
                <div className="model-info">
                  <select>
                    <option value="volvo">OPTION</option>
                    <option value="saab">Option</option>
                    <option value="opel">Option</option>
                    <option value="audi">Option</option>
                  </select>
                  <a href="bicycles.html">BUY</a>
                </div>						 
                <div className="clearfix" />
              </div>
              <div className="viw">
                <a href="bicycles.html">Quick View</a>
              </div>
            </li>
            <li>
              <img src={require("../../images/bik2.jpg")}/>
              <div className="bike-info">
                <div className="model">
                  <h4>BIG BOY ULTRA<span>$249.00</span></h4>							 
                </div>
                <div className="model-info">
                  <select>
                    <option value="volvo">OPTION</option>
                    <option value="saab">Option</option>
                    <option value="opel">Option</option>
                    <option value="audi">Option</option>
                  </select>
                  <a href="bicycles.html">BUY</a>
                </div>						 
                <div className="clearfix" />
              </div>
              <div className="viw">
                <a href="bicycles.html">Quick View</a>
              </div>
            </li>
            <li>
              <img src={require("../../images/bik3.jpg")} />
              <div className="bike-info">
                <div className="model">
                  <h4>ROCK HOVER<span>$300.00</span></h4>							 
                </div>
                <div className="model-info">
                  <select>
                    <option value="volvo">OPTION</option>
                    <option value="saab">Option</option>
                    <option value="opel">Option</option>
                    <option value="audi">Option</option>
                  </select>
                  <a href="bicycles.html">BUY</a>
                </div>						 
                <div className="clearfix" />
              </div>
              <div className="viw">
                <a href="bicycles.html">Quick View</a>
              </div>
            </li>
            <li>
              <img src={require("../../images/bik4.jpg")} />
              <div className="bike-info">
                <div className="model">
                  <h4>SANSACHG<span>$249.00</span></h4>							 
                </div>
                <div className="model-info">
                  <select>
                    <option value="volvo">OPTION</option>
                    <option value="saab">Option</option>
                    <option value="opel">Option</option>
                    <option value="audi">Option</option>
                  </select>
                  <a href="bicycles.html">BUY</a>
                </div>						 
                <div className="clearfix" />
              </div>
              <div className="viw">
                <a href="bicycles.html">Quick View</a>
              </div>
            </li>
            <li>
              <img src={require("../../images/bik5.jpg")} />
              <div className="bike-info">
                <div className="model">
                  <h4>JETT MAC<span>$340.00</span></h4>							 
                </div>
                <div className="model-info">
                  <select>
                    <option value="volvo">OPTION</option>
                    <option value="saab">Option</option>
                    <option value="opel">Option</option>
                    <option value="audi">Option</option>
                  </select>
                  <a href="bicycles.html">BUY</a>
                </div>						 
                <div className="clearfix" />
              </div>
              <div className="viw">
                <a href="bicycles.html">Quick View</a>
              </div>
            </li>
            <li>
              <img src={require("../../images/bik6.jpg")} />
              <div className="bike-info">
                <div className="model">
                  <h4>SANSACHG<span>$249.00</span></h4>							 
                </div>
                <div className="model-info">
                  <select>
                    <option value="volvo">OPTION</option>
                    <option value="saab">Option</option>
                    <option value="opel">Option</option>
                    <option value="audi">Option</option>
                  </select>
                  <a href="bicycles.html">BUY</a>
                </div>						 
                <div className="clearfix" />
              </div>
              <div className="viw">
                <a href="bicycles.html">Quick View</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="contact">
        <div className="container">
          <h3>CONTACT US</h3>
          <p>Please contact us for all inquiries and purchase options.</p>
          <form>
            <input type="text" placeholder="NAME" required />
            <input type="text" placeholder="SURNAME" required />			 
            <input className="user" type="text" placeholder="USER@DOMAIN.COM" required /><br />
            <textarea placeholder="MESSAGE" defaultValue={require("")} />
            <input type="submit" defaultValue="SEND" />
          </form>
        </div>
      </div>
      </div>
      );
    }
}
