import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer';
import Appbar from '../../components/Appbar/Appbar';
import ItemCard from './../../components/itemCard'



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
      <ItemCard item={item}/>
      
    )
  )
  }}
    </ItemsContainer>
    </div>
      
  )
}

export default withStyles(styles)(Items)

