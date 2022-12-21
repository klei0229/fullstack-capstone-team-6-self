import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import EditPanel from './EditPanel';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import MenuTemplate3 from './Template-3-Subcomponents/MenuTemplate3';
import DNDTemplate from './Dndcomponents/DNDTemplate'
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

  const [templates, setTemplates] = useState([]);

  // console.log(menuOptions);

  useEffect(() => {
    console.log(menuOptions);

    console.log(menu);
  }, [menuOptions]);

  useEffect(() => {

    console.log(menus);
    const prefs = JSON.parse(menu.preferences)
    console.log(prefs);
    console.log(prefs.templates);

    setTemplates(prefs.templates)
  }, [menus]);

  //initialize menu options using menu object from DB
  useEffect(() => {


    console.log(menu);
    const newMenuOptionsObj = {
      menuName: menu.name,
      menuDescription: menu.description,
      template: menu.template,
    };
    setMenuOptions(newMenuOptionsObj);
    setTemplates(JSON.parse(menu.preferences).templates);

  }, [menu]);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchItems());
  }, []);

  useEffect(()=>{
    console.log(templates);
  },[templates])

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  // const templates = [{ name: 'Template 2', value: MenuTemplate2 }];

  useEffect(() => {
    dispatch(setMenuPreferences(JSON.parse(menu.preferences)));
    // console.log('set menu preferences', JSON.parse(menu.preferences));
  }, [menu]);

  const { menuPreferences } = useSelector((state) => state);

  const renderTemplate = (menuOptions) => {

    // console.log(menuOptions)
    if (menuOptions.template === 'template2') {
      // console.log('true');
      return <MenuTemplate2 id={id} menuOptions={menuOptions}></MenuTemplate2>;
    }
    else if (menuOptions.template === 'template3') {
      return <MenuTemplate3 id={id} menuOptions={menuOptions}></MenuTemplate3>;
    }
    else{
      console.log(menuOptions.template);

      const template = templates.filter((template)=>{return template.name === menuOptions.template})

      if(template.length !== 0){
        
        const layout = template[0].layout
        console.log(layout);
        return <DNDTemplate layout={layout}> </DNDTemplate>
      }
      // console.log(template);

      // return 

      //return dnd 
    }
    
  };

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
            {renderTemplate(menuOptions)}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EditStyle;
