import React, { useState, useEffect } from 'react';
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
import { createRestaurant } from '../store';

const AddRestaurant = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    contact: '',
    description: '',
    email: '',
    userId: auth.id,
  });
  const [image, setImage] = useState(null);
  const [data, setData] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (image) {
      image.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
          setData(reader.result);
        });
      });
    }
  }, [image]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(createRestaurant({ logo: data, ...restaurant }));
    setOpen(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0].name;
    setData(file);
    setFileName(file);
  };

  const onChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.id]: e.target.value,
    });
  };

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
          <Typography>File Name: {fileName}</Typography>
          <Button variant="contained" component="label">
            Upload Image
            <input
              name="image"
              type="file"
              hidden
              ref={(x) => setImage(x)}
              onChange={handleUpload}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>All Done!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRestaurant;
