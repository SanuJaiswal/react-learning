import React, { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const jsonData = await data.json();
    setResInfo(jsonData);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (resInfo === null) {
    return <Shimmer />;
  }
  const { name, cuisines, avgRating, sla } =
    resInfo?.data?.cards[0]?.card?.card?.info;

  let itemCards =
    resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards;
  if (itemCards === undefined) {
    itemCards =
      resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
        ?.card?.card?.categories[0]?.itemCards;
  }

  return (
    <div className="menu">
      <h3>{name}</h3>
      <p className="cuisines">{cuisines.join(", ")}</p>
      <h3>
        ✡️{avgRating} - {sla.slaString}
      </h3>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} ➡️{" "}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
