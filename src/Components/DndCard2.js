import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ItemTypes } from './utils/items';

import { useDrag } from 'react-dnd';

export default function Dndcard2(props) {


  console.log(props);
  const [{ isDragging }, drag] = useDrag({
    item: {...props,type:'Card'},
    type: 'Card',
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
    })
  });
  return (
    <Card ref={drag} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src="https://www.foodandwine.com/thmb/gRrfFwDl3N3uBOdWINoJKMqE8kk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201012-ss-dishes-lamb-ragu-1f516715f31244f295426cf2d50193f2.jpg"
        // image="/static/images/cards/contemplative-reptile.jpg"
        // alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}