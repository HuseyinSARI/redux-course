import React, { useEffect, useRef } from 'react'
import { Stack, Box, Button, TextField } from "@mui/material"

import { buy, sell } from "../redux/walletSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';


function ProductCard({ item }) {

    const { id, image, productName, productPrice } = item
    const dispatch = useDispatch();
    const { money, cart } = useSelector(state => state.wallet)
    const [isBuyDisabled, setIsBuyDisabled] = useState(false);
    const [isSellDisabled, setIsSellDisabled] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const cartCountRef = useRef(0);


    const handleBuy = () => {
        dispatch(buy({ id }))
    }
    const handleSell = () => {
        dispatch(sell({ id }))
    }
    
    const handleTextField = (value) => {

        const newValue = Number(value);

        cartCountRef.current = cartCount
        const oldValue = cartCountRef.current;

        if (oldValue > newValue) {
            if (newValue <= 0) {
                setCartCount(0)
            } else {
                setCartCount(newValue)

            }
            console.log(("decrease"));
        } else {
            setCartCount(newValue)
            console.log("increase");
        }




    }

    // useEffect(()=>{
    // },[cartCount])

    useEffect(() => {

        if (money < productPrice) {
            setIsBuyDisabled(true);
        } else {
            setIsBuyDisabled(false);
        }

        let isInCart = cart.find((item) => item.id === id);
        if (isInCart) {
            setIsSellDisabled(false)
            setCartCount(isInCart.count)
        } else {
            setIsSellDisabled(true)
            setCartCount(0)
        }

    }, [cart])

    return (
        <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
            sx={{ backgroundColor: "white", padding: 4 }}
        >
            <Box>
                <img style={{ width: "100%", height: 200 }} alt={productName} src={image} />
            </Box>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Box>{productName}</Box>
                <Box>{productPrice}</Box>
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Button
                    disabled={isBuyDisabled}
                    onClick={(e) => handleBuy(Number(e.target.value))}
                    sx={{ color: "white", background: "linear-gradient(180deg,#2ecc71,#1abc9c)" }}
                >
                    Buy
                </Button>
                <TextField
                    value={cartCount}
                    onChange={e => handleTextField(e.target.value)}
                    sx={{ width: 80 }}
                    size='small'
                    type='number'
                >
                    0
                </TextField>
                <Button
                    disabled={isSellDisabled}
                    onClick={handleSell}
                    sx={{ color: "white", background: "linear-gradient(180deg,#f53b82,#f53b57)" }}
                >
                    Sell
                </Button>
            </Stack>
        </Stack>
    )
}

export default ProductCard