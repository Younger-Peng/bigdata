/*
* @Author: liucong
* @Create By:   2017-10-13 09:41:26
*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./ChineseMap";

const rootEle = document.getElementById("root");
ReactDOM.render(<App />, rootEle);

if (module.hot) {
    // Capture hot update
    module.hot.accept("./App", () => {
        const NextApp = require("./App.js").default;
        ReactDOM.render(<NextApp />, rootEle);
    });
}
