import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CDN_URL } from "../utils/constants";
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { resId } = useParams(); // Assuming you are passing product id in the URL.
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCart, setAddToCart] = useState(false); // State for managing cart
  const [quantity, setQuantity] = useState(1); // State for quantity management
  let reqData = [];
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductData();
  }, []); // Add id to dependency array to refetch if id changes

  const fetchProductData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      json.data.cards[1]?.["card"]?.["card"]?.["gridElements"]?.["infoWithStyle"]?.["restaurants"]?.forEach((res) => {
        let obj = {};
        if (res.info.name !== 'Faasos - Wraps, Rolls & Shawarma') {
          obj["id"] = res.info.id;
          obj["resName"] = res.info.name;
          obj["cuisines"] = res.info.cuisines;
          obj["avgRating"] = res.info.avgRating;
          obj["deliveryTime"] = res.info.sla.deliveryTime;
          obj["costForTwo"] = res.info.costForTwo;
          obj["img_id"] = res.info.cloudinaryImageId;
          reqData.push(obj);
        }
      });

      let tempObj = {};
      reqData?.forEach((element) => {
        if (element.id === resId) {
          tempObj = element;
        }
      }) 
      setProductData(tempObj);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 const handleRedirect = async () => {
  navigate('/cart');
 }
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return productData ? (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <img
              src={CDN_URL + productData.img_id}
              className="card-img-top"
              alt={productData?.resName}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card-body">
            <h2 className="card-title text-primary">{productData.resName}</h2>
            <p className="card-text">{productData.description}</p>
            <p className="text-black">
              <strong>Rating:</strong>
              <strong className='rating'>
              ⭐ {productData.avgRating}
              </strong>
            </p>
            <h4 className="text-success">{productData.costForTwo}</h4>

            <div className="mt-4 d-flex">
              {!addToCart ? (
                <button
                  className="btn btn-success text-white btn-lg parentCart"
                  onClick={() => setAddToCart(true)} // Set to true when clicked
                >
                  Add to Cart
                </button>
              ) : (
                <div className="d-flex align-items-center parentCart justify-content-between">
                  <button
                    className="btn btn-success text-white btn-lg me-2"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))} // Decrement quantity, but no less than 1
                  >
                    <strong>-</strong>
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="btn btn-success text-white btn-lg ms-2"
                    onClick={() => setQuantity((prev) => prev + 1)} // Increment quantity
                  >
                    <strong>+</strong>
                  </button>
                </div>
              )}
              <div className=''>
              <button className="btn btn-warning text-white btn-lg ms-4" onClick={handleRedirect}>
               <strong>
                Go to Cart
               </strong>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Information */}
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="card p-3">
            <h5>Additional Information</h5>
            <ul>
              <li><strong>Cuisines:</strong> {productData.cuisines},</li>
              <li><strong>Delivery In:</strong> <strong className='text-success'>{productData.deliveryTime}</strong> minutes</li>
              <li><strong>In Stock:</strong> {productData.stock ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-5">
      <p>No product details available.</p>
    </div>
  );
};

export default ProductDetails;
