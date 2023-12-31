import CDN_URL from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, sla, cuisines } = resData?.info;
  return (
    <div className="res-card">
      <div className="res-img">
        <img src={CDN_URL + cloudinaryImageId} alt="Restaurant" />
      </div>
      <div className="res-details">
        <h3>{name}</h3>
        <h3>
          ✡️{avgRating} - {sla.slaString}
        </h3>
        <p className="cuisines">{cuisines.slice(0, 3).join(", ")}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
