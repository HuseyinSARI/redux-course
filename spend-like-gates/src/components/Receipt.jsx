import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import products from '../data/products';
import { useSelector } from "react-redux"


function Receipt() {

    const { cart } = useSelector(state => state.wallet)
    const [totalMoney, setTotalMoney] = useState(0)


    let total = 0;

    cart.map(item => {
        const { productPrice } = products.find(product => product.id === item.id)
        total += productPrice * item.count;
    })

    useEffect(() => {
        setTotalMoney(total)
    }, [cart])

    if (cart.length <= 0) {
        return;
    }


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            sx={{ backgroundColor: "white", margin: 2 }}
        >
            <Grid
                xs={7}
                textAlign="center"
                className="text-3xl"
            >
                <span> Your Receipt </span>
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                xs={4}
            >

                {
                    cart.map(item => {
                        const { productName, productPrice } = products.find(product => product.id === item.id)

                        return (
                            <Grid padding="6px" key={item.id} container className="text-base" xs={12}>
                                <Grid xs={8} >{productName}</Grid>
                                <Grid xs={1}>x{nFormatter(item.count, 0)}</Grid>
                                <Grid textAlign="right" paddingRight={0} xs={3}> ${nFormatter(productPrice * item.count, 2)}</Grid>
                            </Grid>
                        )
                    })
                }

                <Grid
                    container
                    sx={{ borderTop: 2, borderColor: "#2ecc71", padding: 0, margin: 0 }}
                    xs={12}>
                    <Grid xs={6}> Total Money</Grid>
                    <Grid textAlign="right" paddingRight={0} xs={6}> ${totalMoney.toLocaleString("en-US")}</Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default Receipt

function nFormatter(num, toFixed) {
    const format = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'b' },
        { value: 1e6, symbol: 'm' },
        { value: 1e3, symbol: 'k' },
        { value: 1, symbol: '' },
    ];
    const formatIndex = format.findIndex((data) => num >= data.value);

    return (num / format[formatIndex === -1 ? 6 : formatIndex].value).toFixed(toFixed) + format[formatIndex === -1 ? 6 : formatIndex].symbol;
}