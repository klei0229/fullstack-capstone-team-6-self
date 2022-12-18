import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';
import Dropzone from './Dropzone';


import { useDrag } from 'react-dnd';
const Column = (props) => {
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
        // backgroundColor:'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // borderStyle: 'solid',
        // borderColor: 'red',
        width: '100%',
        height: 'fitContent',
        '&:hover': {
          // backgroundColor: 'red',
          // opacity: [0.9, 0.8, 0.7],
        },
        // mt:"-13px",
        // mb:'-13px',
        zIndex:'1'
      }}
    >
      {props.children}

    </Box>
  );
};

export default Column;
