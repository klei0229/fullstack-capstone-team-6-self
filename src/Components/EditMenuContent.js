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
  // const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    dispatch(fetchMenu(id));
  }, [id]);

  const menu = menus.find((menu) => menu.id === id);

  const update = async (e) => {
    console.log('content update menu: ', menu);
    console.log('content update items: ', items);
    e.preventDefault();
    await dispatch(updateMenuItems(menu, items, navigate));
    await dispatch(updateMenu(menu, items));
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(menu, null, 2)}</pre> */}
      {menu.items
        ? menu.items.map((item) => {
            return <EditMenuItem key={item.id} item={item} />;
          })
        : 'nothing to see here...'}
      {/* <Paper>
          <form onSubmit={update}>
            {menu.items
              ? menu.items.map((item) => {
                  return <EditMenuItem key={item.id} item={item} />;
                })
              : 'nothing to see here...'}
            <Button type="submit">Update</Button>
          </form>
        </Paper> */}
      <Button variant="contained" onClick={update}>
        Update Menu
      </Button>
    </div>
  );
};

export default EditMenuContent;
