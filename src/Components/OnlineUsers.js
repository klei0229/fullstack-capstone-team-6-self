import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state);
  console.log(onlineUsers);
  return (
    <div>
      <ul>
        {onlineUsers.map((user) => {
          return (
            <div key={user.id}>
              <h3>{user.username}</h3>
              <img src={user.avatar} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
