import React, { useEffect } from 'react'
import { Stack, Box, Button, TextField } from "@mui/material"
import { buy, sell, buyNsellMore } from "../redux/walletSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';



function ProductCard({ item }) {

    const { id, image, productName, productPrice } = item
    const dispatch = useDispatch();
    const { money, cart } = useSelector(state => state.wallet)
    const [isBuyDisabled, setIsBuyDisabled] = useState(false);
    const [isSellDisabled, setIsSellDisabled] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const handleBuy = () => {
        dispatch(buy({ id }))
    }
    const handleSell = () => {
        dispatch(sell({ id }))
    }

    const handleTextField = (value) => {
        if (value <= 0) {
            setCartCount(0)
            dispatch(buyNsellMore({ id: id, quantity: 0 }))
        } else {
            dispatch(buyNsellMore({ id: id, quantity: value }))
        }
    }

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

    let buyButtonStyle = {};
    if (!isBuyDisabled) {
        buyButtonStyle = {
            color: "white", background: "linear-gradient(180deg,#2ecc71,#1abc9c)"
        }
    } else {
        buyButtonStyle = {
            color: "gray", background: "silver"
        }
    }

    let sellButtonStyle = {};
    if (!isSellDisabled) {
        sellButtonStyle = {
            color: "white", background: "linear-gradient(180deg,#f53b82,#f53b57)"
        }
    } else {
        sellButtonStyle = {
            color: "gray", background: "silver"
        }
    }



    return (
        <Stack
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
            className="rounded"
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
                <div className='text-2xl'  >
                    {productName}
                </div>

                <NumericFormat className='text-xl text-green-600' displayType="text" prefix={'$'} thousandSeparator="," value={productPrice} />

            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Button
                    disabled={isBuyDisabled}
                    onClick={(e) => handleBuy()}
                    sx={buyButtonStyle}
                >
                    Buy
                </Button>
                <TextField
                    value={cartCount}
                    onChange={e => handleTextField(e.target.value)}
                    sx={{ width: 120 }}
                    size='small'
                    type='number'
                >
                    0
                </TextField>
                <Button
                    disabled={isSellDisabled}
                    onClick={handleSell}
                    sx={sellButtonStyle}
                >
                    Sell
                </Button>
            </Stack>
        </Stack>
    )
}

export default ProductCard