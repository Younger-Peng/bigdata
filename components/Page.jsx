import React from 'react'

const Page = ({content, pageNum}) => {
    var background = {
        backgroundSize: 'contain',
        background: `url(/imgs/img${pageNum}.png) no-repeat center center`
    }
    return (
        <div style={Object.assign({}, background, {width: '100%', height: '100vh', backgroundColor: '#ddd', display: 'flex', boxSizing: 'border-box', borderBottom: '1px solid black'})}>
            <h1 style={{margin: 'auto'}} >{content}</h1>
        </div>
    )
}

export default Page
