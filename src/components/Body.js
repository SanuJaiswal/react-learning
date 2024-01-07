import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantData from "../utils/useRestaurantData";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterButtonText, setFilterButtonText] = useState(
    "Show Top Rated Restaurants"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, originalData } = useRestaurantData();

  useEffect(() => {
    setFilteredListOfRestaurants(originalData);
  }, [originalData]);

  const handleFilterClick = () => {
    try {
      if (isFiltered) {
        setFilteredListOfRestaurants(originalData);
        setFilterButtonText("Show Top Rated Restaurants");
      } else {
        const filteredResList = originalData.filter(
          (res) => res.info.avgRating > 4
        );
        setFilteredListOfRestaurants(filteredResList);
        setFilterButtonText("Show All Restaurants");
      }

      setIsFiltered(!isFiltered);
    } catch (error) {
      console.error("Error handling filter click:", error);
    }
  };

  const debounce = (fn, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleSearch = (searchTerm) => {
    const searchedRestaurant = originalData.filter((res) =>
      res.info.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListOfRestaurants(searchedRestaurant);
  };

  const debouncedSearch = debounce(handleSearch, 200);

  const handleInputSearch = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
  };

  useEffect(() => {
    if (searchTerm) debouncedSearch(searchTerm);
    else setFilteredListOfRestaurants(originalData);
  }, [originalData, searchTerm]);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl">
          <span className="text-red-600 font-extrabold">OOPS!</span> Seems you
          are offline 📴
        </h1>
      </div>
    );

  return (
    <div className="mt-4 p-8 bg-gray-200">
      <div className="flex gap-20">
        <div className="search">
          <input
            type="text"
            className="w-96 py-2 outline-none border-b border-gray-300 bg-transparent transition-shadow duration-300 focus:shadow-outline-color-custom"
            // className="w-96 p-2 outline-none border-b border-solid border-gray-300 bg-transaprent transition-shadow duration-300 focus:shadow-outline-color-custom"
            id="searchBox"
            placeholder={" Search your taste..."}
            value={searchTerm}
            onChange={handleInputSearch}
          />
        </div>
        <div className="filter">
          <button
            onClick={handleFilterClick}
            className="text-black cursor-pointer p-2 text-base border-2 border-solid border-gray-300 rounded hover:bg-eca854 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {filterButtonText}
          </button>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-y-32 gap-x-12 p-16">
        {loading ? (
          <Shimmer />
        ) : (
          filteredListOfRestaurants.map((res) => (
            <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
              <RestaurantCard resData={res} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
