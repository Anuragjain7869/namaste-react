import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnLoginName, setBtnLoginName] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
// Subscribing to the store using a selector
    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg sm: bg-green-50 lg">
            <div className="logo-container">
                <img className="w-24" src={LOGO_URL} />
            </div>  
            <div className="flex items-center">
                <ul className="flex p-4 m-4 list-none">
                    <li className="px-4">Online Status: {onlineStatus ? "true" : "false"}</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="contact">Contact Us</Link></li>
                    <li className="px-4"><Link to="grocery">Grocery</Link></li>
                    <li className="px-4 font-bold text-xl"><Link to="cart">Cart - ({cartItems.length} items)</Link></li>
                    <button className="login"
                        onClick={() => {btnLoginName == 'Login' 
                            ? setBtnLoginName("Logout")
                            : setBtnLoginName("Login")
                        }}
                    >{btnLoginName}</button>
                    <li className="px-4 font-bold">{ loggedInUser }</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;