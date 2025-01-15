import React from "react";
import User from "./User";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo : {
                name: "Dummy",
                location: "Default",
            },
        };
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/ezmobius");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });
    }

    componentDidUpdate() {
        console.log("Update");
    }

    componentWillUnmount() {
        console.log("Unmount");
    }

    render () {
        // const {name, location} = this.props;
        const {name, location, avatar_url} = this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: 9536230187</h4>
            </div>
        ); 
    }
}
export default UserClass;