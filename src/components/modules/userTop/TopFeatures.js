import React from "react";
//Todo Accousicness.value is still not a number i.e NaN
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Slide from 'react-reveal/Slide';


const style = {
  width: '100%',
  bgcolor: 'background.paper',
  color: 'primary.main' ,

 
};


export const TopFeatures = ({ topAudioFeatures }) => {
  return (
    <div style={{margin: 50}}>
      <Slide right>
      <p style={{fontSize:25,fontWeight:500}}> from top features in top</p>     

      <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary={topAudioFeatures.valence.value} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary= {topAudioFeatures.valence.desc}/>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary= {topAudioFeatures.acousticness.desc}/>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={topAudioFeatures.energy.desc}/>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary= {topAudioFeatures.energy.value}/>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={topAudioFeatures.tempo.desc} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={topAudioFeatures.tempo.value}/>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={topAudioFeatures.speechiness.desc}/>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary={topAudioFeatures.speechiness.value}/>
      </ListItem>
      <Divider />
    </List>
</Slide>


    </div>

   



  );
};

export default TopFeatures;
