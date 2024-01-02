import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";

const Body = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterButtonText, setFilterButtonText] = useState(
    "Show Top Rated Restaurants"
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const jsonData = await response.json();
      setOriginalData(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredListOfRestaurants(
        jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const handleSearch = () => {
    const searchedRestaurant = originalData.filter((res) =>
      res.info.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListOfRestaurants(searchedRestaurant);
  };

  const debouncedSearch = debounce(handleSearch, 300);

  const handleInputSearch = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
    if (!searchTermValue) {
      setFilteredListOfRestaurants(originalData);
    } else {
      debouncedSearch(searchTermValue);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <RestaurantCard key={res.info.id} resData={res} />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
