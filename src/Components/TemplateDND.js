import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

// import Draggable from 'react-draggable';
import MediaCard from './Dndcard';
import BoxTarget from './BoxTarget';

const TemplateDND = () => {
  const { menu } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(menus);
  const params = useParams().id;

  console.log(params);
  console.log(menu);

  const moveToBox = () => {};

  const array = [
    {
      name: 'Card1',
      isInBox: false,
    },
    {
      name: 'Card2',
      isInBox: false,
    },
  ];

  useEffect(() => {
    dispatch(fetchMenu(params));
    console.log(menu);
  }, [params]);

  return (
    <div>
      DND test
      {menu.name}
      {array.filter((item)=>{return item.isInBox === false})
            .map((item)=>{return (<MediaCard name={item.name} isInBox={false}></MediaCard>)})
      }
      
      <Container maxWidth="lg" sx={{ backgroundColor: 'grey' }}>
        <BoxTarget></BoxTarget>
      </Container>
    </div>
  );
};

export default TemplateDND;
