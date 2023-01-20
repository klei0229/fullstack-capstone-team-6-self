import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import EditPanel from './EditPanel';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import { Container, Button, Grid, Typography, Paper } from '@mui/material';
import { setCsvData, setMenuPreferences } from '../store';
import { fetchMenus, fetchItems } from '../store';

import MenuTemplate3 from './Template-3-Subcomponents/MenuTemplate3';
import DNDTemplate from './Dndcomponents/DNDTemplate'


const EditStyle = () => {
  const { id } = useParams();
  const { menus } = useSelector((state) => state);
  console.log(menus);
  const menu = menus.find((menu) => menu.id === id);
  console.log(menu);

  console.log(menu);
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

  useEffect(()=>{
  },[menus])


  const renderTemplate = (id, menuOptions) => {
    console.log(menuPreferences);
    console.log(menuOptions)
    if (menu.template === 'template2') {
      // console.log('true');
      return <MenuTemplate2 id={id} menuOptions={menuPreferences}></MenuTemplate2>;
    }
    else if (menu.template === 'template3') {
      return <MenuTemplate3 id={id} menuOptions={menuPreferences}></MenuTemplate3>;
    }
    else{
      // console.log(menu.template);
      
      // if(template.length !== 0){
        console.log(menu);
        const prefs = JSON.parse(menu.preferences);
        const templates = prefs.templates;
        const template = templates.filter((template)=>{return template.name === menu.template})
        const layout = template[0].layout
        console.log(layout);
        return <DNDTemplate layout={layout}> </DNDTemplate>
      // }
      // console.log(template);

      // return 

      //return dnd 
    }
    
  };
  return (
    <div>
      
            {/* <MenuTemplate2 id={id} menuOptions={menuPreferences}></MenuTemplate2> */}
            {renderTemplate(id, JSON.parse(menu.preferences))}
    </div>
  );
};

export default EditStyle;
