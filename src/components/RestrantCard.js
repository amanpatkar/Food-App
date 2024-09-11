import { CDN_URL } from "../utils/constants";

const RestrantCard = (props) => {
  const { resName, cuisines, avgRating, deliveryTime, costForTwo, img_id } = props.resData;
 console.log("costForTwo",costForTwo);
  return (
    <div className="card h-100" style={{ backgroundColor: "#f0f0f0" }}>
      {/* Restaurant Image */}
      <img
        className="card-img-top"
        src={CDN_URL + img_id}
        alt={resName}
        style={{ height: "200px", objectFit: "cover" }}
      />

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">{resName}</h5>
        <p className="card-text">
          {cuisines.join(", ")}
        </p>
        <p className="card-text">
          <strong>Rating:</strong> {avgRating} <br />
          <strong>Delivery Time:</strong> {deliveryTime} minutes <br />
          <strong>Cost for Two:</strong> ₹{Number(costForTwo?.split('for')[0]?.split('₹')[1]) / 100}
        </p>
      </div>
    </div>
  );
};

export default RestrantCard;
