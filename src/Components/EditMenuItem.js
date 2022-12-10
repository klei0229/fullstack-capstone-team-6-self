import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItem, updateItem, updateMenuItems } from '../store';
import { Paper, TextField, Button, Typography } from '@mui/material';

const EditMenuItem = (props) => {
  const { items } = useSelector((state) => state);
  const id = props.item.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = useParams();

  const item = props.item;
  const [itemDetails, setItemDetails] = useState({
    image: '',
    name: '',
    price: '',
    props: '',
  });

  const onChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value,
    });
  };

  const update = (e) => {
    e.preventDefault();
    dispatch(updateItem({ id: id, ...itemDetails }));
  };

  return (
    <div>
      <Paper>
        <form onSubmit={update}>
          <Typography>Dish: {item.name}</Typography>
          <TextField
            name="name"
            label="Dish Name"
            placeholder={item.name}
            value={itemDetails.name}
            onInput={onChange}
          />
          <TextField
            name="price"
            label="Dish Price"
            placeholder={item.price}
            value={itemDetails.price}
            onInput={onChange}
          />
          <TextField
            name="image"
            label="Picture of Dish"
            placeholder={item.image}
            value={itemDetails.image ?? ''}
            onInput={onChange}
          />
          <Button type="submit">Done Editing</Button>
        </form>
      </Paper>
    </div>
  );
};

export default EditMenuItem;
