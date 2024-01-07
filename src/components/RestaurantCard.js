import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, sla, cuisines } = resData?.info;
  return (
    <div className="h-64 w-72 transition-transform duration-50 ease-in-out hover:cursor-pointer hover:scale-95">
      <div className="h-52 w-full rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={CDN_URL + cloudinaryImageId}
          alt="Restaurant"
        />
      </div>
      <div className="mt-3 ml-1">
        <h3>{name}</h3>
        <h3>
          ✡️{avgRating} - {sla.slaString}
        </h3>
        <p className="text-cuisine">{cuisines.slice(0, 3).join(", ")}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
