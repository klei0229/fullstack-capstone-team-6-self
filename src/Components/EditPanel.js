import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Papa from 'papaparse';
import { setCsvData } from '../store';

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

  const [csvFile, setCSVFile] = React.useState(null);
  const [csvData, setCSVData] = React.useState(null);

  //once a csvFile is uploaded, csvData is set to this object:
  /*

csvData =
{
    "data": [
        [
            "item","description","price","category"
        ],
        [
            "Cheeseburger",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "5.00",
            "Main"
        ],
        [
            "Hotdog",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "5.00",
            "Main"
        ],
        [
            "French Fries",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "7.00",
            "Main"
        ],
        [
            "Salad",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "8.00",
            "Main"
        ],
        [
            "Spaghetti",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "9.00",
            "Main"
        ],
        [
            "Steak",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "10.00",
            "Main"
        ],
        [
            "Steak",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "10.00",
            "Main"
        ],
        [
            "Cheeseburger",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "5.00",
            "Sides"
        ],
        [
            "Hotdog",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "6.00",
            "Sides"
        ],
        [
            "French Fries",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "7.00",
            "Sides"
        ],
        [
            "Salad",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "8.00",
            "Sides"
        ],
        [
            "Spaghetti",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "9.00",
            "Sides"
        ],
        [
            "Steak",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "10.00",
            "Sides"
        ],
        [
            "Steak",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, massa quis pulvinar aliquet, purus arcu pretium nibh, sit amet varius elit libero at orci. Pellentesque vitae odio faucibus, mattis orci at, iaculis elit.",
            "10.00",
            "Sides"
        ],
        [
            ""
        ]
    ],
    "errors": [],
    "meta": {
        "delimiter": ",",
        "linebreak": "\r\n",
        "aborted": false,
        "truncated": false,
        "cursor": 3624
    }
}*/
  const onChange = () => {
    console.log('changed');
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
      <Typography>Font Family</Typography>
      <Select
        labelId="fontFamily"
        id="fontFamilySelect"
        // value={state.fontFamily}
        label="font-family"
        onChange={onChange}
        name="fontFamily"
      >
        {fonts.map((font) => {
          return <MenuItem value={font.value}>{font.name}</MenuItem>;
        })}
      </Select>
      {/* //FontFamily END_____________________________________________________________________*/}
      {/* <Typography>Restaurant Font Size</Typography> */}
      <TextField
          id="outlined-number"
          label="Restaurant Font Size"
          type="number"
          value={15}
          InputLabelProps={{
            shrink: true,
          }}
        />
              <TextField
          id="outlined-number"
          label="Restaurant Font Size"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      <Typography>Category Font Size</Typography>
      <Typography>Dish Name Font Size</Typography>
      <Typography>Dish Description Font Size</Typography>



      <Typography>Change Font Family</Typography>
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
