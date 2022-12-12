import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../store';
import {
  Card,
  CardActions,
  TextField,
  Button,
  CardContent,
} from '@mui/material';

const EditMenuItem = (props) => {
  const id = props.item.id;
  const dispatch = useDispatch();

  const item = props.item;
  const [itemDetails, setItemDetails] = useState({
    image: '',
    name: item.name,
    price: item.price,
    props: item.props,
  });

  const onChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value,
    });
  };

  const update = async (e) => {
    e.preventDefault();
    await dispatch(updateItem({ id, ...itemDetails }));
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <form onSubmit={update}>
          <TextField
            name="name"
            label="Dish Name"
            placeholder={item.name}
            value={itemDetails.name}
            onInput={onChange}
          />
          <br />
          <TextField
            name="price"
            label="Dish Price"
            placeholder={item.price}
            value={itemDetails.price}
            onInput={onChange}
          />
          <br />
          <Button variant="contained" component="label">
            Upload Image
            <input
              name="image"
              type="file"
              hidden
              value={itemDetails.image ?? ''}
              onChange={onChange}
            />
          </Button>
          <CardActions>
            <Button type="submit">Done Editing</Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditMenuItem;
