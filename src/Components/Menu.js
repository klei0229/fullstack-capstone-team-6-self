import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Menu = () => {
  const { id } = useParams();
  const { menus } = useSelector((state) => state);
  const menu = menus.find((menu) => menu.id === id);

  return <div>{menu.name}</div>;
};

export default Menu;
