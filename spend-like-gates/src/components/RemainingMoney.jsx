import React from 'react'

import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from "react-redux"

function RemainingMoney() {

    const { money } = useSelector(state => state.wallet)

    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            xs={12}
            sx={{ position: "sticky", top: 0, paddingY: 2, zIndex: 9999, background: "linear-gradient(180deg,#2ecc71,#1abc9c)" }}
        >
            <span >{money}</span>
        </Grid>
    )
}

export default RemainingMoney