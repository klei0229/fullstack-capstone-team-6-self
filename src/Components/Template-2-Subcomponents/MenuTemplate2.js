import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import setMenuPreferences' from '../store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Container,
  Button,
  Grid,
  Slider,
  Typography,
  Select,
  MenuItem,
  Input,
  Textfield,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
  InputBase,
  IconButton,
} from '@mui/material';

// import SearchIcon from '@mui/icons-material/Search';

import ItemCard from './ItemCard';

const MenuTemplate2 = ({ id }) => {
  const { menuPreferences, menus } = useSelector((state) => state);
  const menu = menus.find((menu) => menu.id === id);

  const [categories, setCategories] = useState([]);

  const refs = useRef([]);

  const theme = createTheme({
    typography: {
      fontFamily: ['Arial'].join(','),
    },
  });

  const handleClick = (ev) => {
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    refs.current[ev.target.value].scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    console.log('menu', menu);
    //loop thru each item
    //if categories does not include value add it

    let arr = [];

    if (menu.items) {
      for (let i = 0; i < menu.items.length; i++) {
        console.log(menu.items[i]);
        if (!arr.includes(menu.items[i].category)) {
          arr.push(menu.items[i].category);
        }
      }
    }

    // console.log(arr);
    setCategories(arr);
  }, [menu]);

  useEffect(() => {
    console.log(menuPreferences);
  }, [menuPreferences]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="lg"
          sx={
            {
              // backgroundColor: 'blue'
            }
          }
        >
          <br></br>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontSize: menuPreferences.restaurantNameFontSize,
              fontFamily: menuPreferences.fontFamily,
              color: menuPreferences.primaryColor,
            }}
          >
            {/* TODO: save this to a separate menu reducer */}
            {menuPreferences.resName}
          </Typography>

          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Container
              sx={{
                width: '100%',
                // backgroundColor: 'orange',
                mr: '1rem',
              }}
            >
              <br></br>
              <Divider></Divider>
              <br></br>
              {categories.map((category, index) => {
                return (
                  <Button variant="text" value={index} onClick={handleClick}>
                    {category}
                  </Button>
                );
              })}
            </Container>

            <Container
              sx={
                {
                  // backgroundColor: 'green'
                }
              }
            >
              {categories.map((category, index) => {
                return (
                  <div
                    key={index}
                    ref={(element) => {
                      refs.current[index] = element;
                    }}
                  >
                    <br></br>
                    <Typography
                      variant="h5"
                      sx={{ fontSize: menuPreferences.categoryNameFontSize }}
                    >
                      {category}
                    </Typography>
                    <Divider></Divider>
                    <br></br>
                    <Grid container spacing={3}>
                      {menu.items
                        .filter((elem) => {
                          return elem.category === category;
                        })
                        .map((elem) => {
                          return (
                            <Grid item lg={4}>
                              <ItemCard
                                props={elem}
                                margin={menuPreferences.margin}
                                padding={menuPreferences.padding}
                              ></ItemCard>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </div>
                );
              })}
            </Container>
          </Container>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default MenuTemplate2;
