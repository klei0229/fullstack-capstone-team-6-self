import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store';
import BusinessDashboard from './BusinessDashboard';
import Restaurants from './Restaurants';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout(navigate))}>Logout</button>
        {/* <Restaurants /> */}
        <BusinessDashboard></BusinessDashboard>
      </div>
    </div>
  );
};

export default Home;
