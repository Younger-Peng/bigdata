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

    handleMouseEnter(province, event) {
        this.setState({
            province,
            hover: true,
            left: event.nativeEvent.screenX,
            right: event.nativeEvent.screenY
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
                    <div style={Object.assign({}, infoStyle, {left: `${this.state.left + 50}px`, top: `${this.state.right}px`})}>
                        <p>省：{this.state.province}</p>
                        <p>用户总数：{100}</p>
                        <p>教师数量：{1111}</p>
                        <p>学生数量：{11111}</p>
                        <p>试题总数：{111}</p>
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
    border: '4px solid yellow',
    borderRadius: 8,
    background: 'rgba(0,0,0,1)',
    boxShadow: '0 0 4px yellow',
    color: '#fff',
    fontSize: 12,
    paddingLeft: 10
}
