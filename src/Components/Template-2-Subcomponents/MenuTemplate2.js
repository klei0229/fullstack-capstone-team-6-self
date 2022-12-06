import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Button,
  Grid,
  Slider,
  Typography,
  Select,
  MenuItem,
  Input,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
  InputBase,
  IconButton,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import ItemCard from './ItemCard';

const MenuTemplate2 = () => {
  const { csvData } = useSelector((state) => state);

  const [categories, setCategories] = useState([]);

  const refs = useRef([]);

  const handleClick = (ev) => {
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    refs.current[ev.target.value].scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    console.log(csvData);
    //loop thru each item
    //if categories does not include value add it

    let arr = [];

    for (let i = 0; i < csvData.length; i++) {
      console.log(csvData[i]);
      if (!arr.includes(csvData[i].category)) {
        arr.push(csvData[i].category);
      }
    }

    // console.log(arr);
    setCategories(arr);
  }, [csvData]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ backgroundColor: 'blue' }}>
        <br></br>
        <Typography variant="h3" align="center">
          Restaurant Name
        </Typography>

        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Container
            sx={{ width: '25%', backgroundColor: 'orange', mr: '1rem' }}
          >
            <br></br>
            <Typography variant="h5">Filters</Typography>
            <Divider></Divider>
            <br></br>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />

            {categories.map((category,index) => {
              return (
                <Typography variant='h6' align="center">
                  <Button fullWidth variant="text" value={index} onClick={handleClick}>
                    {category}
                  </Button>
                </Typography>
              );
            })}
          </Container>

          <Container sx={{ backgroundColor: 'green' }}>
            {categories.map((category,index) => {
              return (
                <div
                  key={index}
                  ref={(element) => {
                    refs.current[index] = element;
                  }}
                >
                  <br></br>
                  <Typography variant="h5">{category}</Typography>
                  <Divider></Divider>
                  <br></br>
                  <Grid container spacing={2}>
                    {csvData
                      .filter((elem) => {
                        return elem.category === category;
                      })
                      .map((elem) => {
                        return (
                          <Grid item lg={4}>
                            <ItemCard props={elem}></ItemCard>
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
    </div>
  );
};

export default MenuTemplate2;