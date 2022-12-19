import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const OnlineUsers = () => {
  const { auth, onlineUsers } = useSelector((state) => state);
  return (
    <Paper sx={{ maxWidth: 'lg', backgroundColor: 'aliceblue' }}>
      <Grid container>
        {onlineUsers
          .filter((user) => user.id !== auth.id)
          .map((user) => {
            return (
              <Card
                key={user.id}
                sx={{ width: 350, margin: '25px', padding: '25px' }}
              >
                <CardActionArea>
                  <Avatar src={user.avatar} />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontSize: 20 }}
                    >
                      {user.username}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button variant="contained">Invite to Table</Button>
              </Card>
            );
          })}
      </Grid>
    </Paper>
  );
};

export default OnlineUsers;
