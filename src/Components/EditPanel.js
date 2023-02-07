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
  console.log('menu options', menuOptions);

  const dispatch = useDispatch();

  //these are from store
  const { menuPreferences } = useSelector((state) => state);
  const { menus } = useSelector((state) => state);
  const menu = menus.find((menu) => menu.id === menuId);

  const [templates, setTemplates] = useState([
    {
      name: 'template2',
      type: 'default',
    },
    {
      name: 'template3',
      type: 'default',
    },
  ]);

  const defaultTemplates = [
    {
      name: 'template2',
      type: 'default',
    },
    {
      name: 'template3',
      type: 'default',
    },
  ];

  useEffect(() => {
    console.log(templates);
  }, []);

  useEffect(() => {
    console.log('menu changed', menu);
    // console.log(JSON.parse(menu.preferences));
    const customTemplates = JSON.parse(menu.preferences).templates;
    console.log('customTemplates', customTemplates);

    //on menu change, add the customtemplates onto templates to be rendered in select
    if (JSON.parse(menu.preferences).hasOwnProperty('templates')) {
      // setCustomTemplateList(menuPreferences.templates);
      setTemplates([...defaultTemplates, ...customTemplates]);
    }
  }, [menu]);

  //state variables
  // const [primaryColor, setPrimaryColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [customTemplateList, setCustomTemplateList] = useState([]);

  //options - hard coded
  const fonts = [
    { name: 'Arial', value: 'arial' },
    { name: 'Verdana', value: 'verdana' },
    { name: 'Tahoma', value: 'tahoma' },
    { name: 'Trebuchet MS', value: 'trebuchet ms' },
    { name: 'Courier New', value: 'courier new' },
  ];

  // const templates = ['template2', 'template3'];
  // console.log(templates);

  //handles all changes to menu preferences
  const onPrefChange = (key, value) => {
    // console.log('pref changed');
    // console.log(key);
    // console.log(value);

    let newMenuPreferencesObj = { ...menuPreferences };
    newMenuPreferencesObj[key] = value;
    // console.log(newMenuPreferencesObj);
    dispatch(setMenuPreferences(newMenuPreferencesObj));
  };

  //handles changes to other menu properties: name, description, template
  const onChange = (key, value) => {
    // console.log('on change');
    // console.log(key);
    // console.log(value);
    let newMenuOptionsObj = { ...menuOptions };
    newMenuOptionsObj[key] = value;
    setMenuOptions(newMenuOptionsObj);
  };

  const onTemplateChange = (ev) => {
    console.log(ev.target.name);
    console.log(ev.target.value);

    console.log(templates);

    let menuObj = { ...menuOptions };
    console.log(menuObj);

    menuObj[ev.target.name] = ev.target.value;
    setMenuOptions(menuObj);
  };

  //console logs everytime menu options changes
  useEffect(() => {
    console.log(menuOptions);
  }, [menuOptions]);

  //saves changes to DB
  const saveToDB = async () => {
    // console.log('save to DB');
    const response = await axios.put(`/api/menus/${menu.id}`, {
      name: menuOptions.menuName,
      description: menuOptions.menuDescription,
      template: menuOptions.template,
      preferences: JSON.stringify(menuPreferences),
    });
    // console.log(response);
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
        <Typography variant="h3">Editing Panel</Typography>

        {/*  Choose Template  */}
        <TextField
          select
          fullWidth
          label="Template"
          name="template"
          // defaultValue={'template2'}
          value={menuOptions.template}
          onChange={onTemplateChange}
        >
          {templates.map((template) => {
            return <MenuItem value={template.name}>{template.name}</MenuItem>;
          })}
        </TextField>
        {/*  Saves Settings  */}

        <Button variant="outlined" component="label" onClick={() => saveToDB()}>
          Save Settings
        </Button>
        <Button variant="outlined" href={`#/menu/editStyleFull/${menu.id}`}>
          Create Template (Drag and Drop)
        </Button>

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
      </Stack>
    </div>
  );
};

export default EditPanel;
