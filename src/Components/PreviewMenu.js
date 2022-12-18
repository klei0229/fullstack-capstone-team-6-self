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
  const image = props.image ?? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Preview Changes</Button>
      <Dialog sx={{ width: '100%' }} open={open}>
        <DialogTitle>{item.name}</DialogTitle>
        <DialogContent>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                width="100%"
                src={image}
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
