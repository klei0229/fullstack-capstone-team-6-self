import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

import { ItemTypes } from './utils/items';
import { useDrop } from 'react-dnd';
const BoxTarget = () => {
    
  const [{isOver}, drop] = useDrop({
    accept: 'Card',
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
        here
      </Box>
    </div>
  );
};

export default BoxTarget;
