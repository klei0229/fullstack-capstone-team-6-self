import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItems, fetchMenu, updateMenuItems, updateMenu } from '../store';
import EditMenuItem from './EditMenuItem';
import { Box, Paper, Button } from '@mui/material';

const EditMenuContent = () => {
  const { menus, items } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMenu(id));
    dispatch(fetchItems());
  }, []);

  const menu = menus.find((menu) => menu.id === id);

  const update = async (e) => {
    e.preventDefault();
    await dispatch(updateMenuItems(menu, items, navigate));
    await dispatch(updateMenu(menu, items));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'space-around', flexWrap: 'wrap' }}>
      <Paper elevation={3} sx={{ width: 650 }}>
        <div>
          {menu.items
            ? menu.items.map((item) => {
                return <EditMenuItem key={item.id} item={item} />;
              })
            : 'nothing to see here...'}
        </div>
      </Paper>
      <Button
        sx={{ alignSelf: 'flex-start', ml: 5, width: 256 }}
        variant="contained"
        onClick={update}
      >
        Update Menu
      </Button>
    </Box>
  );
};

export default EditMenuContent;
