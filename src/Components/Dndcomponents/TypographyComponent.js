import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { fetchMenu } from '../store';
import { Container, Box, Typography } from '@mui/material';

import { useDrop } from 'react-dnd';
import DropzoneColumn from './DropzoneColumn';

import { useDrag } from 'react-dnd';

import Column from './Column';
import RenderedComponent from './RenderedComponent';

const TypographyComponent = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...props, type: 'Component' },
    type: 'Component',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  //for typography
  const [typographySettings, setTypographySettings] = useState({
    text: 'Text',
    variant: 'h1',
  });

  const onChange = (ev) => {

    let name = ev.target.name;
    let value = ev.target.value;
    let tempTypographySetting = { ...typographySettings };
    tempTypographySetting[name] = value;

    setTypographySettings(tempTypographySetting);
  };

  return (
    // <Component>
    <RenderedComponent onChange = {onChange} variant={typographySettings.variant} componentType={'Typography'}>
      {/* {props.children} */}
      <Typography variant={typographySettings.variant}>
        {/* {props.children} */}
        {typographySettings.text}
      </Typography>
    </RenderedComponent>
  );
};

export default TypographyComponent;
