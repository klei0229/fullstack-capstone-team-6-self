import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import EditStyle from './EditStyle';
import Menus from './Menus';
import EditMenuContent from './EditMenuContent';
import TemplateDND from './TemplateDND';
import Register from './Register';

import { connect, useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchRestaurants,
  fetchAdminRestaurants,
  fetchMenus,
  fetchItems,
} from '../store';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchMenus());
    dispatch(fetchItems());
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/menu/:id" element={<EditMenuContent />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/editstyle/:id" element={<EditStyle />} />
        <Route path="/edit/:id" element={<TemplateDND></TemplateDND>} />
      </Routes>
    </div>
  );
};

export default connect((state) => state)(App);
