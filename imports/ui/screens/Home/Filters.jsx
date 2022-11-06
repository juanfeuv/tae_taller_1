import _ from 'lodash';

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Select from 'react-select'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import floatFormat from '../../floatFormat';
import SideModal from '../../components/SideModal';
import callMethod from '../../callMethod';

const DEFAULT_FORM = {
  costoMatricula: [10000, 20000],
  estado: [],
  universidad: [],
};

const valuetext = (value) => `$${floatFormat(value)}`;

const Filters = ({ open, setOpen, getColleges, isMap }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [colleges, setColleges] = useState([]);
  const [states, setStates] = useState([]);

  const handleClose = () => setOpen(false);

  const handlechange = (e) => {
    setForm({
      ...form,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const getCollegesList = () => {
    callMethod('getFullColleges')
      .then(({ res }) => setColleges(res));
  };

  const getStates = () => {
    callMethod('getStates')
      .then(({ res }) => setStates(res));
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
    getCollegesList();
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
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom>Rango costo matricula</Typography>
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
              onChange={value => handlechange({
                target: {
                  name: 'estado',
                  value,
                }
              })}
              options={states}
              isMulti
            />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>Universidad</Typography>
            <Select
              name='universidad'
              onChange={value => handlechange({
                target: {
                  name: 'universidad',
                  value,
                }
              })}
              value={form?.universidad}
              options={colleges}
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