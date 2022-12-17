import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';

export default function Item({ props, margin, padding }) {
  const { menuPreferences } = useSelector((state) => state);

  return (
    <Container>
      <Typography
        variant="h6"
        sx={{ fontSize: menuPreferences.itemNameFontSize, fontWeight: 'bold' }}
      >
        {props.name} ${props.price}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: menuPreferences.descriptionNameFontSize }}
      >
        {props.description}
      </Typography>
    </Container>

    // <Card
    //   sx={{ width: '100%', margin: `${margin}px`, padding: `${padding}px` }}
    // >
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="150px"
    //       src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
    //       // image="/static/images/cards/contemplative-reptile.jpg"
    //       alt="dish"
    //       // objectFit="cover"
    //       sx={{ objectFit: 'cover' }}
    //     />
    //     <CardContent>
    //       <Typography
    //         gutterBottom
    //         variant="h6"
    //         component="div"
    //         sx={{ fontSize: menuPreferences.itemNameFontSize }}
    //       >
    //         {props.name}
    //       </Typography>
    //       <Typography
    //         variant="body2"
    //         color="text.secondary"
    //         sx={{ fontSize: menuPreferences.descriptionNameFontSize }}
    //       >
    //         {props.description}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions
    //     display="flex"
    //     sx={{
    //       backgroundColor: 'aliceblue',
    //       justifyContent: 'space-around',
    //     }}
    //   >
    //     {/* <Button size="small">Share</Button> */}
    //     {/* <Button size="small" onClick={handleClickOpen}>
    //       Learn More
    //     </Button> */}
    //     <Typography variant="body2" color="text.secondary">
    //       PRICE: ${props.price}
    //     </Typography>
    //     <Button size="small">Add To Order</Button>
    //   </CardActions>
    // </Card>
  );
}
