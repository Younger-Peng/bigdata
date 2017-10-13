/*
* @Author: liucong
* @Create By:   2017-10-13 11:21:38
*/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from 'lodash';
import Page from "./components/Page.jsx";
import './master.css';
import './fonts/iconfont.css'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.screenHeight = window.innerHeight
        this.state = {
            marginTop: 0,
            fullScreen: false,
            pages: [1, 2, 3, 4, 5, 6, 7],
            currentPage: 1
        }
        this.initEvent()
    }

    initEvent() {
        document.addEventListener('webkitfullscreenchange', () => {
            this.setState({
                ...this.state,
                fullScreen: !this.state.fullScreen,
                marginTop: 0,
                currentPage: 1
            })
        })
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


    }

    goNextPage() {
        this.screenHeight = window.innerHeight
        this.setState({
            ...this.state,
            marginTop: this.state.marginTop - this.screenHeight,
            currentPage: this.state.currentPage + 1
        })
    }

    goPrePage() {
        this.screenHeight = window.innerHeight
        debugger;
        this.setState({
            ...this.state,
            marginTop: this.state.marginTop + this.screenHeight,
            currentPage: this.state.currentPage - 1
        })
    }

    render() {
        return (
            <div id="container" style={{marginTop: this.state.marginTop }}>
                {
                    _.map(this.state.pages, (page, index) => {
                        return <Page key={`Page${page}`} content={`Page${page}`} pageNum={page} />
                    })
                }
                {
                    this.state.fullScreen ? null : <button style={{position: 'fixed', bottom: 20, right: 20, padding: '5px 10px', borderRadius: '5px', background: 'transparent', borderStyle: 'none', cursor: 'pointer', outline: 'none', fontSize: 14}}  onClick={this.toggleFullScreen.bind(this)}><i style={{fontSize: 30, color: '#777'}} className='icon iconfont icon-full-screen'></i></button>
                }
                {
                    this.state.fullScreen && 1 < this.state.currentPage ? <i onClick={this.goNextPage.bind(this)} className='icon iconfont icon-down' style={{position: 'fixed', top: 30, left: '50%', transform: 'translateX(-50%) rotate(180deg)', fontSize: 30, color: '#555', cursor: 'pointer'}} onClick={this.goPrePage.bind(this)}></i> : null
                }
                {
                    this.state.fullScreen && this.state.currentPage < this.state.pages.length ? <i onClick={this.goNextPage.bind(this)} className='icon iconfont icon-down' style={{position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)', fontSize: 30, color: '#555', cursor: 'pointer'}} onClick={this.goNextPage.bind(this)}></i> : null
                }
            </div>
        );
    }
}
export default Demo;
