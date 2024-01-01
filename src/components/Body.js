import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";

const Body = () => {
  const [originalData, setOriginalData] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterButtonText, setFilterButtonText] = useState(
    "Show Top Rated Restaurants"
  );
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const jsonData = await response.json();
      setOriginalData(
        jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setListOfRestaurants(
        jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
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
        setListOfRestaurants(originalData);
        setFilterButtonText("Show Top Rated Restaurants");
      } else {
        // If not filtered, filter the data
        const filteredResList = listOfRestaurants.filter(
          (res) => res.info.avgRating > 4
        );
        setListOfRestaurants(filteredResList);
        setFilterButtonText("Show All Restaurants");
      }

      setIsFiltered(!isFiltered);
    } catch (error) {
      console.error("Error handling filter click:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      {/* <div className="search">
        <input type="text" id="searchBox" placeholder="Search your taste..." />
        <button className="search-btn">Search</button>
      </div> */}
      <div className="filter">
        <button
          onClick={handleFilterClick}
          className="filter-btn"
          disabled={loading}
        >
          {filterButtonText}
        </button>
      </div>
      <div className="res-container">
        {loading ? (
          <Shimmer />
        ) : (
          listOfRestaurants.map((res) => (
            <RestaurantCard key={res.info.id} resData={res} />
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
