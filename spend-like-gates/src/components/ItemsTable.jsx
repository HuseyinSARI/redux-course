import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import products from '../data/products';
import ProductCard from './ProductCard';



function ItemsTable() {


    return (
        products.map(item => {
            return (
                <Grid key={item.id} xs={4}>
                    <ProductCard item={item} />
                </Grid>
            )
        })
    )

}

export default ItemsTable