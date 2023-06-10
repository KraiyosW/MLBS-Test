import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    getGenderOfPeopleDataFromDB();
    getCountryOfPeopleDataFromDB();
  }, []);

  const getGenderOfPeopleDataFromDB = async () => {
    const response = await axios.get("http://localhost:4000/people");
    const filterGender = response.data.data.reduce((accumulate, currentGender) => {
      accumulate.add(currentGender.gender);
      return accumulate;
    }, new Set());

    const uniqueGenders = [...filterGender];
    setGender(uniqueGenders);
  };

  const getCountryOfPeopleDataFromDB = async () => {
    const response = await axios.get("http://localhost:4000/people");
    const filterCountry = response.data.data.reduce((accumulate, currentCountry) => {
      accumulate.add(currentCountry.country);
      return accumulate;
    }, new Set());

    const uniqueCountry = [...filterCountry];
    setCountry(uniqueCountry);
  };

  const handleGenderClick = (item) => {
    if (selectedGenders.includes(item)) {
      setSelectedGenders(selectedGenders.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedGenders([...selectedGenders, item]);
    }
  };

  const handleCountryClick = (item) => {
    if (selectedCountries.includes(item)) {
      setSelectedCountries(selectedCountries.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedCountries([...selectedCountries, item]);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-red-500 via-yellow-500 to-blue-500">
      <h1 className="mt-[16px] text-center text-[4rem] text-white font-bold">People Data</h1>
      <div className="flex flex-row flex-wrap justify-center mt-[2rem]">
        {gender.map((item, index) => {
          const isSelected = selectedGenders.includes(item);
          return (
            <button
              className={`w-[120px] h-[60px] mr-[2rem] rounded-[5px] text-gray-50 ${
                isSelected ? "bg-fuchsia-500" : "bg-violet-400"
              } text-text-pink-700`}
              key={index}
              onClick={() => handleGenderClick(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex flex-row flex-wrap justify-center mt-[2rem]">
        {country.map((item, index) => {
          const isSelected = selectedCountries.includes(item);
          return (
            <button
              className={`w-[120px] h-[60px] mr-[2rem] rounded-[5px] text-gray-50 ${
                isSelected ? "bg-fuchsia-500" : "bg-violet-400"
              } text-text-pink-700`}
              key={index}
              onClick={() => handleCountryClick(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
