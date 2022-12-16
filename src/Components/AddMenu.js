import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCsvData, createMenu, fetchMenus } from '../store';

const AddMenu = (props) => {
  const { auth, csvData } = useSelector((state) => state);
  const defaultPreferences = {
    padding: '0',
    margin: '0',
    primaryColor: '#000000',
    restaurantNameFontSize: 65,
    categoryNameFontSize: 30,
    itemNameFontSize: 20,
    descriptionNameFontSize: 20,
    fontFamily: 'verdana',
  };
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({
    name: '',
    description: '',
    restaurantId: props.restaurant.id,
    preferences: JSON.stringify(defaultPreferences),
  });

  // const [menu, setMenu] = useState({
  //   name: '',
  //   description: '',
  //   MenuId: Menu.id,
  // });

  const [csvName, setCsvName] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // dispatch(createMenu(menu));
    // await dispatch(createMenu(menu));
    setOpen(false);
  };

  const onChange = (e) => {
    setMenu({
      ...menu,
      [e.target.id]: e.target.value,
    });
  };

  const submitMenu = () => {

    // console.log(items);
    dispatch(createMenu(menu, items));
    // dispatch(fetchMenus());
    setOpen(false);
  };

  // const onChangeMenu = (e) => {
  //   setMenu({
  //     ...menu,
  //     [e.target.id]: e.target.value,
  //   });
  // };

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

  useEffect(() => {
    if (csvFile) {
      csvFile.addEventListener('change', (ev) => {
        const file = ev.target.files[0];
        Papa.parse(file, {
          complete: function (results) {
            const convertedCsvData = convertCsvToObjectArray(results);
            setItems(convertedCsvData);
            dispatch(setCsvData(convertedCsvData));
          },
        });
      });
    }
  }, [csvFile]);

  //   useEffect(()=>{

  //   },[])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Menu
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Menu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the menu details below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={menu.name}
            label="Menu Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            defaultValue={menu.description}
            label="Menu Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />

          {console.log(csvFile)}
          <Typography>File Name: {csvName}</Typography>
          <Button variant="contained" component="label">
            Upload Menu
            <input
              type="file"
              hidden
              ref={(x) => {
                setCsvFile(x);
              }}
              onChange={(ev) => {
                setCsvName(ev.target.files[0].name);
                // console.log(ev.target.files[0].name)
              }}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitMenu} disabled={csvData.length === 0}>
            All Done!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMenu;
