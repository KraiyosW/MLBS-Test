import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [allData,setAllData] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [keywords,setKeywords] = useState("")

  useEffect(() => {
    getDataOfPeopleFromDB();
  }, []);

  const getDataOfPeopleFromDB = async () => {
    /// get data from database ///
    const response = await axios.get("http://localhost:4000/people");
    /// seperate gender ///
    const filterGender = response.data.data.reduce((accumulate, currentGender) => {
      accumulate.add(currentGender.gender);
      return accumulate;
    }, new Set());

    const uniqueGenders = [...filterGender];
    setGender(uniqueGenders);

    /// seperate country ///
    const filterCountry = response.data.data.reduce((accumulate, currentCountry) => {
      accumulate.add(currentCountry.country);
      return accumulate;
    }, new Set());

    const uniqueCountry = [...filterCountry];
    setCountry(uniqueCountry);

    /// get all data for generate card //
    const getAllDataOfPeople = response.data.data
    setAllData(getAllDataOfPeople)
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
                isSelected ? "bg-green-500" : "bg-sky-400"
              } text-text-pink-700`}
              key={index}
              onClick={() => handleCountryClick(item)}
            >
              {item}
            </button>
          );
        })}
        
      </div>
      <div className="container">
        <form className="flex flex-row items-center">
          <input
            className="w-[200px] h-[60px] flex flex-row justify-center rounded-[5px] mr-2 border-violet-600"
            id="keywords-text"
            name="keywordsText"
            placeholder="Search"
            // onChange={}
            // value={}
          />
          <button className="text-cyan-400 hover:text-rose-600">CLEAR</button>
        </form>
        </div>
        <div className="w-90 flex flex-row items-start flex-wrap ml-[13rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allData.map((item,index)=>{
            
            return(
             <div className="w-[350px] h-[400px] flex flex-col items-center shadow-md bg-white">
                  <img className="w-[350px] h-[250px]" src={item.image}/>
                  <p className="text-gray-600 opacity-[0.7] mt-3">{item.first_name} {item.last_name}</p>
                  <p className="text-gray-600 opacity-[1] mt-1">{item.gender}</p>
                  <p className="text-gray-600 opacity-[1] mt-1">{item.email}</p>
                  <p className="text-gray-600 opacity-[1] mt-1">{item.country}</p>
                </div>

            );
          })}
               </div>
            </div>
          </div>
  );
}

export default App;
