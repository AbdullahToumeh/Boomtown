import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer';
import Appbar from '../../components/Appbar/Appbar';


import styles from './styles'


const Items = ({ classes }) => {
  return (
    <div>
    <Appbar />
    <ItemsContainer>
  {({ itemsData: { items, loading, error } }) => {
    if (loading) {
      return 'loading'
    }

    if(error) {
      return 'error'
    }
 
    return items.map(item =>(
      console.log(items)
    )
  )
  }}
    </ItemsContainer>
    </div>
    
        // {
          /* <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card> */
    // }

  
  )
}

export default withStyles(styles)(Items)

