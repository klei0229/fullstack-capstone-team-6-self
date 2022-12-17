import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import setMenuPreferences' from '../store';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Container,
  Stack,
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

import Item from './Item';

const MenuTemplate3 = ({ id, menuOptions }) => {
  const { menuPreferences, menus } = useSelector((state) => state);
  console.log(menuPreferences);
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
    console.log(categories);
  }, [categories]);

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
          {/* menu name */}
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontSize: menuPreferences.restaurantNameFontSize,
              fontFamily: menuPreferences.fontFamily,
              color: menuPreferences.primaryColor,
            }}
          >
            {menuOptions.menuName}
          </Typography>

          {/* menu description */}
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: menuPreferences.descriptionNameFontSize,
              fontFamily: menuPreferences.fontFamily,
              color: menuPreferences.primaryColor,
            }}
          >
            {menuOptions.menuDescription}
          </Typography>

          <Container>
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
                    variant="h6"
                    sx={{
                      fontSize: menuPreferences.categoryNameFontSize,
                      textTransform: 'uppercase',
                    }}
                  >
                    {category}
                  </Typography>
                  <br></br>
                  <br></br>

                  {menu.items
                    .filter((elem) => elem.category === category)
                    .map((elem) => {
                      return (
                        <>
                          <Item
                            props={elem}
                            margin={menuPreferences.margin}
                            padding={menuPreferences.padding}
                          ></Item>
                          <br></br>
                        </>
                      );
                    })}
                </div>
              );
            })}
          </Container>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default MenuTemplate3;
