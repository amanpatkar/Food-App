import RestrantCard from "./RestrantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import {Link} from 'react-router-dom'


const Body = () => {
  //Local state  var - Super Powerful Var

  const [listOfRestraunts, setListOfRestraunts] = useState([]);
  const [filteredRestraunt,setFilteredRestraunt] = useState([]);
  const [searchText,setSearchText]  = useState("")
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let reqData = [];
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    json.data.cards[1]?.["card"]?.["card"]?.["gridElements"]?.["infoWithStyle"]?.["restaurants"]?.map((res) => {
      let obj = {};
      if(res.info.name != 'Faasos - Wraps, Rolls & Shawarma'){
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
  return listOfRestraunts.length == 0 ? (<Shimmer/>) : (
    <div className="body">
      <div className="filter">
        <div className="search-container">
        <input className = "search-box" value ={searchText} onChange = {(e)=>setSearchText(e.target.value)}type="text"></input>
          <button className="btn-search" onClick={()=>{
            const searchTextToLowerCase = searchText.toLowerCase();
            const filteredList = listOfRestraunts.filter((res)=>res.resName?.toLowerCase()?.includes(searchTextToLowerCase));
            setFilteredRestraunt(filteredList);
          }}>Search</button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            //Filter logic
            const filteredList = listOfRestraunts.filter(
              (res) => res.avgRating > 4.5
            );
            setFilteredRestraunt(filteredList);
          }}
        >
          Top Rated Restraunts
        </button>
        <button className="reset-btn"
          onClick={() => setFilteredRestraunt(listOfRestraunts)}>
          Reset List
        </button>
      </div>
      <div className="res-container">
        {/* Retraunt-Cards */}
        {filteredRestraunt.map((res) => {
          return <Link key={res.id} to={'/restraunt/' + res.id}><RestrantCard resData={res} /></Link>;
        })}
      </div>
    </div>
  ) 

};
export default Body;
