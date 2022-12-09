import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Restaurants from './Restaurants';
import Menus from './Menus';
import TemplateDND from './TemplateDND';

import { useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchRestaurants,
  fetchAdminRestaurants,
  fetchMenus,
} from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchMenus());
  }, []);

  useEffect(() => {
    if (auth.isAdmin) {
      dispatch(fetchAdminRestaurants(auth));
    } else {
      dispatch(fetchRestaurants());
    }
  }, [auth]);

  // useEffect(()=>{},[menus])

  return (
    <div>

      <h1>MenYou</h1>
      {auth.id ? <Home /> : <Login />}
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/admin-restaurants/:id" element={<Restaurants />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/edit/:id" element={<TemplateDND></TemplateDND>} />
      </Routes>
    </div>
  );
};

export default App;
