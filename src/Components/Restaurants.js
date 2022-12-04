import React from 'react';
import { useSelector } from 'react-redux';
import EditPanel from './EditPanel';
import Restaurant from './Restaurant';

const Restaurants = () => {
  const { auth, restaurants, adminRestaurants } = useSelector((state) => state);

  return (
    <div>
      {auth.isAdmin ? (
        <div>
          <EditPanel />
          <ul>
            {adminRestaurants.map((restaurant) => {
              return <Restaurant key={restaurant.id} restaurant={restaurant} />;
            })}
          </ul>
          {/* <h1>Your Restaurants</h1>
          <pre>{JSON.stringify(adminRestaurants, null, 2)}</pre> */}
        </div>
      ) : (
        <div>
          <ul>
            {restaurants.map((restaurant) => {
              return <Restaurant key={restaurant.id} restaurant={restaurant} />;
            })}
          </ul>
          {/* <h1>Hello!</h1>
          <pre>{JSON.stringify(restaurants, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
