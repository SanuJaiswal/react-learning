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
        // If already filtered, reset to the original data
        setFilteredListOfRestaurants(originalData);
        setFilterButtonText("Show Top Rated Restaurants");
      } else {
        // If not filtered, filter the data
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
      <div className="status-container">
        <h1 className="status-text">
          <span className="oops">OOPS!</span> It seems you are offline 📴
        </h1>
      </div>
    );

  return (
    <div className="body">
      <div className="options">
        <div className="search">
          <input
            type="text"
            id="searchBox"
            placeholder={" Search your taste..."}
            value={searchTerm}
            onChange={handleInputSearch}
          />
        </div>
        <div className="filter">
          <button
            onClick={handleFilterClick}
            className="filter-btn"
            disabled={loading}
          >
            {filterButtonText}
          </button>
        </div>
      </div>
      <div className="res-container">
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
