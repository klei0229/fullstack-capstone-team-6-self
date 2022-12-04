import React from 'react';
import { useSelector } from 'react-redux';

const Menus = () => {
  const { menus } = useSelector((state) => state);

  return (
    <div>
      {menus.map((menu) => {
        return <li key={menu.id}>{menu.name}</li>;
      })}
    </div>
  );
};

export default Menus;
