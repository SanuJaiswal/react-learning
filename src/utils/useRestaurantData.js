import { useState, useEffect } from "react";

const useRestaurantData = () => {
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const jsonData = await response.json();

      setOriginalData(
        jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting your location:", error.message);
          alert(
            "Please allow access of your location to get the restaurants near you"
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  return { loading, originalData };
};

export default useRestaurantData;
