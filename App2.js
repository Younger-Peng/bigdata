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
            pages: [1,2,3,4,5,6,7],
            currentPage: 1
        }
    }

    changePage(index) {
        this.setState({
            ...this.state,
            currentPage: index+1
        })
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <div style={{width: 200, height: '100vh', overflow: 'auto', borderRight: '3px solid #aaa'}}>
                    {
                        _.map(this.state.pages, (page, index) => {
                            return (
                                <div className='page' onClick={this.changePage.bind(this, index)} key={index} style={{height: 100, margin: 10, display: 'flex', background: '#ccc'}}>
                                    <div style={{margin: 'auto', fontSize: 30}}>{page}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{flex: 1, overflow: 'hidden', height: '100vh'}}>
                    <Page key={`Page${this.state.currentPage}`} content={`Page${this.state.currentPage}`} pageNum={this.state.currentPage} />
                </div>
            </div>
        )
    }

}
export default Demo;
