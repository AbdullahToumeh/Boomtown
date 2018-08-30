import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer';
import ItemCard from './../../components/itemCard';
import Grid from '@material-ui/core/Grid'
import styles from './styles'


const Items = ({ classes }) => (
    <ItemsContainer>
  {({ itemsData: { items, loading, error } }) => {
    if (loading) {
      return 'loading'
    }
    
    if(error) {
      return 'error'
    }
    return(
      <Grid container spacing={24} className={classes.root}>
      {items.map(item =>(
      <Grid item key={item.id} xs={12} sm={6} lg={4}>
        <ItemCard item={item} />
      </Grid>     
    ))}
  </Grid>
    )
    }}
    </ItemsContainer>    
)

export default withStyles(styles)(Items)

