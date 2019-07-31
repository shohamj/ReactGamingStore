import React from 'react'

import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

export default function MyDropdown(props) {
  return (
    <SlideDown className={'my-dropdown-slidedown'} style={{"width":"100%"}}>
      {props.open ? props.children : null}
    </SlideDown>
  )
}