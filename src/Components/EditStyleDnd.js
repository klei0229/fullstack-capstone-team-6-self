import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import EditPanel from './EditPanel';
import MenuTemplate2 from './Template-2-Subcomponents/MenuTemplate2';
import { Container, Button, Grid, Typography, Paper, Box } from '@mui/material';
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

export const CardContext = createContext({
  moveToMenu: null,
  addComponent: null,
  addColumn: null,
});

const EditStyleDnd = () => {
  const { id } = useParams();
  const { menus } = useSelector((state) => state);
  console.log(menus);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
console.log(items);
  const [layout, setLayout] = useState([[[{
    id:'123',
    name:'Sample Item',
    description:"Lorem Ipsum",
    isOnMenu: true,
    componentType:'Card'
  }]]]);

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
  }, [menu]);

  useEffect(() => {
    console.log(layout);
  }, [layout]);

  const moveToMenu = (id) => {
    const subarray = items.filter((element) => {
      console.log(id);
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
    console.log(item);
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
    let tempItems = [...items];
    let id = item.id;

    tempItems.filter((element) => {
      return id === element.id;
    })[0].isInMenu = true;
    let newLayout = [...layout];
    newLayout.splice(i, 0, [[item]]);
    setLayout(newLayout);
    setItems(tempItems);
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
          i={item.i}
          j={item.j}
          k={item.k}
        ></DndCard2>
      );
    } else if (item.componentType === 'Divider') {
      return <hr></hr>;
    } else if (item.componentType === 'Typography') {
      return (<TypographyComponent></TypographyComponent>);
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
          <Grid container>
            <Grid item xs={3}>
              <Paper
                elevation="10"
                sx={{
                  pt: 2,
                  pb: 2,
                }}
              >
                Components
                <Component componentType="Divider"></Component>
                <Component componentType="Typography"></Component>
                <Component componentType="Image"></Component>
                {items
                  .filter((item) => {
                    return item.isInMenu === false;
                  })
                  .map((item) => {
                    return (
                      <div>
                        <h1>{item.name}</h1>

                        {/* <Component> */}
                        <DndCard2
                          id={item.id}
                          name={item.name}
                          description={item.description}
                          isOnMenu={false}
                          componentType={'Card'}
                        ></DndCard2>
                        {/* </Component> */}
                      </div>
                    );
                  })}
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
          Restaurant Name

                <DropzoneOuterRow layout={layout} i={0}>
                  {/* 0 */}
                </DropzoneOuterRow>
                {layout.map((row, i) => {
                  return (
                    <>
                      <Row i={i}>
                        <DropzoneColumn layout={layout} i={i} j={0}>
                          {/* {i},0 */}
                        </DropzoneColumn>
                        {row.map((col, j) => {
                          return (
                            <>
                              <Column i={i} j={j}>
                                <Dropzone layout={layout} i={i} j={j} k={0}>
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
                                      >
                                        {/* {i},{j},{k + 1} */}
                                      </Dropzone>
                                    </>
                                  );
                                })}
                              </Column>
                              <DropzoneColumn layout={layout} i={i} j={j + 1}>
                                {/* {i},{j + 1} */}
                              </DropzoneColumn>
                            </>
                          );
                        })}
                      </Row>
                      <DropzoneOuterRow layout={layout} i={i + 1}>
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
