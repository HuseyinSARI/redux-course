import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// #region ----------- MUI imports ------------------------
import {
  Button,
  CssBaseline, //resetCSS
  Box,
  Container,
  Paper,
  styled
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
// #endregion ---------------------------------------------

import { buy, sell } from "./redux/walletSlice";
import ProductCard from './components/ProductCard';
import products from './data/products';
import Banner from './components/Banner';
import RemainingMoney from './components/RemainingMoney';
import ItemsTable from './components/ItemsTable';
import Receipt from './components/Receipt';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {

  const dispatch = useDispatch();
  const { money, cart } = useSelector(state => state.wallet)

  useEffect(() => {
    console.log("cart : ", cart);
    console.log("money : ", money);
  }, [cart, money])

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingY: 3 }}>
        <Grid container spacing={3}>

          <Banner/>

          <RemainingMoney />

          <ItemsTable />

          <Receipt /> 

        </Grid>
      </Container>
    </>
  );
}

export default App;
