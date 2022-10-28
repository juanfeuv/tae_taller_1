import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '../../components/Table';
import callMethod from '../../callMethod';

const Home = () => {

  useEffect(() => {
    callMethod('getColleges', { test: 'hello' })
      .then(res => console.log(res));
  }, [])

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Button variant="contained">Filtros de búsqueda</Button>
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
