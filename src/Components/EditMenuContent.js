import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItems, fetchMenu, updateMenuItems, updateMenu } from '../store';
import EditMenuItem from './EditMenuItem';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const EditMenuContent = () => {
  const { menus, items } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMenu(id));
    dispatch(fetchItems());
  }, []);

  const menu = menus.find((menu) => menu.id === id);

  const update = async (e) => {
    e.preventDefault();
    await dispatch(updateMenuItems(menu, items, navigate));
    await dispatch(updateMenu(menu, items));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <Paper elevation={3} sx={{ width: '80%', mt: 5 }}>
        <div>
          {menu.items
            ? menu.items.map((item) => {
                return (
                  <Grid
                    container
                    sx={{ alignItems: 'space-evenly', backgroundColor: 'aliceblue' }}
                    key={item.id}
                  >
                    <Grid item xs={8}>
                      <EditMenuItem
                        sx={{ alignSelf: 'flex-start' }}
                        item={item}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Card
                        key={item.id}
                        sx={{
                          width: 350,
                          margin: '25px',
                          padding: '25px',
                          alignSelf: 'center',
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="150px"
                            src={
                              item.image ??
                              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'
                            }
                            alt="dish"
                            sx={{ objectFit: 'cover' }}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ fontSize: 20 }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: 20,
                              }}
                            >
                              {item.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          display="flex"
                          sx={{
                            backgroundColor: 'aliceblue',
                            justifyContent: 'space-around',
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            PRICE: ${item.price}
                          </Typography>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                );
              })
            : 'nothing to see here...'}
        </div>
      </Paper>
      <Button
        sx={{ alignSelf: 'flex-start', ml: 15, width: 256 }}
        variant="contained"
        size='large'
        onClick={update}
      >
        Update Menu
      </Button>
    </Box>
  );
};

export default EditMenuContent;
