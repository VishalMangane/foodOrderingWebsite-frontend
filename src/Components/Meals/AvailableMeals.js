import React, { useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Hamburger",
    description: "The Classic Burger",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Fried chicken",
    description: "Special crispy chicken.",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = ({ hotels, onHotelSelect, selectedHotel }) => {
  const [expandedHotelId, setExpandedHotelId] = useState(null);

  const handleHotelClick = (hotel) => {
    onHotelSelect(hotel);
    setExpandedHotelId(expandedHotelId === hotel.id ? null : hotel.id);
  };

  const mealsToDisplay = selectedHotel ? selectedHotel.meals : DUMMY_MEALS;

  return (
    <section className={classes.meals}>
      <Card>
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <div key={hotel.id} className={classes.hotelSection}>
              <div
                className={classes.hotelHeader}
                onClick={() => handleHotelClick(hotel)}
              >
                <h2>{hotel.name}</h2>
                <p>{hotel.address}</p>
                <button className={classes.dropdownButton}>
                  {expandedHotelId === hotel.id ? (
                    <FontAwesomeIcon icon={faChevronUp} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                  )}
                </button>
              </div>
              {expandedHotelId === hotel.id && (
                <ul className={classes.mealsList}>
                  {hotel.meals.length > 0 ? (
                    hotel.meals.map(meal => (
                      <MealItem
                        id={meal.id}
                        key={meal.id}
                        name={meal.name}
                        description={meal.description}
                        price={meal.price}
                      />
                    ))
                  ) : (
                    <p>No meals available</p>
                  )}
                </ul>
              )}
            </div>
          ))
        ) : (
          <ul>
            {mealsToDisplay.length > 0 ? (
              mealsToDisplay.map(meal => (
                <MealItem
                  id={meal.id}
                  key={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              ))
            ) : (
              <p>No meals available</p>
            )}
          </ul>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
