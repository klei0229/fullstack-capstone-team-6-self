import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem } from '../store';
import {
  Card,
  CardActions,
  TextField,
  Button,
  CardContent,
} from '@mui/material';
import PreviewMenu from './PreviewMenu';

const EditMenuItem = (props) => {
  const id = props.item.id;
  const dispatch = useDispatch();

  const item = props.item;
  const [itemDetails, setItemDetails] = useState({
    name: item.name,
    price: item.price,
    props: item.props,
  });
  const [image, setImage] = useState(null);
  const [data, setData] = useState('');

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

  const onChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value,
    });
  };

  const update = async (e) => {
    e.preventDefault();
    await dispatch(updateItem({ id, image: data, ...itemDetails }));
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
              ref={(x) => setImage(x)}
              onChange={(e) => setData(e.target.files[0].name)}
            />
          </Button>
          <CardActions>
            <PreviewMenu item={itemDetails} image={data} itemId={id} />
            <Button type="submit">Done Editing</Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditMenuItem;
