import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AuthContainer from '../../containers/AuthContainer'
import { Link } from 'react-router-dom'
import { ViewerContext } from '../../context/ViewerProvider'


const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >

          <ViewerContext.Consumer >
            {({ viewer }) => (
              <Link to={`/profile/${viewer.id}`}> 
                <MenuItem onClick={this.handleClose}> Your Profile </MenuItem>
              </Link>
            )}
          </ViewerContext.Consumer>
          <AuthContainer>
            {({ logout }) => {
              return (
                <MenuItem onClick={() => {
                  logout.mutation()
                }}> Log Out</MenuItem>
              )
            }}
          </AuthContainer>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LongMenu;