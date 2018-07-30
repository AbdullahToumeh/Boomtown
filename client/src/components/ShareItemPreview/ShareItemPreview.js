import React from 'react'
import ItemCard  from '../itemCard'
import { connect} from 'react-redux'

const ShareItemPreview = props => {
  return <ItemCard item={ props.shareItemPreview}/>
}

const mapStateToprops = state => {
  return {
    shareItemPreview: state.shareItemPreview
  }
}



export default connect(mapStateToprops)(ShareItemPreview)