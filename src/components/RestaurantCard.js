import { CDN_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";


const RestaurantCard = (props) => {
    const { resData } = props;

    const { loggedInUser } = useContext(UserContext);

    const {
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwoMessage
    } = resData?.card?.card?.info;

    return (
        <div className="p-4 m-4 w-[180px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="rounded-lg w-[180px]" src={CDN_URL + cloudinaryImageId} alt="res-logo" />
            <h3 className="font-bold py-2">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} Starts</h4>
            <h4>{costForTwoMessage}</h4>
            <h4>User: {loggedInUser}</h4>
        </div>
    );
};

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white rounded-lg m-2 p-2">
                    Promoted
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;