import EstadosUSA from '../../Assets/estados_usa.json';

const getStates = () => EstadosUSA.map(({ des, code }) => ({
  value: des,
  label: code,
}));

export default getStates;
