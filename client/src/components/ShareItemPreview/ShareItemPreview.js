import React from 'react'
import ItemCard  from '../itemCard'
import { connect} from 'react-redux'
import styles from './styles'
import { ViewerContext } from '../../context/ViewerProvider'


const ShareItemPreview = props => (
  <ViewerContext.Consumer>
    {({ loading, error, viewer }) => {
      props.shareItemPreview.itemowner = {
        email: viewer.email,
        fullname:viewer.fullname
      }
    return (
      <div style={{height: 'auto', width: '420px', paddingRight:'20px'}}>
        <ItemCard item={ props.shareItemPreview} />
      </div>
        )
    }}
  </ViewerContext.Consumer>
)

const mapStateToprops = state => {
  return {
    shareItemPreview: state.shareItemPreview
  }
}



export default connect(mapStateToprops)(ShareItemPreview)