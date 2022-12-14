import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box, Typography, CardMedia } from '@mui/material';

import { useDrop } from 'react-dnd';
import DropzoneColumn from './DropzoneColumn';

import { useDrag } from 'react-dnd';

import Column from './Column';

const ImageComponent = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...props, type: 'Component' },
    type: 'Component',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <CardMedia
        sx={{ width: '200px', height: '200px' }}
        component="img"
        src="https://www.foodandwine.com/thmb/gRrfFwDl3N3uBOdWINoJKMqE8kk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201012-ss-dishes-lamb-ragu-1f516715f31244f295426cf2d50193f2.jpg"
      ></CardMedia>
    </>
  );
};

export default ImageComponent;
