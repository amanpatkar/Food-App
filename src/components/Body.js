import RestrantCard from "./RestrantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from 'react-router-dom';
import ProductDetails from "./productDetails";

const Body = () => {
  // Local state variables
  const [listOfRestraunts, setListOfRestraunts] = useState([]);
  const [filteredRestraunt, setFilteredRestraunt] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch restaurant data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetching restaurant data
  const fetchData = async () => {
    let reqData = [];
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
    setListOfRestraunts(reqData);
    setFilteredRestraunt(reqData);
  };

  // Rendering components
  return listOfRestraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search-container d-flex">
          <input
            className="search-box form-control m-3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search Restaurants"
          />
          <button
            className="btn-search btn btn-outline-success m-3"
            onClick={() => {
              const searchTextToLowerCase = searchText.toLowerCase();
              const filteredList = listOfRestraunts.filter((res) =>
                res.resName?.toLowerCase()?.includes(searchTextToLowerCase)
              );
              setFilteredRestraunt(filteredList);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn btn btn-outline-primary m-3"
          onClick={() => {
            const filteredList = listOfRestraunts.filter(
              (res) => res.avgRating > 4.5
            );
            setFilteredRestraunt(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button
          className="reset-btn btn btn-outline-danger m-3"
          onClick={() => setFilteredRestraunt(listOfRestraunts)}
        >
          Reset List
        </button>
      </div>
      <div className="res-container row m-4">
        {/* Restaurant Cards */}
        {filteredRestraunt.map((res) => {
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={res.id}>
              <Link to={'/restraunt/' + res.id} className="text-decoration-none">
                <RestrantCard resData={res} component={ProductDetails}/>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
