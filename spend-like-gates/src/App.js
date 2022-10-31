// #region ----------- MUI imports ------------------------
import {
  CssBaseline, //resetCSS
  Container,
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
// #endregion ---------------------------------------------

import Banner from './components/Banner';
import RemainingMoney from './components/RemainingMoney';
import ItemsTable from './components/ItemsTable';
import Receipt from './components/Receipt';
import TradeMark from './components/TradeMark';

function App() {

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingY: 3 }}>
        <Grid container spacing={3}>

          <Banner/>

          <RemainingMoney />

          <ItemsTable />

          <Receipt /> 

          <TradeMark/>
        </Grid>
      </Container>
    </>
  );
}

export default App;
