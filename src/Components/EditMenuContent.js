import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItems, fetchMenu, updateMenuItems, updateMenu } from '../store';
import EditMenuItem from './EditMenuItem';
import { Paper, TextField, Button, Typography } from '@mui/material';

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
    <Paper>
      <div>
        {menu.items
          ? menu.items.map((item) => {
              return <EditMenuItem key={item.id} item={item} />;
            })
          : 'nothing to see here...'}
        <Button variant="contained" onClick={update}>
          Update Menu
        </Button>
      </div>
    </Paper>
  );
};

export default EditMenuContent;
