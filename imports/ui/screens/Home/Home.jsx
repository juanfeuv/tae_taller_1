import 'react-table/react-table.css'

import _ from "lodash";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import React, { useEffect, useState, useMemo } from "react";
import ReactTable from "react-table";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';

import callMethod from '../../callMethod';
import floatFormat from '../../floatFormat';
import GeoMap from '../../components/GeoMap/GeoMap';

const CURSOR_POINTER = { cursor: 'pointer' };

const Home = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState(0);

  const getColleges = (isMap) => {
    callMethod('getColleges', { isMap })
      .then(({ res }) => setList(res));
  };

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    getColleges(newValue === 0);
  };

  // const isMap = useMemo(() => value === 0, [value]);

  useEffect(() => {
    getColleges(value === 0);
  }, []);

  const Columns = [
    {
      Header: "Universidad",
      accessor: 'nombre',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Grupo Sugerido",
      accessor: 'grupo',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Costo Matrícula",
      accessor: 'costoMatricula',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={`$${floatFormat(row.value)}`}>
          <span style={CURSOR_POINTER}>
            {`$${floatFormat(row.value)}`}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Tipo",
      accessor: 'desOwnership',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Estado",
      accessor: 'desEstado',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Ciudad",
      accessor: 'ciudad',
      style: { textAlign: 'center' },
      Cell: (row) => (
        <Tooltip title={row.value}>
          <span style={CURSOR_POINTER}>
            {row.value}
          </span>
        </Tooltip>
      ),
    },
    {
      Header: "Url",
      accessor: 'url',
      style: { textAlign: 'center' },
      sortable: false,
      Cell: (row) => (
        <Tooltip title={row.value}>
          <a href={`//${row.value}`} target="_blank" rel="external">
            {row.value}
          </a>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12} md={6}>
          <Button variant="contained">Filtros de búsqueda</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ float: 'right' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab icon={<MapIcon />} label="Mapa" iconPosition="start" />
              <Tab icon={<ListIcon />} label="Listado" iconPosition="start" />
            </Tabs>
          </div>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={12}>
          {
            value === 0 && (
              <GeoMap data={list} />
            )
          }
          {
            value === 1 && (
              <ReactTable
                data={list}
                columns={Columns}
                defaultPageSize={10}
                pageSizeOptions={[5, 10, 20]}
                className="-striped"
              />
            )
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
