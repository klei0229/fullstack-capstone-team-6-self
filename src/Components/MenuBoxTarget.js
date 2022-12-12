import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

import { ItemTypes } from './utils/items';
import { useDrop } from 'react-dnd';

import {CardContext} from './EditStyleDnd';
const MenuBoxTarget = (props) => {
   
  console.log(props);
  const {moveToMenu} = useContext(CardContext);
  const [{isOver}, drop] = useDrop({
    accept: 'Card',
    drop: (item, monitor) => {moveToMenu(item.id)},
    collect: (monitor) =>({
        isOver : !! monitor.isOver(),
    })
  })

  return (
      <Box ref={drop} 
        sx={{
            // display:'flex',
          backgroundColor: isOver ? 'green' : 'white',
          width: '100%',
          height: '360px',
          borderStyle:'solid'
        }}
      >
        {props.children}


      </Box>
  );
};

export default MenuBoxTarget;
