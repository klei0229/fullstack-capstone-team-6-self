import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { setCsvData, setMenuPreferences } from '../store';

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
} from '@mui/material';

const EditPanel = () => {
  const dispatch = useDispatch();
  const { menuPreferences } = useSelector((state) => state);

  const [csvFile, setCSVFile] = React.useState(null);
  const [csvData, setCSVData] = React.useState(null);

  const onChange = (ev) => {
    console.log('changed');
    console.log(ev.target.name);
    console.log(ev.target.value);

    let newMenuPreferencesObj = { ...menuPreferences };
    newMenuPreferencesObj[ev.target.name] = ev.target.value;
    console.log(newMenuPreferencesObj);
    dispatch(setMenuPreferences(newMenuPreferencesObj));
  };

  const fonts = [
    { name: 'Arial', value: 'arial' },
    { name: 'Verdana', value: 'verdana' },
    { name: 'Tahoma', value: 'tahoma' },
    { name: 'Trebuchet MS', value: 'trebuchet ms' },
    { name: 'Courier New', value: 'courier new' },
  ];

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
      <h1>Editing Panel</h1>

      {/* //FontFamily START_____________________________________________________________________*/}
      {/* <Typography>Font Family</Typography> */}
      <TextField
        // id="outlined-select-currency"
        select
        fullWidth
        label="Font Family"
        name="fontFamily"
        value={menuPreferences.fontFamily}
        onChange={onChange}
      >
        {fonts.map((font) => {
          return <MenuItem value={font.value}>{font.name}</MenuItem>;
        })}
      </TextField>
      {/* //FontFamily END_____________________________________________________________________*/}

      {/* //Restaurant Font Size START_____________________________________________________________________*/}
      <TextField
        // id="outlined-number"
        label="Restaurant Font Size"
        type="number"
        name="restaurantNameFontSize"
        defaultValue={menuPreferences.restaurantNameFontSize}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* //Restaurant Font Size END_____________________________________________________________________*/}

      {/* //Restaurant Font Size START_____________________________________________________________________*/}
      <TextField
        // id="outlined-number"
        label="Category Font Size"
        type="number"
        name="categoryNameFontSize"
        defaultValue={menuPreferences.categoryNameFontSize}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* //Restaurant Font Size END_____________________________________________________________________*/}

      {/* //Restaurant Font Size START_____________________________________________________________________*/}
      <TextField
        // id="outlined-number"
        label="Item Font Size"
        type="number"
        name="itemNameFontSize"
        defaultValue={menuPreferences.itemNameFontSize}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* //Restaurant Font Size END_____________________________________________________________________*/}

      {/* //Restaurant Font Size START_____________________________________________________________________*/}
      <TextField
        // id="outlined-number"
        label="Description Font Size"
        type="number"
        name="descriptionNameFontSize"
        defaultValue={menuPreferences.descriptionNameFontSize}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* //Restaurant Font Size END_____________________________________________________________________*/}
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
    </div>
  );
};

export default EditPanel;
