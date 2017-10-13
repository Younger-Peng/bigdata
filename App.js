/*
* @Author: liucong
* @Create By:   2017-10-13 11:21:38
*/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import Page from "./components/Page.jsx";
import './master.css'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.screenHeight = window.innerHeight
        this.state = {
            marginTop: 0,
            fullScreen: false,
            pages: [1, 2, 3, 4, 5, 6, 7]
        }
    }

    toggleFullScreen() {

        var elem = document.documentElement;
        if(this.state.fullScreen) {
            if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            }
        } else {
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
              elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
              elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
              elem.webkitRequestFullscreen();
            }
        }
        this.screenHeight = window.innerHeight

        this.setState({
            ...this.state,
            fullScreen: !this.state.fullScreen
        })
    }

    render() {
        return (
            <div id="container" style={{marginTop: this.state.marginTop, transition: 'margin-top 2s ease' }}>
                {
                    _.map(this.state.pages, (page, index) => {
                        return <Page key={`Page${page}`} content={`Page${page}`} pageNum={page} />
                    })
                }
                <button style={{position: 'fixed', bottom: 20, right: 20, padding: '5px 10px', borderRadius: '5px', background: 'transparent', borderStyle: 'none', cursor: 'pointer', outline: 'none', fontSize: 14}}  onClick={this.toggleFullScreen.bind(this)}>{this.state.fullScreen ? '退出全屏' : '全屏'}</button>

            </div>
        );
    }
}
export default Demo;
