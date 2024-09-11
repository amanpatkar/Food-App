import { CDN_URL } from "../utils/constants";
const RestrantCard = (props) => {
    const { resName, cuisines, avgRating, deliveryTime, costForTwo, img_id } =
      props.resData;
    return (
      <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
        <div className="res-logo-container">
          <img
            className="res-logo"
            src={CDN_URL + img_id}
          ></img>
        </div>
        <h3>{resName}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>Rating: {avgRating}</h4>
        <h4>Delivery Time: {deliveryTime} minutes</h4>
        <h4>{costForTwo}</h4>
      </div>
    );
  };
  export default RestrantCard;