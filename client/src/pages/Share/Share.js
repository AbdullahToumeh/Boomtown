import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ShareItemPreview from './../../components/ShareItemPreview'
import ShareItemForm from './../../components/ShareItemForm/'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div>
      <ShareItemPreview />
      <ShareItemForm />
           
    </div>
  )
}

export default withStyles(styles)(Share)
