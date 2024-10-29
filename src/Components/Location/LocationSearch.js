import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from './Location.module.css';
import { useNavigate } from 'react-router-dom';
import locationIcon from '../../assets/location-icon.png'; 

const LocationSearch = ({ onCitySelect }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); 
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isCityValid, setIsCityValid] = useState(true); 

  useEffect(() => {
    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) {
      setSelectedCity(storedCity);
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (value.length > 0 && !isCitySelected) {
        try {
          const response = await axios.get(
            'https://c574-205-254-163-115.ngrok-free.app/api/locations/cities-suggested',
            { params: { query: value } }
          );
          setSuggestions(response.data);
          setIsCityValid(response.data.length > 0); 
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [value, isCitySelected]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setIsCitySelected(false);
    setIsCityValid(true); 
    if (e.target.value.length === 0) {
      setSuggestions([]);
    }
  };

  const handleSelect = async (cityName) => {
    setSuggestions([]);
    setValue(cityName);
    onCitySelect(cityName);
    localStorage.setItem('selectedCity', cityName); 
    setIsCitySelected(true);
    setIsCityValid(true); 
    
    try {
      const response = await axios.get(
        `https://c574-205-254-163-115.ngrok-free.app/api/locations/hotels/${cityName}`
      );
      const hotels = response.data;
      console.log("Hotels fetched:", hotels); 
      navigate('/meals', { state: { cityName, hotels } });
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <>
    {selectedCity && (
        <div className={classes.selectedCityContainer}>
          <img src={locationIcon} alt="Location icon" className={classes.locationIcon} />
          <div className={classes.selectedCity}>{selectedCity}</div>
        </div>
      )}
    <div className={classes.locationSearchContainer}>
      <input
        id="browser"
        list='browsers'
        type="text"
        placeholder="Enter your city..."
        value={value}
        onChange={handleInputChange}
        className={classes.input}
        autoComplete="off"
        />
      {suggestions.length > 0 && (
        <div className={classes.suggestionsList}>
          {suggestions.map((city, index) => (
            <option
              key={index}
              onClick={() => handleSelect(city)}
              className={classes.suggestion}
              >
              {city}
            </option>
          ))}
        </div>
      )}
      {!isCityValid && (
          <div className={classes.alertContainer}>
            <div className={classes.alertMessage}>
              Oops!... we'll not able to deliver at this location
            </div>
          </div>
      )}
      {value.length === 0 && !selectedCity && !isCitySelected && (
          <div className={classes.alertContainer}>
            <div className={classes.alertMessage}>
              Add the location to enjoy your meals, at your place!
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default LocationSearch;
