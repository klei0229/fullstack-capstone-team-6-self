import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

// import { ItemTypes } from './utils/items';
import { useDrop } from 'react-dnd';
import DropzoneColumn from './DropzoneColumn';

// import { CardContext } from './EditStyleDnd';

import { useDrag } from 'react-dnd';

import Column from './Column';

const Component = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {...props},
    type: 'Card',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        display: 'flex',
        flexDirection: 'Column',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: 'yellow',
        width: '100%',
        height: '200px',
      }}
    >
      {props.children}
    </Box>
  );
};

export default Component;
