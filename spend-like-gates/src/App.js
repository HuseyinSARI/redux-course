import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// #region ----------- MUI imports ------------------------
import {
  Button,
  CssBaseline,
  Box,
  Container,
  Paper,
  styled
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
// #endregion ---------------------------------------------

import { buy, sell } from "./redux/walletSlice";


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


  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingY: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>Buraya Banner Gelecek</Item>
          </Grid>
          <Grid xs={12}>
            <Item>Buraya Kalan Para Gelecek</Item>
          </Grid>
          <Grid xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid xs={4}>
            <Item>xs=8</Item>
          </Grid>
          <Grid xs={12}>
            <Item>Buraya Cüzdan Gelecek</Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
