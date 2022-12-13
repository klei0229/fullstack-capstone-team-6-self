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
    accept: ['Card'],
    drop: (item, monitor) => {
      if (item.isOnMenu === false) {
        addComponent(props.layout, props.i, props.j, props.k, item);
      } else {
        moveComponent(props.layout, props.i, props.j, props.k, item);
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
        backgroundColor: isOver ? 'green' : 'white',
        width: 'calc(100%)',
        height: '35px',
        borderStyle: 'solid',
      }}
    >
      {props.children}
    </Box>
  );
};

export default Dropzone;
