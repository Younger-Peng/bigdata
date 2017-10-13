/*
* @Author: liucong
* @Create By:   2017-10-13 11:21:38
*/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import Page from "./components/Page1.jsx";
import './master.css';
import './fonts/iconfont.css'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [1,2,3,4,5,6,7]
        }
    }

    render() {
        return (
            <div>
            {
                _.map(this.state.pages, (page, index) => {
                    return <Page key={`Page${page}`} content={`Page${page}`} pageNum={page} />
                })
            }
            </div>
        )
    }

}
export default Demo;
