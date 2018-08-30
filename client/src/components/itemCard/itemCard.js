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

const ItemCard = ({ classes, item }) => (
      <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={ item.imageurl }
          />
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title = {item.itemowner.fullname}
            subheader = {moment(item.created).fromNow()}
          />
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