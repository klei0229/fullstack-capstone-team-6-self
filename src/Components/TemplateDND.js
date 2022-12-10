import React, { useEffect, createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../store';
import { Container, Box } from '@mui/material';

// import Draggable from 'react-draggable';
import MediaCard from './Dndcard';
import BoxTarget from './BoxTarget';

export const CardContext = createContext({
  moveToBox: null,
});

const TemplateDND = () => {
  const { menu } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(menus);
  const params = useParams().id;

  console.log(params);
  console.log(menu);
  
  const array = [
    {
      name: 'Card1',
      isInBox: false,
    },
    {
      name: 'Card2',
      isInBox: false,
    },
  ];
  
  const [items, setItems] = useState(array);
  const moveToBox = (name) => {


    console.log('movetobox called on '+ name)

    const subarray = items.filter((element) => {
      return element.name === name;
    });
    console.log(subarray);
    subarray[0].isInBox = true;
    setItems(
      items
        .filter((element) => {
          return element.name !== name;
        })
        .concat(subarray[0])
    );
  };

  useEffect(()=>{console.log(items)},[items])




  useEffect(() => {
    dispatch(fetchMenu(params));
    console.log(menu);
  }, [params]);

  return (
    <div>
      <CardContext.Provider value={{ moveToBox }}>
        DND test
        {menu.name}
        {items
          .filter((item) => {
            console.log(item)
            return item.isInBox === false;
          })
          .map((item) => {
            return <MediaCard name={item.name} isInBox={item.isInBox}></MediaCard>;
          })}
        <Container maxWidth="lg" sx={{ backgroundColor: 'grey' }}>
          <BoxTarget>
          {items
          .filter((item) => {
            console.log(item)
            return item.isInBox === true;
          })
          .map((item) => {
            return <MediaCard name={item.name} isInBox={item.isInBox}></MediaCard>;
          })}
          </BoxTarget>
        </Container>
      </CardContext.Provider>
    </div>
  );
};

export default TemplateDND;
