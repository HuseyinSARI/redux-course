import React from 'react'

import { useSelector } from "react-redux";

function Counter() {

    const countValue = useSelector((state) => state.counter.value)

    console.log(countValue);

    return (
        <div>
            {countValue}
        </div>
    )
}

export default Counter