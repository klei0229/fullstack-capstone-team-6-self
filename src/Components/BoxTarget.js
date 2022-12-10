import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

import { ItemTypes } from './utils/items';
import { useDrop } from 'react-dnd';

import {CardContext} from './TemplateDND';
const BoxTarget = (props) => {
   
  console.log(props);
  const {moveToBox} = useContext(CardContext);
  const [{isOver}, drop] = useDrop({
    accept: 'Card',
    drop: (item, monitor) => {moveToBox(item.name)},
    collect: (monitor) =>({
        isOver : !! monitor.isOver(),
    })
  })

  return (
    <div>
      <Box ref={drop}
        sx={{
          backgroundColor: isOver ? 'green' : 'blue',
          width: '500px',
          height: '500px',
        }}
      >
        {props.children}


      </Box>
    </div>
  );
};

export default BoxTarget;
