import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { MENU_API, useRestaurantMenu } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    // const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams();

    /**
     * Custom hook
     */
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(0);

    // useEffect(() => {
    //     fetchMenu();
    // }, []);

    // const fetchMenu = async () => {
    //     const data = await fetch(MENU_API + resId);
    //     const json = await data.json();
    //     setResInfo(json.data);
    // }

    if (resInfo == null ) return <Shimmer />;

    const {name,
        cuisines,
        costForTwoMessage
    } = resInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => c.card?.['card']?.['@type'] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    return (
        <div className="text-center">
            <h1 className="font-bold my-6">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} : {costForTwoMessage}</p>
            { /** categories accordians */}
            {categories.map((category, index) => (
                <RestaurantCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card} 
                    showItems={index == showIndex && true}
                    setShowIndex ={() => setShowIndex(index)}
                />
            ))}
        </div>
    );
};
export default RestaurantMenu;