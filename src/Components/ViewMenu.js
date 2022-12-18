import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import EditPanel from './EditPanel';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import { Container, Button, Grid, Typography, Paper } from '@mui/material';
import { setCsvData, setMenuPreferences } from '../store';
import { fetchMenus, fetchItems } from '../store';

const EditStyle = () => {
  const { id } = useParams();
  const { menus } = useSelector((state) => state);
  const menu = menus.find((menu) => menu.id === id);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchItems());
  }, []);

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  const [selectedTemplate, setSelectedTemplate] = React.useState('');
  const templates = [{ name: 'Template 2', value: MenuTemplate2 }];

  useEffect(() => {
    dispatch(setMenuPreferences(JSON.parse(menu.preferences)));
    // console.log('set menu preferences', JSON.parse(menu.preferences));
  }, [menu]);

  const { menuPreferences } = useSelector((state) => state);

  return (
    <div>
      
            <MenuTemplate2 id={id} menuOptions={menuPreferences}></MenuTemplate2>
         
    </div>
  );
};

export default EditStyle;
