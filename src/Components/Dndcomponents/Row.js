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

const Row = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {...props, type:'Row'},
    type: 'Row',
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
        borderColor: 'orange',
        width: '100%',
        height: 'fitContent',
        '&:hover': {
            backgroundColor: 'green',
            opacity: [0.9, 0.8, 0.7],
          }
        
      }}
    >
      {/* <h1>Row</h1> */}
      {props.children}
      {/* <DropzoneColumn></DropzoneColumn>
      <Column></Column>
      <DropzoneColumn></DropzoneColumn> */}
    </Box>
  );
};

export default Row;
