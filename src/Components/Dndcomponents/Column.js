import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

// import { ItemTypes } from './utils/items';
import { useDrop } from 'react-dnd';
import Dropzone from './Dropzone';

// import { CardContext } from './EditStyleDnd';

import { useDrag } from 'react-dnd';
const Column = (props) => {
  console.log(props);
  const [{ isDragging }, drag] = useDrag({
    item: {...props,type:'Column'},
    type: 'Column',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        // m: '2rem',
        // p:'2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: 'green',
        width: '100%',
        height: '100%',
      }}
    >
      {props.children}
      {/* Column */}
      {/* //box content */}
      {/* <Dropzone></Dropzone>
      <Box
        sx={{
          borderStyle: 'dashed',
          width: 'calc(100%-4rem)',
          height: '100px',
        }}
      >
        Component
      </Box> */}
      {/* <Dropzone></Dropzone> */}
    </Box>
  );
};

export default Column;
