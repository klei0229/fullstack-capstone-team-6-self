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
    // console.log(props);
  const [{ isDragging }, drag] = useDrag({
    item: { ...props, type: 'Card' },
    type: 'Card',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <Card
      raised
      ref={drag}
      sx={{
        width: '100%',
        // maxWidth:'400px',
        // m: '.5rem',
        // maxWidth: '500px',
        // height:'50px',
        '&:hover': {
          backgroundColor: 'light-grey',
          opacity: [0.9, 0.8, 0.7],
        },
        zIndex:'1',
        // mt:'-15px',
        // mb:'-15px'
      }}
    >
      <CardMedia
        component="img"
        height="140"
        
        object-fit='contain'
        src="https://www.foodandwine.com/thmb/gRrfFwDl3N3uBOdWINoJKMqE8kk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201012-ss-dishes-lamb-ragu-1f516715f31244f295426cf2d50193f2.jpg"
      />
      <CardContent sx={{height: '50px'}}>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}

        </Typography>
      </CardContent>
      <CardActions sx={{backgroundColor:'aliceblue' ,display:'flex', justifyContent:'left'}}>
        <Button size="small">Price: ${props.price}</Button>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
