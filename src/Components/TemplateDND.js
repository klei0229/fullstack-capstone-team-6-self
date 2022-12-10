import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container } from '@mui/material';
const TemplateDND = () => {
  const { menu } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(menus);
  const params = useParams().id;

  console.log(params);
  console.log(menu);
  
  useEffect(()=>{
    dispatch(fetchMenu(params));
    console.log(menu);
  },[params])

  return (
    <div>
        DND test
        {menu.name}
        <Container maxWidth="xl" sx={{backgroundColor:'green'}}>
            
        </Container>
    </div>
  );
};

export default TemplateDND;
