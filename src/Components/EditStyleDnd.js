import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import EditPanel from './EditPanel';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import {
  Container,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Switch,
  TextField,
} from '@mui/material';
import { setCsvData, setMenuPreferences } from '../store';
import { fetchMenus, fetchItems } from '../store';

import TemplateDND from './TemplateDND';
import DndCard2 from './DndCard2';
import MenuBoxTarget from './MenuBoxTarget';
import Column from './Dndcomponents/Column';
import Row from './Dndcomponents/Row';
import Dropzone from './Dndcomponents/Dropzone';
import DropzoneOuterRow from './Dndcomponents/DropzoneOuterRow';
import DropzoneColumn from './Dndcomponents/DropzoneColumn';
import Component from './Dndcomponents/Component';
import TypographyComponent from './Dndcomponents/TypographyComponent';
import ImageComponent from './Dndcomponents/ImageComponent';
import axios from 'axios';


export const CardContext = createContext({
  moveToMenu: null,
  addComponent: null,
  addColumn: null,
});

const EditStyleDnd = () => {
  const [switchBool, setSwitchBool] = useState(false);

  

  const { id } = useParams();
  const { menus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [layout, setLayout] = useState([
    [
      [
        {
          id: '123',
          name: 'Sample Item',
          description: 'Lorem Ipsum',
          isOnMenu: true,
          componentType: 'Card',
        },
      ],
    ],
  ]);

  const [menuPreferences, setMenuPreferences] = useState({});


  // const [layout, setLayout] = useState([

  //   [
  //     [1,2,3],[3,4],[5],
  //   ],
  //   [
  //     [2]
  //   ]

  // ]);

  const menu = menus.find((menu) => menu.id === id);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchItems());
  }, []);

  useEffect(() => {

    console.log(menu);
    menu.items.forEach((item) => {
      item.isInMenu = false;
    });

    setItems(menu.items);
    setMenuPreferences(JSON.parse(menu.preferences),);
  }, [menu]);

  useEffect(() => {
  }, [layout]);


  const saveToDB = async () => {
    console.log('invoked save to db');

    console.log(menuPreferences);
    let tempMenuPreferences = {...menuPreferences};
    tempMenuPreferences.useDnd = true;
    let dndSettings = {
      layout:layout,
    };

    tempMenuPreferences.dndSettings = dndSettings;

    const prefResponse = await axios.put(`/api/menus/${menu.id}`, {
      preferences: JSON.stringify(tempMenuPreferences),
    });
      console.log(prefResponse);
    };
  
  const moveToMenu = (id) => {
    const subarray = items.filter((element) => {
      return element.id === id;
    });
    subarray[0].isInMenu = true;
    setItems(
      items
        .filter((element) => {
          return element.id !== id;
        })
        .concat(subarray[0])
    );
  };

  const addComponent = (layout, i, j, k, item) => {
    let newLayout = [...layout];

    if (item.componentType === 'Card') {
      let tempItems = [...items];
      let id = item.id;

      tempItems.filter((element) => {
        return id === element.id;
      })[0].isInMenu = true;

      item.i = i;
      item.j = j;
      item.k = k;
      item.isOnMenu = true;

      setItems(tempItems);
    }

    newLayout[i][j].splice(k, 0, item);
    setLayout(newLayout);
  };

  const addColumn = (layout, i, j, k, item) => {
    let newLayout = [...layout];

    if (item.type === 'Card') {
      let tempItems = [...items];
      let id = item.id;

      tempItems.filter((element) => {
        return id === element.id;
      })[0].isInMenu = true;
      setItems(tempItems);
    }
    newLayout[i].splice(j, 0, [item]);
    setLayout(newLayout);
  };

  const addRow = (layout, i, j, k, item) => {
    let newLayout = [...layout];
    if (item.componentType === 'Card') {
      let tempItems = [...items];
      let id = item.id;
      tempItems.filter((element) => {
        return id === element.id;
      })[0].isInMenu = true;
      setItems(tempItems);
    }

    newLayout.splice(i, 0, [[item]]);
    setLayout(newLayout);
  };

  const moveRow = (layout, i, j, k, item) => {
    let newLayout = [...layout];
    let valueToRemove = newLayout[item.i];
    newLayout.splice(item.i, 1);
    newLayout.splice(i, 0, valueToRemove);

    setLayout(newLayout);
  };

  const moveColumn = (layout, i, j, k, item) => {
    let newLayout = [...layout];
    let valueToRemove = newLayout[item.i][item.j];
    newLayout[item.i].splice(item.j, 1);
    newLayout[i].splice(j, 0, valueToRemove);

    setLayout(newLayout);
  };

  const moveComponent = (layout, i, j, k, item) => {
    let newLayout = [...layout];
    let valueToRemove = newLayout[item.i][item.j][item.k];
    newLayout[item.i][item.j].splice(item.k, 1);
    newLayout[i][j].splice(k, 0, valueToRemove);

    setLayout(newLayout);
  };

  const renderComponent = (item) => {
    if (item.componentType === 'Card') {
      return (
        <DndCard2
          id={item.id}
          name={item.name}
          description={item.description}
          isOnMenu={item.isOnMenu}
          price={item.price}
          i={item.i}
          j={item.j}
          k={item.k}
        ></DndCard2>
      );
    } else if (item.componentType === 'Divider') {
      return (
        <>
          <Box sx={{ backgroundColor: 'white' }}>
            <br></br>
            <Divider />
            <br></br>
            {/* <hr></hr> */}
          </Box>
        </>
      );
    } else if (item.componentType === 'Typography') {
      return <TypographyComponent></TypographyComponent>;
    } else if (item.componentType === 'Image') {
      return <ImageComponent></ImageComponent>;
    }
  };

  return (
    <div>
      <CardContext.Provider
        value={{
          addComponent,
          moveToMenu,
          addColumn,
          addRow,
          moveColumn,
          moveComponent,
          moveRow,
          // renderCard,
        }}
      >
        <div>
          {/* <Typography>Show Dropzones</Typography> */}
          {/* <Switch
            onChange={() => {
              setSwitchBool(!switchBool);
            }}
            defaultChecked
            size="small"
          /> */}
          <Grid container>
            <Grid item xs={3}>
              <Paper
                elevation="10"
                sx={{
                  pt: 2,
                  pb: 2,
                  pl: '10px',
                  pr: '10px',
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Editing Panel
                </Typography>

                <TextField
                  autoFocus
                  id="templateName"
                  name="templateName"
                  label="Template Name"
                  type="Template Name"
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                  onChange={(ev) => onChange(ev.target.name, ev.target.value)}
                />
 
                <br></br>
                <br></br>

                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  onClick={() => { saveToDB();
                    console.log(layout);
                    console.log(menuPreferences)
                    console.log('todo save to db')
                  }
                }
                >
                  Save Settings
                </Button>
                <br></br>
                <br></br>
                <Typography variant="h4">Components</Typography>
                <br></br>

                <Box sx={{ display: 'flex' }}>
                  <Component componentType="Divider"></Component>
                  <Component componentType="Typography"></Component>
                  <Component componentType="Image"></Component>
                </Box>
                <br></br>
                <Divider></Divider>
                <br></br>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'aliceblue',
                  }}
                >
                  <br></br>

                  {items
                    .filter((item) => {
                      return item.isInMenu === false;
                    })
                    .map((item) => {
                      return (
                        <>
                          <DndCard2
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            isOnMenu={false}
                            componentType={'Card'}
                          ></DndCard2>
                          <br></br>
                        </>
                      );
                    })}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Container
                maxWidth="lg"
                sx={{
                  backgroundColor: 'white',
                  height: 'fitContent',
                  pt: '2rem',
                  pb: '2rem',
                }}
              >
                <Typography>Show Dropzones</Typography>
                <Switch
                  onChange={() => {
                    setSwitchBool(!switchBool);
                  }}
                  defaultChecked
                  size="small"
                />
                {/* <br></br> */}
                {/* here */}
                <DropzoneOuterRow
                  layout={layout}
                  showGridLines={switchBool}
                  i={0}
                >
                  {/* 0 */}
                </DropzoneOuterRow>
                {layout.map((row, i) => {
                  return (
                    <>
                      <Row i={i}>
                        <DropzoneColumn
                          layout={layout}
                          i={i}
                          j={0}
                          showGridLines={switchBool}
                        >
                          {/* {i},0 */}
                        </DropzoneColumn>
                        {row.map((col, j) => {
                          return (
                            <>
                              <Column i={i} j={j}>
                                <Dropzone
                                  layout={layout}
                                  i={i}
                                  j={j}
                                  k={0}
                                  showGridLines={switchBool}
                                >
                                  {/* {i},{j},0 */}
                                </Dropzone>
                                {col.map((component, k) => {
                                  return (
                                    <>
                                      {renderComponent(component)}
                                      {/* <Component i={i} j={j} k={k}> */}
                                      {/* {renderCard(component, i, j, k)} */}
                                      {/* </Component> */}
                                      <Dropzone
                                        layout={layout}
                                        i={i}
                                        j={j}
                                        k={k + 1}
                                        showGridLines={switchBool}
                                      >
                                        {/* {i},{j},{k + 1} */}
                                      </Dropzone>
                                      {/* here */}
                                      {/* <br></br> */}
                                    </>
                                  );
                                })}
                              </Column>
                              <DropzoneColumn
                                layout={layout}
                                i={i}
                                j={j + 1}
                                showGridLines={switchBool}
                              >
                                {/* {i},{j + 1} */}
                              </DropzoneColumn>
                            </>
                          );
                        })}
                      </Row>
                      <DropzoneOuterRow
                        layout={layout}
                        i={i + 1}
                        showGridLines={switchBool}
                      >
                        {/* {i + 1} */}
                      </DropzoneOuterRow>
                    </>
                  );
                })}
              </Container>
            </Grid>
          </Grid>
        </div>
      </CardContext.Provider>
    </div>
  );
};

export default EditStyleDnd;
