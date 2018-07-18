import { withStyles } from '@material-ui/core/styles'
import React from 'react'

import styles from './styles'

const Profile = ({ classes }) => {
  return (
    <div>
      <p>
        This is the profile page located at <code>/profile/:userId</code>.
      </p>
    </div>
  )
}

export default withStyles(styles)(Profile)
