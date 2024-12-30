import React from "react";
import ReactDOM from "react-dom/client";
import { jsx } from "react/jsx-runtime";

const Title = () => (<h1 className="head" tabIndex="5">
    Namaste React Using JSX
    </h1>);

const HeadingComponent = () => (
    <div class="container">
        <Title />
        <h1 className="Heading">React Functional Component</h1>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);