import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div>
      <p>
        This is the share page located at <code>/share</code>.
      </p>
    </div>
  )
}

export default withStyles(styles)(Share)
