import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
    constructor(pros) {
        super(pros);
    }

    componentDidMount() {
        console.log("Component Did Mount");
    }

    render() {
        return (
            <div>
                <h1>About Us Page</h1>
                <div>
                    Logged in User:
                    <UserContext.Consumer>
                        {({loggedInUser}) => (
                            <h1 className="text-xl font-bold">{loggedInUser}</h1>
                        )}
                    </UserContext.Consumer>
                </div>
                <UserClass name={"Anurag Jain (Class)"} location={"Noida class"}/>
            </div>
        );
    }
    
}
export default About;