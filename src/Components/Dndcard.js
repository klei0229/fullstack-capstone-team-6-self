import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ItemTypes } from './utils/items';

import { useDrag } from 'react-dnd';

export default function MediaCard(props) {

  console.log(props);
  const [{ isDragging }, drag] = useDrag({
    item: {
    },
    type: 'Card',
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
    })
  });
  return (
    <Card ref={drag} sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        height="140"
        // image="/static/images/cards/contemplative-reptile.jpg"
        // alt="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
