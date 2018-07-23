import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';



const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },

});

function Icons(props) {
  const { classes } = props;

  return (
    <Link to="/share" style={{textTransform: 'uppercase', color: 'black', fontFamily: 'Roboto', fontSize: '0.8rem'}}>
    <div className={classes.root}>
      <Icon className={classes.icon}>add_circle</Icon>
      Share Something
    </div>
    </Link>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);