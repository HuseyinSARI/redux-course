import React from 'react'

function Square({black}) {
    const fill = black ? 'black' : 'white'
    return <div style={{ backgroundColor: fill }} />
}

export default Square