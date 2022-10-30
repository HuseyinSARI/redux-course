import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';


function Banner() {
    return (
        <Grid
            xs={12}
            sx={{ paddingY: 4 , marginY:3 }}
            className="bg-white flex flex-col items-center gap-6 text-4xl"
        >

            <img
                src="https://neal.fun/spend/billgates.jpg"
                alt="bill gates pic"
                className='rounded-full w-32'
            />
            <p>Spend Bill Gates' Money</p>
        </Grid>
    )
}

export default Banner