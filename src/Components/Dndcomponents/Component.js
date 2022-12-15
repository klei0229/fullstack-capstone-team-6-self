import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box, Typography } from '@mui/material';

import { useDrop } from 'react-dnd';
import DropzoneColumn from './DropzoneColumn';

import { useDrag } from 'react-dnd';

import Column from './Column';

import RemoveIcon from '@mui/icons-material/Remove';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

const Component = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...props, type: 'Component' },
    type: 'Component',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });


  const renderIcon = (type,size) =>{
    
    if(type === 'Divider'){
      return (<RemoveIcon sx={{ fontSize: size }}></RemoveIcon>)
    }
    else if(type ==='Image'){
      return (<ImageIcon sx={{ fontSize: size }}></ImageIcon>)
    }
    else if(type ==='Typography'){
      return (<FormatColorTextIcon sx={{ fontSize: size }}></FormatColorTextIcon>)
    }
  }
  return (
    <Box
      ref={drag}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#686868',
        width: '75%',
        height: 'fitContent',
        borderWidth: '1px',
        ml: '.3rem',
        mr: '.3rem',
        borderRadius: '5px',
      }}
    >
      <br></br>
      {
        renderIcon(props.componentType)
      }
      <Typography variant="p">{props.componentType}</Typography>
      <br></br>
    </Box>
  );
};

export default Component;
