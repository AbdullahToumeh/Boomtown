import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer';
import ItemCard from './../../components/itemCard';
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const Profile = ({ classes, match }) => {
  return (
    <div>
    <ItemsContainer id={match.params.userid}>
    {({ userItemsData: { user, loading, error } }) => {
      if (loading) {
        return 'loading'
      }
      
      if(error) {
        return 'error'
      }
      return(
        <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <CardHeader
              className={classes.cardHeader}
              avatar={<Gravatar email={user.email} className={classes.avatar}/>}
              title={<Typography variant="display3" className={classes.name} > {user.fullname}</Typography>}
            />
            <div className={classes.cardText}>          
              <Typography variant="title" >{user.items.length} Items shared {user.items.length} Items borrowed</Typography>
              <Typography variant="subheading" className={classes.bio}>"{user.bio}"</Typography>
            </div> 
          </CardContent>
        </Card>

        <Typography variant="display1" className={classes.sharedItems}>Shared Items</Typography>

        <Grid container spacing={24} className={classes.grid}>
        {user.items.map(item =>(
        <Grid item key={item.id} xs={12} sm={6} lg={4}>
          <ItemCard item={item} />
        </Grid>     
      ))}
    </Grid>
    </div>
      )
      }}
  </ItemsContainer> 
  </div>
  )
}

export default withStyles(styles)(Profile)
