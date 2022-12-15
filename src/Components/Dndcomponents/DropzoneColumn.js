import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';
import { CardContext } from '../EditStyleDnd';
// import { CardContext } from './EditStyleDnd';

const DropzoneColumn = (props) => {
  //   const { moveToMenu } = useContext(CardContext);
  const { moveToMenu, addColumn, moveColumn } = useContext(CardContext);

  const [{ isOver }, drop] = useDrop({
    accept: ['Card', 'Column', 'Component'],
    drop: (item, monitor) => {
      if (item.type === 'Card' || item.type === 'Component' ) {
        addColumn(props.layout, props.i, props.j, props.k,item);
      } else if (item.type === 'Column') {
        moveColumn(props.layout, props.i, props.j, props.k, item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={drop}
      sx={{
        // display:'flex',
        // backgroundColor: isOver ? 'cyan' : 'white',
        // backgroundColor: isOver ? 'cyan' : 'grey',
        backgroundColor: props.showGridLines ?  'white': (isOver ? 'cyan' : 'grey'),
        width: '15px',
        height: 'fitContent',
        // m:'.5rem'
        // borderStyle: 'dotted',
        // opacity: [0.9, 0.8, 0.7],
      }}
    >
      {props.children}
    </Box>
  );
};

export default DropzoneColumn;
