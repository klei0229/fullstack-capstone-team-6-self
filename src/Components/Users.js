import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

const Users = () => {
  const { users } = useSelector((state) => state);

  return (
    <Box>
      {users.map((user) => {
        return (
          <Card key={user.id}>
            <CardContent>
              <Avatar src={user.avatar} />
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Username: <strong>{user.username}</strong>
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default Users;
