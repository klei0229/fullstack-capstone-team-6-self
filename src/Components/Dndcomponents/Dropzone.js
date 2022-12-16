import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';

import { CardContext } from '../EditStyleDnd';

const Dropzone = (props) => {
  const { moveToMenu, addComponent, moveComponent, renderCard } =
    useContext(CardContext);
  const [{ isOver }, drop] = useDrop({
    accept: ['Card','Component'],
    drop: (item, monitor) => {

      if(item.componentType ==='Card' ){
        if (item.isOnMenu === false) {
          addComponent(props.layout, props.i, props.j, props.k, item);
        } else {
          moveComponent(props.layout, props.i, props.j, props.k, item);
        }
      }
      else 
      // (item.componentType === 'Divider' ){
        {
        addComponent(props.layout, props.i, props.j, props.k, item)
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
        // backgroundColor: isOver ? 'cyan' : 'white',
        // backgroundColor: isOver ? 'cyan' : 'grey',
        backgroundColor: props.showGridLines ?  '': (isOver ? 'yellow' : 'grey'),
        width: 'calc(100%-2rem)',
        height: '15px',
        opacity: [0.9, 0.8, 0.7],

        // mb:'2rem',
        // mt:'-1rem'
        // borderStyle: 'solid',
        // m:'.5rem'
        zIndex:'5'
      }}
    >
      {props.children}
    </Box>
  );
};

export default Dropzone;
