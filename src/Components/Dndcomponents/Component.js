import React, { useEffect, useContext } from 'react';
import { Container, Box } from '@mui/material';

const Component = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderColor: 'yellow',
        width: '100%',
        height: 'fitContent',
      }}
    >
      {props.children}
    </Box>
  );
};

export default Component;
