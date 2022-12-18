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
import ResponsiveAppBar from './Appbar';
import ViewMenu from './ViewMenu';
// import BusinessDashboard from './BusinessDashboard';
import EditStyleDnd from './EditStyleDnd';
import Users from './Users';

import { connect, useSelector, useDispatch } from 'react-redux';
import {
  loginWithToken,
  fetchRestaurants,
  fetchMenus,
  fetchGoogleUser,
  fetchItems,
  fetchOnlineUsers,
  fetchUsers,
} from '../store';
import { Routes, Route } from 'react-router-dom';
import PreviewMenu from './PreviewMenu';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.auth.id && !this.props.auth.id) {
      window.socket.close();
    }
    if (!prevProps.auth.id && this.props.auth.id) {
      window.socket = io();
      window.socket.emit('auth', window.localStorage.getItem('token'));
      this.props.dispatch(fetchOnlineUsers());
      window.socket.on('userEntered', (user) => {
        this.props.dispatch({ type: 'USER_ENTERED', user });
      });
      window.socket.on('userLeft', (user) => {
        this.props.dispatch({ type: 'USER_LEFT', user });
      });
    }
  }
  render() {
    return <_App />;
  }
}

const _App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchRestaurants());
    dispatch(fetchMenus());
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUsers());
    }
  }, [auth]);

  // useEffect(()=>{},[menus])

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {/* <h1>MenYou</h1> */}
        {/* {auth.id ? <BusinessDashboard/> : <Login />} */}

        {/* <TemplateDND></TemplateDND> */}
        {auth.id ? (
          <div>
            <ResponsiveAppBar />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        ) : (
          ''
        )}

        {/* <h1>MenYou</h1> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<Restaurant />} />
          <Route path="/menu/editContent/:id" element={<EditMenuContent />} />
          <Route path="/menu/editStyle/:id" element={<EditStyle />} />
          <Route path="/menu/editStyleFull/:id" element={<EditStyleDnd />} />
          <Route path="/menu/preview/:id" element={<ViewMenu />} />

          <Route path="/edit/:id" element={<TemplateDND></TemplateDND>} />
          <Route path="/menus" element={<Menus />} />

          <Route path="/items/" element={<PreviewMenu />} />
          <Route path="/items/:id" element={<PreviewMenu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </DndProvider>
    </div>
  );
};

export default connect((state) => state)(App);
