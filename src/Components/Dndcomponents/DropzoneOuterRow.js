import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';

import { CardContext } from '../EditStyleDnd';

const DropzoneOuterRow = (props) => {
  // console.log(props);
  // console.log(props.layout);
  // console.log(props.i);
  const { moveToMenu, addComponent, addRow, moveRow } = useContext(CardContext);
  const [{ isOver }, drop] = useDrop({
    accept: ['Card', 'Row', 'Component'],
    drop: (item, monitor) => {
      // moveToMenu(item.id);
      if(item.type === 'Card'){
          addRow(props.layout,props.i,props.j,props.k,item)
      }
      else if (item.type === 'Row'){
        moveRow(props.layout,props.i,props.j,props.k,item);
      }
      else 
      // (item.componentType === 'Divider' ){
        {
        addRow(props.layout, props.i, props.j, props.k, item)
      }
      // console.log(item.id)
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
        backgroundColor: props.showGridLines ?  'white': (isOver ? 'cyan' : 'grey'),
        // backgroundColor: isOver ? 'cyan' : 'grey',
        width: 'calc(100%)',
        height: '15px',
        // mt:'-10px',
        // mb:'-10px'
        // m:'.5rem'
        // borderStyle: 'solid',
      }}
    >
      {props.children}
    </Box>
  );
};

export default DropzoneOuterRow;
