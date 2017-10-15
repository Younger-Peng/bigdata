import React from 'react';
import Map from './components/Map.jsx';
import './dist/map.css'

class ChineseMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            target: ''
        }
    }

    handleOnclick(target) {
        console.log('you clicked ', target)
    }

    render() {
        return (
            <div>
                <Map handleOnclick={this.handleOnclick.bind(this)} />
            </div>
        )
    }
}

export default ChineseMap
