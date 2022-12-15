import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuPreferences } from '../store';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import axios from 'axios';
import { ChromePicker } from 'react-color';

import {
  Container,
  Button,
  Grid,
  Slider,
  Typography,
  Select,
  MenuItem,
  Input,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Textarea,
} from '@mui/material';

const EditPanel = ({ menuId, menuOptions, setMenuOptions }) => {
  const dispatch = useDispatch();

  //these are from store
  const { menuPreferences } = useSelector((state) => state);
  const { menus } = useSelector((state) => state);
  const menu = menus.find((menu) => menu.id === menuId);

  useEffect(() => {
    console.log('menu changed', menu);
  }, [menu]);

  //state variables
  // const [primaryColor, setPrimaryColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  //options - hard coded
  const fonts = [
    { name: 'Arial', value: 'arial' },
    { name: 'Verdana', value: 'verdana' },
    { name: 'Tahoma', value: 'tahoma' },
    { name: 'Trebuchet MS', value: 'trebuchet ms' },
    { name: 'Courier New', value: 'courier new' },
  ];

  const templates = ['template2', 'template3'];

  //handles all changes to menu preferences
  const onPrefChange = (key, value) => {
    console.log('pref changed');
    console.log(key);
    console.log(value);

    let newMenuPreferencesObj = { ...menuPreferences };
    newMenuPreferencesObj[key] = value;
    console.log(newMenuPreferencesObj);
    dispatch(setMenuPreferences(newMenuPreferencesObj));
  };

  //handles changes to other menu properties: name, description, template
  const onChange = (key, value) => {
    console.log('on change');
    console.log(key);
    console.log(value);
    let newMenuOptionsObj = { ...menuOptions };
    newMenuOptionsObj[key] = value;
    setMenuOptions(newMenuOptionsObj);
  };

  //console logs everytime menu options changes
  useEffect(() => {
    console.log(menuOptions);
  }, [menuOptions]);

  //saves changes to DB
  const saveToDB = async () => {
    console.log('save to DB');
    const response = await axios.put(`/api/menus/${menu.id}`, {
      name: menuOptions.menuName,
      description: menuOptions.menuDescription,
      template: menuOptions.template,
      preferences: JSON.stringify(menuPreferences),
    });
    console.log(response);
  };

  //handles change in color picker
  const handleColorChange = (color) => {
    onChange('primaryColor', color.hex);
  };

  // useEffect(() => {
  //   console.log(primaryColor);
  // }, [menuPreprimaryColor]);

  return (
    <div>
      <Stack spacing={2} sx={{ padding: '10px' }}>
        <h1>Editing Panel</h1>

        {/*  Choose Template  */}
        <TextField
          // choose template
          select
          fullWidth
          label="Template"
          name="template"
          value={menuOptions.template}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
        >
          {templates.map((template) => {
            return <MenuItem value={template}>{template}</MenuItem>;
          })}
        </TextField>

        {/*  Menu Name */}
        <TextField
          id="menuName"
          name="menuName"
          label="Menu Name"
          fullWidth
          variant="outlined"
          value={menuOptions.menuName}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
        />

        {/*  Menu Description */}
        <TextField
          id="menuDescription"
          name="menuDescription"
          label="Menu Description"
          multiline
          minRows="3"
          fullWidth
          variant="outlined"
          value={menuOptions.menuDescription}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
        />
        {/*  Font Family */}
        <TextField
          // id="outlined-select-currency"
          select
          fullWidth
          label="Font Family"
          name="fontFamily"
          value={menuPreferences.fontFamily}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
        >
          {fonts.map((font) => {
            return <MenuItem value={font.value}>{font.name}</MenuItem>;
          })}
        </TextField>

        {/*  Primary Color */}

        <Button
          variant="contained"
          sx={{ backgroundColor: menuPreferences.primaryColor }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          Primary Color
        </Button>
        {showColorPicker && (
          <ChromePicker
            color={menuPreferences.primaryColor}
            onChangeComplete={handleColorChange}
          />
        )}

        {/* Padding */}
        <TextField
          // id="outlined-number"
          label="Padding"
          type="number"
          name="padding"
          value={menuPreferences.padding}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Margin */}
        <TextField
          // id="outlined-number"
          label="Margin"
          type="number"
          name="margin"
          value={menuPreferences.margin}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Name Font Size */}
        <TextField
          // id="outlined-number"
          label="Restaurant Name Font Size"
          type="number"
          name="restaurantNameFontSize"
          value={menuPreferences.restaurantNameFontSize}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Category Font Size */}
        <TextField
          // id="outlined-number"
          label="Category Font Size"
          type="number"
          name="categoryNameFontSize"
          value={menuPreferences.categoryNameFontSize}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* //Item Font Size */}
        <TextField
          // id="outlined-number"
          label="Item Font Size"
          type="number"
          name="itemNameFontSize"
          value={menuPreferences.itemNameFontSize}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Description Font Size */}
        <TextField
          // id="outlined-number"
          label="Description Font Size"
          type="number"
          name="descriptionNameFontSize"
          value={menuPreferences.descriptionNameFontSize}
          onChange={(ev) => onPrefChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/*  Saves Settings  */}

        <Button variant="outlined" component="label" onClick={() => saveToDB()}>
          Save Settings
        </Button>
      </Stack>
    </div>
  );
};

export default EditPanel;
