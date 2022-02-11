import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap'

import './custom.scss'
import "./index.css"

import ChatApp from "./ChatApp"

const TestPage = () => {
    return (<div>
        <ChatApp/>
    </div>)
}

ReactDOM.render(
        <TestPage />, document.getElementById("root")
);