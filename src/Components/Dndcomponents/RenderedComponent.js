import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box, Typography, Popover, TextField, MenuItem } from '@mui/material';

import { useDrop } from 'react-dnd';
import DropzoneColumn from './DropzoneColumn';

import { useDrag } from 'react-dnd';

import Column from './Column';

const RenderedComponent = (props) => {
    console.log(props);
  const [{ isDragging }, drag] = useDrag({
    item: { ...props, type: 'Component' },
    type: 'Component',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box
        ref={drag}
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        //   borderStyle: 'solid',
        //   borderColor: 'black',
          width: '100%',
          height: 'fitContent',
        }}
      >
        {props.children}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Edit Typography</Typography>
        <TextField
          // id="outlined-select-currency"
          select
          fullWidth
          label="Font Size"
          name="variant"
          value={props.variant}
          onChange={props.onChange}
        >
          <MenuItem value={'h1'}>H1</MenuItem>;
          <MenuItem value={'h2'}>H2</MenuItem>;
          <MenuItem value={'h3'}>H3</MenuItem>;
          <MenuItem value={'h4'}>H4</MenuItem>;
          <MenuItem value={'h5'}>H5</MenuItem>;
          <MenuItem value={'h6'}>H6</MenuItem>;
          <MenuItem value={'p'}>p</MenuItem>;
        </TextField>

        <TextField
          // id="outlined-select-currency"
          fullWidth
          label="Text"
          name="text"
          value={props.text}
          onChange={props.onChange}
        ></TextField>

      </Popover>
    </>
  );
};

export default RenderedComponent;
