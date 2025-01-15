import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import resList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [listOfRestaurant, setListOfRestaurant] = useState(resList);
    const [filteredRestaurant, setFilteredRestaurant] = useState(resList);

    const [searchText, setSearchText] = useState("");
    const {loggedInUser, setUserInfo} = useContext(UserContext);

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5440085&lng=77.3561307&collection=83633&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null");

        // const json = await data.json();
        // for (var i=0; i<json.data.cards.length; i++) {
        //     setListOfRestaurant(json?.data?.cards[i]);
        //     setFilteredRestaurant(json?.data?.cards[i]);
        // }
    };
        
    const onlineStatus = useOnlineStatus();

    if (onlineStatus == false) 
        return (
            <h1>Please check your internet connection.</h1>
        );

    return listOfRestaurant.length == 0 ? <Shimmer /> : ( 
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4 flex items-center">
                    <input type="text" className="border border-solid border-black" value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                    onClick={() => {
                        const filteredRestaurant = listOfRestaurant.filter(
                            (res) => res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurant(filteredRestaurant);
                    }}>Search</button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <label>UserName: </label>
                    <input className="border border p-2" type="text"
                        value={loggedInUser}
                        // onChange={(e) => setUserInfo(e.target.value)}
                    />
                </div>
                <div className="px-4 py-2 bg-grey-100 rounded-lg">
                    <button className="px-4 py-2 bg-grey-100 rounded-lg mt-10"
                    onClick={() => {
                        const filteredList = listOfRestaurant.filter(
                            (res) => res.card.card.info.avgRating > 4
                        );
                        setListOfRestaurant(filteredList);
                    }}>
                        Top Rated Restaurants
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap rounded-lg">
                {filteredRestaurant.map((restaurant) => (  
                    <Link 
                        key = {restaurant.card.card.info.id} 
                        to={"/restaurants/"+restaurant.card.card.info.id}
                    >
                        {
                            restaurant.card.card.info.promoted ? (
                                <RestaurantCardPromoted resData={restaurant} />
                            ) : (
                                <RestaurantCard resData={restaurant} /> 
                            )                       
                        }
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;