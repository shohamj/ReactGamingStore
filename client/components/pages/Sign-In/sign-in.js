import React from 'react';
import {Link} from 'react-router-dom'

import { Icon, InlineIcon } from '@iconify/react';
import userIcon from '@iconify/icons-feather/user';
import lockOutline from '@iconify/icons-ant-design/lock-outline';

export default class SignIn extends React.Component {

    render(){
        return (
        <div className="center pad-bot pad-top">
            <form>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Sign In
                </h4>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="email" placeholder="Enter User Name" />
                  <Icon icon={userIcon} width="22" height="18" className="how-pos4 pointer-none"/>               
                </div>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="email" placeholder="Enter Password" />
                  <Icon icon={lockOutline} width="22" height="18" className="how-pos4 pointer-none"/>               
                </div>
                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  Submit
                </button>
            </form>
            <p className="mtext-107 cl2 txt-center p-b-30 pad-top">
                  Or <Link to="/sign-up" className="mtext-107 cl2 txt-center p-b-30">Sign Up</Link>
            </p>
        </div>)
    }
}
    
