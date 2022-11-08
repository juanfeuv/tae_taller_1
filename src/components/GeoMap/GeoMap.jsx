import DeckGL from '@deck.gl/react';
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { StaticMap } from 'react-map-gl';
import { MapView } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';

import './style.css';

import floatFormat from '../../floatFormat';
import IconClusterLayer from './IconClusterLayer';
import styles from './styles.json';

const INITIAL_VIEW_STATE = {
  longitude: -35,
  latitude: 36.7,
  zoom: 1.8,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};
const MAP_VIEW = new MapView({ repeat: true });
const DATA_URL = [];

const buildInfo = (object) => (
  <>
    {
      object.coordinates?.some(item => !item) && (
        <Grid container alignItems="center">
          <WarningAmberIcon color='error' />
          &nbsp;
          <b>
            Las coordenadas no se encuentran registradas!
          </b>
        </Grid>
      )
    }
    <h5>{object.name}</h5>
    <div>Grupo sugerido: <b>{object.grupo}</b></div>
    <div>Estado: {object.estado || 'unknown'}</div>
    <div>Ciudad: {object.ciudad || 'unknown'}</div>
    <div>Costo Matrícula: ${floatFormat(object.costoMatricula)}</div>
    <div>Coordenadas: {object.coordinates?.map(item => item || 'unknown')?.join(', ')}</div>
  </>
);

function renderTooltip(info) {
  const { object, x, y } = info;

  if (info.objects) {
    return (
      <div className="tooltip interactive" style={{ left: x, top: y }}>
        {info.objects.map((item) => {
          return (
            <div key={item._id}>
              {buildInfo(item)}
            </div>
          );
        })}
      </div>
    );
  }

  if (!object) {
    return null;
  }

  return object.cluster ? (
    <div className="tooltip" style={{ left: x, top: y }}>
      {object.point_count} records
    </div>
  ) : (
    <div className="tooltip" style={{ left: x, top: y }}>
      {buildInfo(object)}
    </div>
  );
}

const GeoMap = ({
  data = DATA_URL,
  iconMapping = '/location-icon-mapping.json',
  iconAtlas = '/location-icon-atlas.png',
  showCluster = true,
  mapStyle = styles,
}) => {
  const [hoverInfo, setHoverInfo] = useState({});

  const hideTooltip = () => {
    setHoverInfo({});
  };

  const expandTooltip = info => {
    if (info.picked && showCluster) {
      setHoverInfo(info);
    } else {
      setHoverInfo({});
    }
  };

  const layerProps = {
    data,
    pickable: true,
    getPosition: d => d.coordinates,
    iconAtlas,
    iconMapping,
    onHover: !hoverInfo.objects && setHoverInfo
  };

  const layer = showCluster
    ? new IconClusterLayer({ ...layerProps, id: 'icon-cluster', sizeScale: 40 })
    : new IconLayer({
      ...layerProps,
      id: 'icon',
      getIcon: d => 'marker',
      sizeUnits: 'meters',
      sizeScale: 2000,
      sizeMinPixels: 6
    });

  return (
    <div className="map">
      <DeckGL
        layers={[layer]}
        views={MAP_VIEW}
        initialViewState={INITIAL_VIEW_STATE}
        controller={{ dragRotate: false }}
        onViewStateChange={hideTooltip}
        onClick={expandTooltip}
      >
        <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
        {renderTooltip(hoverInfo)}
      </DeckGL>
    </div>
  );
};

export default GeoMap;