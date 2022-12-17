import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import EditPanel from './EditPanel';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import MenuTemplate3 from './Template-3-Subcomponents/MenuTemplate3';
import { Container, Button, Grid, Typography, Paper } from '@mui/material';
import { setCsvData, setMenuPreferences } from '../store';
import { fetchMenus, fetchItems } from '../store';

const EditStyle = () => {
  const { id } = useParams();
  const { menus } = useSelector((state) => state);
  const menu = menus.find((menu) => menu.id === id);
  const template = menu.template;

  //states for styling edits
  const [menuOptions, setMenuOptions] = useState({
    menuName: '',
    menuDescription: '',
    template: '',
  });

  //initialize menu options using menu object from DB
  useEffect(() => {
    const newMenuOptionsObj = {
      menuName: menu.name,
      menuDescription: menu.description,
      template: menu.template,
    };
    setMenuOptions(newMenuOptionsObj);
  }, [menu]);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchItems());
  }, []);

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  // const templates = [{ name: 'Template 2', value: MenuTemplate2 }];

  useEffect(() => {
    dispatch(setMenuPreferences(JSON.parse(menu.preferences)));
    console.log('set menu preferences', JSON.parse(menu.preferences));
  }, [menu]);

  const { menuPreferences } = useSelector((state) => state);

  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Paper
              elevation="10"
              sx={{
                pt: 2,
                pb: 2,
              }}
            >
              <EditPanel
                menuId={menu.id}
                menuOptions={menuOptions}
                setMenuOptions={setMenuOptions}
              ></EditPanel>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            {menuOptions.template === 'template2' && (
              <MenuTemplate2 id={id} menuOptions={menuOptions}></MenuTemplate2>
            )}
            {menuOptions.template === 'template3' && (
              <MenuTemplate3 id={id} menuOptions={menuOptions}></MenuTemplate3>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EditStyle;
