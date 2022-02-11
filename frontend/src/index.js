import React from "react";
import ReactDOM from "react-dom";

import Button from 'react-bootstrap/Button';
import 'bootstrap'
import './custom.scss'
import "./index.css"

const TestPage = () => {
    return (<div>
        <h1>Here's React for ya</h1>
        <Button variant={"secondary"}>Click me</Button>
    </div>)
}

ReactDOM.render(
        <TestPage />, document.getElementById("root")
);