import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ShareItemPreview from './../../components/ShareItemPreview'
import ShareItemForm from './../../components/ShareItemForm/'
import Grid from '@material-ui/core/Grid'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div className={classes.container}>
    <ShareItemPreview className={classes.preview}/>
      <ShareItemForm />
           
    </div>
  )
}

export default withStyles(styles)(Share)
