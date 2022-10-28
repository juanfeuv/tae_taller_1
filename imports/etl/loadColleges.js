import Colleges from '../collections/colleges';

const OWNERSHIP_MAP = new Map([
  [1, 'Public'],
  [2, 'Private nonprofit'],
  [3, 'Private for-profit'],
]);

export const getEstados = () => {
  const estados = JSON.parse(Assets.getText('estados.json'));
  const map = estados.map(({ FIELD1, FIELD2 }) => [FIELD1, FIELD2]);

  return new Map(map);
};

export const getFullColleges = () => {
  const colleges = JSON.parse(Assets.getText('collegeScorecard.json'));
  const map = colleges.map(({
    UNITID, AccredAgency, INSTURL, LATITUDE, LONGITUDE, ZIP,
  }) => [UNITID, {
    agency: AccredAgency,
    url: INSTURL,
    latitude: LATITUDE,
    longitude: LONGITUDE,
    zip: ZIP,
  }]);

  return new Map(map);
};

export const tranform = ({ estados, colleges }) => ({
  ID, NOMBRE, CONTROL, COSTO_MATRICULA, ESTADO, INGRESOS_FAMILIARES_M1,
  INGRESOS_FAMILIARES_H2, Labels_3Clusters
}) => {
  const _id = String(ID);
  const college = colleges.get(_id);

  Colleges.insert({
    ...college,
    _id,
    nombre: NOMBRE,
    ownership: CONTROL,
    desOwnership: OWNERSHIP_MAP.get(CONTROL),
    costoMatricula: COSTO_MATRICULA,
    estado: ESTADO,
    desEstado: estados.get(ESTADO),
    ingresosFamiliaresH2: INGRESOS_FAMILIARES_H2,
    ingresosFamiliaresM1: INGRESOS_FAMILIARES_M1,
    grupo: Labels_3Clusters,
  });
};

const loadColleges = () => {
  console.time('carga finalizada');

  const data = JSON.parse(Assets.getText('colleges_agrupados.json'));
  const estados = getEstados();
  const colleges = getFullColleges();
  data.forEach(tranform({ estados, colleges }));

  console.timeEnd('carga finalizada');
};

export default loadColleges;
