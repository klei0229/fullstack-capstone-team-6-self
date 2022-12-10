import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { setCsvData, setMenuPreferences } from '../store';
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
} from '@mui/material';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EditPanel = ({ selectedTemplate, setSelectedTemplate, menu }) => {
  console.log(setSelectedTemplate);
  const dispatch = useDispatch();
  const { menuPreferences } = useSelector((state) => state);

  const [csvFile, setCSVFile] = React.useState(null);
  const [csvData, setCSVData] = React.useState({});

  const [primaryColor, setPrimaryColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const templates = [{ name: 'Template 2', value: MenuTemplate2 }];

  const onChange = (key, value) => {
    console.log('changed');
    console.log(key);
    console.log(value);

    let newMenuPreferencesObj = { ...menuPreferences };
    newMenuPreferencesObj[key] = value;
    console.log(newMenuPreferencesObj);
    dispatch(setMenuPreferences(newMenuPreferencesObj));
  };

  const saveToDB = async () => {
    console.log('save to DB');
    const prefResponse = await axios.put(`/api/menus/${menu.id}`, {
      preferences: JSON.stringify(menuPreferences),
    });
    console.log(prefResponse);
  };

  //handle color change
  const handleColorChange = (color) => {
    onChange('primaryColor', color.hex);
  };

  // useEffect(() => {
  //   console.log(primaryColor);
  // }, [menuPreprimaryColor]);

  const fonts = [
    { name: 'Arial', value: 'arial' },
    { name: 'Verdana', value: 'verdana' },
    { name: 'Tahoma', value: 'tahoma' },
    { name: 'Trebuchet MS', value: 'trebuchet ms' },
    { name: 'Courier New', value: 'courier new' },
  ];

  /* TODO: remove this component - get data from store instead. No need for csv upload on this page*/

  useEffect(() => {
    if (csvFile) {
      csvFile.addEventListener('change', (ev) => {
        const file = ev.target.files[0];
        Papa.parse(file, {
          complete: function (results) {
            convertCsvToObjectArray(results);
            //takes the obj passed from papaparse and stores it into redux store to be used in content edit + style edit components
            dispatch(setCsvData(convertCsvToObjectArray(results)));
          },
        });
      });
    }
  }, [csvFile]);

  /* TODO: remove this component - get data from store instead. No need for csv upload on this page*/

  //this function converts the raw data from CSV into a more organized object form
  const convertCsvToObjectArray = (results) => {
    results.data.shift(); //removes the table header of the csv
    results.data.pop(); //removes the last element of the the csv due to the parser creating an extra row with null values

    let arr = [];

    results.data.forEach((element) => {
      let obj = {
        name: element[0],
        description: element[1],
        price: element[2],
        category: element[3],
      };

      arr.push(obj);
    });
    return arr;
  };

  return (
    <div>
      <Stack spacing={2} sx={{ padding: '10px' }}>
        <h1>Editing Panel</h1>

        <TextField
          autoFocus
          id="resName"
          name="resName"
          label="Restaurant Name"
          type="resname"
          fullWidth
          variant="outlined"
          defaultValue=""
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
        />

        <TextField
          // id="outlined-select-currency"
          select
          fullWidth
          label="Font Family"
          name="fontFamily"
          value={menuPreferences.fontFamily}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
        >
          {fonts.map((font) => {
            return <MenuItem value={font.value}>{font.name}</MenuItem>;
          })}
        </TextField>
        {/* //FontFamily END_____________________________________________________________________*/}
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

        {/* padding */}
        <TextField
          // id="outlined-number"
          label="Padding"
          type="number"
          name="padding"
          value={menuPreferences.padding}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* margin */}
        <TextField
          // id="outlined-number"
          label="Margin"
          type="number"
          name="margin"
          value={menuPreferences.margin}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* //Restaurant Font Size START_____________________________________________________________________*/}
        <TextField
          // id="outlined-number"
          label="Restaurant Name Font Size"
          type="number"
          name="restaurantNameFontSize"
          value={menuPreferences.restaurantNameFontSize}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* //Restaurant Font Size END_____________________________________________________________________*/}

        {/* //Category Font Size START_____________________________________________________________________*/}
        <TextField
          // id="outlined-number"
          label="Category Font Size"
          type="number"
          name="categoryNameFontSize"
          value={menuPreferences.categoryNameFontSize}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* //Category Font Size END_____________________________________________________________________*/}

        {/* //Item Font Size START_____________________________________________________________________*/}
        <TextField
          // id="outlined-number"
          label="Item Font Size"
          type="number"
          name="itemNameFontSize"
          value={menuPreferences.itemNameFontSize}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* //Item Font Size END_____________________________________________________________________*/}

        {/* //Description Font Size START_____________________________________________________________________*/}
        <TextField
          // id="outlined-number"
          label="Description Font Size"
          type="number"
          name="descriptionNameFontSize"
          value={menuPreferences.descriptionNameFontSize}
          onChange={(ev) => onChange(ev.target.name, ev.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* //Description Font Size END_____________________________________________________________________*/}

        {/* TODO: remove this component - get data from store instead. No need for csv upload on this page*/}
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            ref={(x) => {
              setCSVFile(x);
            }}
          />
        </Button>
        {/* <Button variant="contained">Create Menu</Button> */}
        <TextField
          // choose template
          select
          fullWidth
          label="Template"
          name="template"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map((template) => {
            return <MenuItem value={template.name}>{template.name}</MenuItem>;
          })}
        </TextField>
        <Button variant="outlined" component="label" onClick={() => saveToDB()}>
          Save Settings
        </Button>
      </Stack>
    </div>
  );
};

export default EditPanel;
