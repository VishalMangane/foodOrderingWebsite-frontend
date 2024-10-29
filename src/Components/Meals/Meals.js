import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import Header from "../Layout/Header";
import Cart from "../Cart/Cart";
import CartProvider from "../store/CartProvider";
import axios from 'axios';

const Meals = () => {
  const location = useLocation();
  const [cartIsShown, setCartIsShown] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); 

  useEffect(() => {
    if (location.state && location.state.cityName) {
      const { cityName, hotels: fetchedHotels } = location.state;

      if (fetchedHotels) {
        setHotels(fetchedHotels);
      }else{
        axios.get(`https://c574-205-254-163-115.ngrok-free.app/api/locations/hotels/${cityName}`)
        .then(response => {
          const hotelsWithMeals = response.data.map(hotel => ({
            ...hotel,
            meals: hotel.meals || [],
          }));
          setHotels(hotelsWithMeals);
        })
        .catch(error => {
          console.error("Error fetching hotel details and meals:", error);
          setHotels([]); 
        });
      }  
    }
  }, [location.state]);
  
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <Fragment>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} onClose={hideCartHandler} />
        <MealsSummary />
        <AvailableMeals hotels={hotels} onHotelSelect={handleHotelSelect} selectedHotel={selectedHotel} />
      </CartProvider>
    </Fragment>
  );
};

export default Meals;
