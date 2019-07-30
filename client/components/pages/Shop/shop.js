import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import {observer} from "mobx-react"
import FilterButtons from './Filters/filter_buttons.js'
import FiltersPanel from './Filters/Panels/filters_panel.js'
import SearchPanel from './Filters/Panels/search_panel.js'

@observer
export default class Shop extends React.Component {
    render(){
        return (
            <div className="bg0 m-t-23 p-b-140">
              <div className="container">
                <div className="flex-w flex-sb-m p-b-52">
                  <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                    <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">
                      All Products
                    </button>
                    <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".women">
                      Women
                    </button>
                    <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".men">
                      Men
                    </button>
                    <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".bag">
                      Bag
                    </button>
                    <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".shoes">
                      Shoes
                    </button>
                    <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".watches">
                      Watches
                    </button>
                  </div>
                  <FilterButtons shopStore={this.props.shopStore}/>  
                  <SearchPanel   shopStore={this.props.shopStore}/>  
                  <FiltersPanel  shopStore={this.props.shopStore}/>  
                </div>
                <div className="row isotope-grid">
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-01.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Esprit Ruffle Shirt
                          </a>
                          <span className="stext-105 cl3">
                            $16.64
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-02.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Herschel supply
                          </a>
                          <span className="stext-105 cl3">
                            $35.31
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-03.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Only Check Trouser
                          </a>
                          <span className="stext-105 cl3">
                            $25.50
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-04.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Classic Trench Coat
                          </a>
                          <span className="stext-105 cl3">
                            $75.00
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-05.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Front Pocket Jumper
                          </a>
                          <span className="stext-105 cl3">
                            $34.75
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item watches">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-06.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Vintage Inspired Classic 
                          </a>
                          <span className="stext-105 cl3">
                            $93.20
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-07.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Shirt in Stretch Cotton
                          </a>
                          <span className="stext-105 cl3">
                            $52.66
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-08.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Pieces Metallic Printed
                          </a>
                          <span className="stext-105 cl3">
                            $18.96
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item shoes">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-09.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Converse All Star Hi Plimsolls
                          </a>
                          <span className="stext-105 cl3">
                            $75.00
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-10.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Femme T-Shirt In Stripe
                          </a>
                          <span className="stext-105 cl3">
                            $25.85
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-11.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Herschel supply 
                          </a>
                          <span className="stext-105 cl3">
                            $63.16
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-12.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Herschel supply
                          </a>
                          <span className="stext-105 cl3">
                            $63.15
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-13.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            T-Shirt with Sleeve
                          </a>
                          <span className="stext-105 cl3">
                            $18.49
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-14.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Pretty Little Thing
                          </a>
                          <span className="stext-105 cl3">
                            $54.79
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item watches">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-15.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Mini Silver Mesh Watch
                          </a>
                          <span className="stext-105 cl3">
                            $86.85
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* Block2 */}
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img src="images/product-16.jpg" alt="IMG-PRODUCT" />
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                          Quick View
                        </a>
                      </div>
                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            Square Neck Back
                          </a>
                          <span className="stext-105 cl3">
                            $29.64
                          </span>
                        </div>
                        <div className="block2-txt-child2 flex-r p-t-3">
                          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Load more */}
                <div className="flex-c-m flex-w w-full p-t-45">
                  <a href="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
                    Load More
                  </a>
                </div>
              </div>
            </div>
          );
    }
}