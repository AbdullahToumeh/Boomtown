import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logo from '../../images/boomtown.svg';
import MenueAppbar from '../MenueAppbar/MenueAppbar';
import ShareButton from '../ShareButton/ShareButton'


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  barContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },

};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.barContainer}>
          <Link to="/items">
            <img className={classes.logo} src={ Logo } style={{width: 50, height: 50, marginLeft:-12, marginTop: 5, }} />
          </Link>
          <div style={{display:'flex', alignItems: 'center',  }}>
          <ShareButton />
          <MenueAppbar />
          </div>        
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);