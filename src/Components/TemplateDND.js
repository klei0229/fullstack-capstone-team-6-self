import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container } from '@mui/material';

// import Draggable from 'react-draggable';

const TemplateDND = () => {
  const { menu } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(menus);
  const params = useParams().id;

  console.log(params);
  console.log(menu);

  useEffect(() => {
    dispatch(fetchMenu(params));
    console.log(menu);
  }, [params]);

  return (
    <div>
      DND test
      {menu.name}
      <Draggable grid={[25, 25]}>
      <div>
        
      </div>
      </Draggable>
    </div>
  );
};

export default TemplateDND;
