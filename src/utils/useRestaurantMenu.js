import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const jsonData = await data.json();
    setResInfo(jsonData);
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return resInfo;
};

export default useRestaurantMenu;
