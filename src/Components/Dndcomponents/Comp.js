import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';
import DropzoneColumn from './DropzoneColumn';


import { useDrag } from 'react-dnd';

import Column from './Column';

const Comp = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {...props, type:'Component'},
    type: 'Component',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: 'black',
        width: '100%',
        height: 'fitContent',
        
      }}
    >
      {props.componentType}
    </Box>
  );
};

export default Comp;
