import _ from 'lodash';

import { toast } from 'react-toastify';

import AsyncSelect from 'react-select/async';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Select from 'react-select'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import floatFormat from '../../floatFormat';
import getFullColleges from './getFullColleges';
import getRawStates from './getStates';
import SideModal from '../../components/SideModal';

const DEFAULT_FORM = {
  costoMatricula: [10000, 20000],
  estado: [],
  universidad: [],
};

const valuetext = (value) => `$${floatFormat(value)}`;

const Filters = ({ open, setOpen, getColleges, isMap }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [states, setStates] = useState([]);

  const handleClose = () => setOpen(false);

  const handlechange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const changeSelect = (name) => value => handlechange({
    target: {
      name,
      value,
    }
  });

  const getStates = () => {
    setStates(getRawStates());
  }

  const search = () => {
    const { estado, universidad, ...rest } = form;

    const newForm = {
      ...rest,
    };

    if (!_.isEmpty(estado)) {
      newForm.estado = estado.map(({ value }) => value);
    }

    if (!_.isEmpty(universidad)) {
      newForm.universidad = universidad.map(({ value }) => value);
    }

    getColleges(isMap, newForm);
    toast.success('Filtro aplicado exitosamente!');
    handleClose();
  };

  useEffect(() => {
    if (open) {
      setForm(DEFAULT_FORM);
    }
  }, [open]);

  useEffect(() => {
    getStates();
  }, []);

  return (
    <SideModal open={open} setOpen={setOpen}>
      <div style={{ padding: '20px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Filtros de búsqueda
            </Typography>
            <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
              El filtro Rango costo matricula se aplica por defecto deacuerdo al rango indicado
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom>Rango costo matricula ($0 - $100.000)</Typography>
            <Slider
              getAriaLabel={() => 'Rango costo matricula'}
              value={form?.costoMatricula}
              onChange={handlechange}
              valueLabelDisplay="auto"
              name="costoMatricula"
              getAriaValueText={valuetext}
              min={0}
              max={100000}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Estado</Typography>
            <Select
              name='estado'
              value={form?.estado}
              onChange={changeSelect('estado')}
              options={states}
              isMulti
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Universidad</Typography>
            <AsyncSelect
              name='universidad'
              onChange={changeSelect('universidad')}
              value={form?.universidad}
              loadOptions={getFullColleges}
              defaultOptions
              isMulti
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="success"
              onClick={search}
            >
              Buscar
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </div>
    </SideModal>
  );
};

Filters.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  getColleges: PropTypes.func.isRequired,
  isMap: PropTypes.bool.isRequired,
};

export default Filters;