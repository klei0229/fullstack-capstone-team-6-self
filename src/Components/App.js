import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Restaurants from './Restaurants';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchRestaurants, fetchAdminRestaurants } from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.isAdmin) {
      dispatch(fetchAdminRestaurants(auth));
    } else {
      dispatch(fetchRestaurants());
    }
  }, [auth]);

  return (
    <div>
      <h1>FS App Template</h1>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/admin-restaurants/:id" element={<Restaurants />} />
      </Routes>
    </div>
  );
};

export default App;
