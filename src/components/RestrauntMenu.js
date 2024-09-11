import { useEffect, useState } from "react";
import { RES_INFO } from "../utils/constants";
import {useParams} from 'react-router-dom'

import Shimmer from "./Shimmer";
//Since we only went to call use effect on initial render hemnce we are passing empty arrray as depedenct array
const RestrauntMenu = () => {
  const [restrauntInfo, setRestrauntInfo] = useState(null);
  const [menu,setMenu] = useState([]);
  const {resId} = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
        RES_INFO + resId
    );
    const json = await data.json();
    const resMenu = json.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card.card.itemCards.map(item=>item.card.info)
    setRestrauntInfo(json?.data?.cards[2]?.card?.card?.info);
    setMenu(resMenu);
  };
  return restrauntInfo == null ? (
    <Shimmer />
  ) : (
    <div className="restraunt-info-container">

      <h1>{restrauntInfo.name}</h1>
      <h2>Menu</h2>
      <ul>
        {menu.map(menuItem=>{
            return(<li key={menuItem.id}>{menuItem.name} || Rs. {menuItem.price/100 || '-'}</li>)
        })}
      </ul>
    </div>
  );
};
export default RestrauntMenu;
