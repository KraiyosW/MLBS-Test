import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  useEffect(() => {
    getDataOfPeopleFromDB(filterData());
  }, [selectedGenders, selectedCountries, isFiltering, keywords, currentPage]);

  const getDataOfPeopleFromDB = async () => {
    const response = await axios.get("http://localhost:4000/people");

    const filterGender = response.data.data.reduce((accumulate, currentGender) => {
      accumulate.add(currentGender.gender);
      return accumulate;
    }, new Set());

    const uniqueGenders = [...filterGender];
    setGender(uniqueGenders);

    const filterCountry = response.data.data.reduce((accumulate, currentCountry) => {
      accumulate.add(currentCountry.country);
      return accumulate;
    }, new Set());

    const uniqueCountry = [...filterCountry];
    setCountry(uniqueCountry);

    const getAllDataOfPeople = response.data.data;
    setAllData(getAllDataOfPeople);
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

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setKeywords(value);
    setIsFiltering(value !== "");

    if (value !== "") {
      setSelectedGenders([]);
      setSelectedCountries([]);
    }
  };

  const handleClearFilter = (event) => {
    event.preventDefault();
    setSelectedGenders([]);
    setSelectedCountries([]);
    setKeywords("");
  };

  const filterData = () => {
    let filteredData = allData;

    if (selectedGenders.length > 0) {
      filteredData = filteredData.filter((item) => selectedGenders.includes(item.gender));
    }

    if (selectedCountries.length > 0) {
      filteredData = filteredData.filter((item) => selectedCountries.includes(item.country));
    }

    if (isFiltering) {
      const lowercaseKeywords = keywords.toLowerCase();
      filteredData = filteredData.filter((item) => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        return fullName.includes(lowercaseKeywords);
      });
    }

    const totalPageCount = Math.ceil(filteredData.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    filteredData = filteredData.slice(startIndex, endIndex);

    return { filteredData, totalPageCount };
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { filteredData, totalPageCount } = filterData();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#EFC8EE]">
      <h1 className="mt-[16px] text-center text-[4rem] text-white font-bold">People Data</h1>
      <div className="flex flex-row flex-wrap justify-center mt-[32px]">
        {gender.map((item, index) => {
          const isSelected = selectedGenders.includes(item);
          return (
            <button
              className={`w-[120px] h-[60px] mr-[32px] rounded-[5px] text-gray-50 ${
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
      <div className="flex flex-row flex-wrap justify-center mt-[32px]">
        {country.map((item, index) => {
          const isSelected = selectedCountries.includes(item);
          return (
            <button
              className={`w-[120px] h-[60px] mr-[32px] rounded-[5px] text-gray-50 ${
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
        <form className=" w-auto flex flex-row items-center">
          <input
            className="w-[200px] h-[60px] flex flex-row items-center border-solid rounded-[5px] mr-[5px] border-violet-600"
            id="keywords-text"
            name="keywordsText"
            placeholder="Search"
            onChange={handleKeywordChange}
            value={keywords}
          />
          <button className="text-cyan-400 hover:text-rose-600" onClick={handleClearFilter}>CLEAR</button>
        </form>
      </div>
       <div className="container1">
        <div className="w-90 flex flex-row items-center flex-wrap  bg-[#EFC8EE]">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4">
              {filteredData.map((item, index) => {
                return (
                  <div className="w-[350px] h-[400px] flex flex-col items-center shadow-md bg-white" key={index}>
                    <img className="w-[350px] h-[250px]" src={item.image} alt={`${item.first_name} ${item.last_name}`} />
                    <p className="text-gray-600 opacity-70 mt-3">{item.first_name} {item.last_name}</p>
                    <p className="text-gray-600 opacity-100 mt-1">{item.gender}</p>
                    <p className="text-gray-600 opacity-100 mt-1">{item.email}</p>
                    <p className="text-gray-600 opacity-100 mt-1">{item.country}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-4">No matching results found.</p>
          )}
         </div>
        </div> 
      <div className="flex justify-center pt-4 bg-[#EFC8EE]">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-gray-600 mr-[1rem]">
            Page {currentPage} of {totalPageCount}
          </p>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md "
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPageCount}
          >
            Next
          </button>
        </div>

    </div>
  );
}

export default App;