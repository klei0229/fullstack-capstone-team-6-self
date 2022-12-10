import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import BusinessDashboard from './BusinessDashboard';
import Restaurants from './Restaurants';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
        {/* <Restaurants /> */}
        <BusinessDashboard></BusinessDashboard>
      </div>
    </div>
  );
};

export default Home;
