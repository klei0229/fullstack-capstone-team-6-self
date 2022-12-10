import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItem, fetchItems, updateItem, updateMenuItems } from '../store';
import {
  Card,
  CardActions,
  Paper,
  TextField,
  Button,
  Typography,
  CardContent,
} from '@mui/material';

const EditMenuItem = (props) => {
  const { items } = useSelector((state) => state);
  const id = props.item.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const item = props.item;
  const [itemDetails, setItemDetails] = useState({
    image: item.image,
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
    await dispatch(updateItem({ id: id, ...itemDetails }));
  };

  return (
    <div>
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
            <TextField
              name="image"
              label="Picture of Dish"
              placeholder={item.image}
              value={itemDetails.image ?? ''}
              onInput={onChange}
            />
            <CardActions>
              <Button type="submit">Done Editing</Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditMenuItem;
