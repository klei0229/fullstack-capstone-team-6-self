import React, { useEffect, useState } from 'react';
import { convertCsvToObjectArray } from './EditPanel';
import Papa from 'papaparse';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCsvData, createRestaurant } from '../store';

const AddRestaurant = () => {
  const { auth, csvData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    contact: '',
    description: '',
    email: '',
    userId: auth.id,
  });

  // const [menu, setMenu] = useState({
  //   name: '',
  //   description: '',
  //   restaurantId: restaurant.id,
  // });

  const [csvFile, setCsvFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(createRestaurant(restaurant));
    // await dispatch(createMenu(menu));
    setOpen(false);
  };

  const onChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.id]: e.target.value,
    });
  };

  // const onChangeMenu = (e) => {
  //   setMenu({
  //     ...menu,
  //     [e.target.id]: e.target.value,
  //   });
  // };

  useEffect(() => {
    if (csvFile) {
      csvFile.addEventListener('change', (ev) => {
        const file = ev.target.files[0];
        Papa.parse(file, {
          complete: function (results) {
            const convertedCsvData = convertCsvToObjectArray(results);
            dispatch(setCsvData(convertedCsvData));
          },
        });
      });
    }
  }, [csvFile]);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add A Restaurant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the restaurant details below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={restaurant.name}
            label="Restaurant Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            defaultValue={restaurant.address}
            label="Restaurant Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="contact"
            defaultValue={restaurant.contact}
            label="Restaurant Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            defaultValue={restaurant.description}
            label="Restaurant Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            defaultValue={restaurant.email}
            label="Restaurant Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={menu.name}
            label="Menu Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeMenu}
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
            onChange={onChangeMenu}
          /> */}
          {/* <Button variant="contained" component="label">
            Upload Menu
            <input
              type="file"
              hidden
              ref={(x) => {
                setCsvFile(x);
              }}
            />
          </Button> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={csvData.length === 0}>
            All Done!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRestaurant;
