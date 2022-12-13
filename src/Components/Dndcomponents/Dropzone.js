import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import { useDrop } from 'react-dnd';

import { CardContext } from '../EditStyleDnd';

const Dropzone = (props) => {
  // console.log(props);
  // console.log(props.layout);
  // console.log(props.i);
  const { moveToMenu, addComponent, moveComponent, renderCard } =
    useContext(CardContext);
  const [{ isOver }, drop] = useDrop({
    accept: ['Card'],
    drop: (item, monitor) => {
      console.log('drop');
      // moveToMenu(item.id);

      if (item.isOnMenu === false) {
        addComponent(props.layout, props.i, props.j, props.k, item);
      } else {
        console.log('try to move');
        moveComponent(props.layout, props.i, props.j, props.k, item);

      }
      console.log(item);

      // renderCard(item);

      // if(!item.hasOwnProperty('isOnMenu')){
      //   console.log('not on menu');
      //   item.isOnMenu = true;
      //   console.log(item.isOnMenu)
      //   console.log(item);
      //   addComponent(props.layout,props.i,props.j,props.k,item)
      // }

      // else if (item.isOnMenu === true){
      //   console.log('is on menu already');
      //   moveComponent(props.layout,props.i,props.j,props.k,item);
      // }
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
