import React from 'react';
import { useSelector } from 'react-redux';
import BusinessDashboard from './BusinessDashboard';
import Restaurant from './Restaurant';
import AddRestaurant from './AddRestaurant';


const Restaurants = () => {
  const { auth, restaurants, adminRestaurants } = useSelector((state) => state);

  return (
    <div>
      {auth.isAdmin ? (
        <div>
          {/* <BusinessDashboard /> */}
          <h1>My Restaurants</h1>
          <AddRestaurant />

          <ul>
            {adminRestaurants.map((restaurant) => {
              return <Restaurant key={restaurant.id} restaurant={restaurant} />;
            })}
          </ul>
        </div>
      ) : (
        <div>
          <h1>All Restaurants</h1>
          <ul>
            {restaurants.map((restaurant) => {
              return <Restaurant key={restaurant.id} restaurant={restaurant} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
