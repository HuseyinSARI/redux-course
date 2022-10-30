import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from "react-redux"
import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";


function RemainingMoney() {

    const { money } = useSelector(state => state.wallet)

    const countUpRef = useRef(null);

    const { update } = useCountUp({
        ref: countUpRef,
        start: 0,
        end: money,
        duration: 1,
        separator: ",",
        decimal: ".",
        prefix: "$",
    });

    useEffect(() => {
        update(money);
    }, [money, update]);

    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            xs={12}
            className = "rounded"
            sx={{ position: "sticky", top: 0, zIndex: 9999, background: "linear-gradient(180deg,#2ecc71,#1abc9c)" }}
        >

            <div className="text-4xl text-white p-2 font-bold ">

                <div ref={countUpRef} />
            </div>
        </Grid>
    )
}

export default RemainingMoney