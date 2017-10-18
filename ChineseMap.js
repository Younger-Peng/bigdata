import React from 'react';
import Map from './components/Map.jsx';
import './dist/map.css'

class ChineseMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            province: '',
            hover: false,
            left: 0,
            right: 0
        }
    }

    handleOnclick(target) {
        console.log('you clicked ', target)
    }

    handleMouseEnter(item, index, event) {
        this.setState({
            province: item.province,
            hover: true,
            left: event.nativeEvent.screenX,
            right: event.nativeEvent.screenY,
            textX: item.textX,
            textY: item.textY,
            fill: item.fill,
            index
        })
    }

    handleMouseLeave() {
        this.setState({
            province: '',
            hover: false,
            left: 0,
            right: 0
        })
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                <Map handleOnclick={this.handleOnclick.bind(this)} handleMouseEnter={this.handleMouseEnter.bind(this)} handleMouseLeave={this.handleMouseLeave.bind(this)} />
                {
                    this.state.hover ?
                    <div style={Object.assign({}, infoStyle, {left: `${this.state.left + 80}px`, top: `${this.state.right}px`})}>
                        <p>区域：{this.state.province}</p>
                        <p>颜色：{this.state.fill}</p>
                        <p>X：{this.state.textX}</p>
                        <p>Y：{this.state.textY}</p>
                        <p>标号：{this.state.index}</p>
                    </div> :
                    ''
                }
            </div>
        )
    }
}

export default ChineseMap

var infoStyle = {
    position: 'absolute',
    width: 190,
    height: 150,
    border: '1px solid yellow',
    background: 'rgba(0,0,0,0.7)',
    boxShadow: 'inset 0 0 20px yellow',
    color: '#fff',
    fontSize: 12,
    paddingLeft: 10,
    transition: 'all 0.3s 0.1s ease'
}
