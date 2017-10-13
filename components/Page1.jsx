import React from 'react'


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullScreen: false
        }
    }

    toggleFullScreen() {

        var elem = this.target
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

    render() {
        var background = {
            backgroundSize: 'contain',
            background: `url(/imgs/img${this.props.pageNum}.png) no-repeat center center`
        }
        return (
            <div ref={el => this.target = el} style={Object.assign({}, background, {position: 'relative', width: '100%', height: '100vh', backgroundColor: '#ddd', display: 'flex', boxSizing: 'border-box', borderBottom: '1px solid black'})}>
                <h1 style={{margin: 'auto'}} >{this.props.content}</h1>
                <button style={{position: 'absolute', top: 20, right: 20, padding: '5px 10px', borderRadius: '5px', background: 'transparent', borderStyle: 'none', cursor: 'pointer', outline: 'none', fontSize: 14}}  onClick={this.toggleFullScreen.bind(this)}><i style={{fontSize: 30, color: '#777'}} className='icon iconfont icon-full-screen'></i></button>
            </div>
        )
    }
}

export default Page
