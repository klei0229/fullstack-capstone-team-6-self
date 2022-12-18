import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

import Column from './Column';
import Row from './Row';
import Dropzone from './Dropzone';
import DropzoneOuterRow from './DropzoneOuterRow';
import DropzoneColumn from './DropzoneColumn';

// import TemplateDND from './TemplateDND';
// import DndCard2 from './DndCard2';
import DndCard2 from '../DndCard2';
// import MenuBoxTarget from './MenuBoxTarget';
// import Column from './Column';
// import Row from './Row';
// import Dropzone from './Dropzone';
// import DropzoneOuterRow from './DropzoneOuterRow';
// import DropzoneColumn from './DropzoneColumn';
import Component from './Component';
import TypographyComponent from './TypographyComponent';
import ImageComponent from './ImageComponent';

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

const DNDTemplate = (props) => {
  const [layout, setLayout] = useState([[[]]]);
  // const [switchBool, setSwitchBool] = useState(false);

  useEffect(() => {
    setLayout(props.layout);
  }, [props]);

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: 'white',
          height: 'fitContent',
          pt: '2rem',
          pb: '2rem',
        }}
      >
        <DropzoneOuterRow layout={layout} i={0} showGridLines={true}>
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
                  showGridLines={true}
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
                          showGridLines={true}
                        ></Dropzone>
                        {col.map((component, k) => {
                          return (
                            <>
                              {renderComponent(component)}
                              <Dropzone
                                layout={layout}
                                i={i}
                                j={j}
                                k={k + 1}
                                showGridLines={true}
                              ></Dropzone>
                            </>
                          );
                        })}
                      </Column>
                      <DropzoneColumn
                        layout={layout}
                        i={i}
                        j={j + 1}
                        showGridLines={true}
                      ></DropzoneColumn>
                    </>
                  );
                })}
              </Row>
              <DropzoneOuterRow
                layout={layout}
                i={i + 1}
                showGridLines={true}
              ></DropzoneOuterRow>
            </>
          );
        })}
      </Container>
    </div>
  );
};

export default DNDTemplate;
