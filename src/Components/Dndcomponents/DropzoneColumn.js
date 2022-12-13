import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';
import { CardContext } from '../EditStyleDnd';
// import { CardContext } from './EditStyleDnd';

const DropzoneColumn = (props) => {
  console.log(props);
  //   const { moveToMenu } = useContext(CardContext);
  const { moveToMenu, addColumn, moveColumn } = useContext(CardContext);

  const [{ isOver }, drop] = useDrop({
    accept: ['Card', 'Column'],
    drop: (item, monitor) => {
      console.log(item);
      if (item.type === 'Card') {
        addColumn(props.layout, props.i, props.j, props.k,item);
      } else if (item.type === 'Column') {
        console.log('here');
        console.log(item);
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
        backgroundColor: isOver ? 'green' : 'white',
        width: '35px',
        height: 'fitContent',
        borderStyle: 'dotted',
      }}
    >
      {props.children}
    </Box>
  );
};

export default DropzoneColumn;
