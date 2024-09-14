import { CDN_URL } from "../utils/constants";

const RestrantCard = (props) => {
  const { resName, cuisines, avgRating, deliveryTime, costForTwo, img_id } = props.resData;

  // Safely parse costForTwo, fallback to 0 if not available
  const parsedCostForTwo = Number(costForTwo?.split('for')[0]?.replace(/[^\d]/g, '')) / 100 || 0;

  return (
    <div className="card h-100 shadow-sm" style={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
      {/* Restaurant Image */}
      <img
        className="card-img-top"
        src={CDN_URL + img_id}
        alt={resName}
        style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      />

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title text-primary">{resName}</h5>
        <p className="card-text text-muted">
          {cuisines.join(", ")}
        </p>
        <div className="card-text">
          <p><strong>Rating:</strong> ⭐ {avgRating || "N/A"}</p>
          <p><strong>Delivery Time:</strong> {deliveryTime ? `${deliveryTime} minutes` : "N/A"}</p>
          <p><strong>Cost for Two:</strong> ₹{parsedCostForTwo.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default RestrantCard;
