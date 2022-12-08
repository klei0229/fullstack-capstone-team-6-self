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
import { setCsvData, createMenu } from '../store';

const AddMenu = (props) => {

  const { auth, csvData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({
    name: '',
    description: '',
    restaurantId: props.restaurant.id,
  });

  // const [menu, setMenu] = useState({
  //   name: '',
  //   description: '',
  //   MenuId: Menu.id,
  // });

  const [csvFile, setCsvFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(createMenu(menu));
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
    dispatch(createMenu(menu));
    setOpen(false);
  }

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
          <Button variant="contained" component="label">
            Upload Menu
            <input
              type="file"
              hidden
              ref={(x) => {
                setCsvFile(x);
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
