import React from 'react';
import { useSelector } from 'react-redux';
import BusinessDashboard from './BusinessDashboard';
import Restaurant from './Restaurant';
import AddRestaurant from './AddRestaurant';

import { Link } from 'react-router-dom';

const Restaurants = () => {
  const { auth, restaurants, adminRestaurants } = useSelector((state) => state);
  console.log(adminRestaurants);
  return (
    <div>
      {auth.isAdmin ? (
        <div>
          {/* <BusinessDashboard /> */}
          <h1>My Restaurants</h1>
          <AddRestaurant />

          <ul>
            {adminRestaurants.map((restaurant) => {
              // return (
              //   <li>
              //     <Link to={`/restaurants/${restaurant.id}`}>
              //       {restaurant.name}
              //     </Link>
              //   </li>
              // );
              return (
                <li key={restaurant.id}>
                  <Restaurant restaurant={restaurant} />
                </li>
              );
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
