import React from 'react';
import styles from './style'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  Avatar,
  IconButton, 
} from '@material-ui/core';
import moment from 'moment';
import Gravatar from 'react-gravatar'
import { Link } from 'react-router-dom'


const ItemCard = ({ classes, item }) => (
      <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={ item.imageurl }
          />
          <Link to={`/profile/${item.itemowner.id}`}>
          <CardHeader
            avatar={<Gravatar email={item.itemowner.email} className={classes.avatar}/>}
            title = {item.itemowner.fullname}
            subheader = {moment(item.created).fromNow()}
          />
         </Link>
        <CardContent>

          <Typography gutterBottom variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography variant="caption" gutterBottom >
          {item.tags.map(tag => tag.title).join(', ')}
          </Typography>
          <Typography variant="subheading" gutterBottom>
          {item.description}
          </Typography>
        </CardContent>           
        <CardActions>
        <Button variant="outlined" className={classes.button}>
          Borrow
        </Button>          
        </CardActions>
      </Card>
  );


ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard);