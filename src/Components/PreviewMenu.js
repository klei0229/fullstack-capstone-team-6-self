import React, { useState } from 'react';
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardActionArea,
} from '@mui/material';

const PreviewMenu = (props) => {
  const [open, setOpen] = useState(false);
  const item = props.item;
  const image = props.image;

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Preview Changes</Button>
      <Dialog open={open}>
        <DialogTitle>{item.name}</DialogTitle>
        <DialogContent>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150px"
                src={image ?? 'No image available'}
              />
            </CardActionArea>
          </Card>
          <DialogContentText>{item.price}</DialogContentText>
          <DialogContentText>{item.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>All Done!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PreviewMenu;
