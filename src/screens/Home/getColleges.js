import _ from 'lodash';

import Colleges from '../../Assets/colleges.json';

const buildFilter = ({ universidad, estado, costoMatricula }) => item => {
  const newQuery = [];

  if (!_.isEmpty(costoMatricula)) {
    newQuery.push(_.includes(costoMatricula, item.costoMatricula) || _.inRange(item.costoMatricula, costoMatricula[0], costoMatricula[1]));
  }

  if (!_.isEmpty(estado)) {
    newQuery.push(_.includes(estado, item.estado));
  }

  if (!_.isEmpty(universidad)) {
    newQuery.push(_.includes(universidad, item._id));
  }

  const doestNotCumply = newQuery.some(rule => !rule);

  return !doestNotCumply;
};

const transformMap = ({
  _id, latitude, longitude, nombre, desEstado, grupo, ciudad, costoMatricula
}) => ({
  _id,
  coordinates: [Number(longitude), Number(latitude)],
  name: nombre,
  estado: desEstado,
  ciudad,
  grupo,
  costoMatricula,
});

const getColleges = ({ isMap, query = {} }) => {
  const filtered = Colleges
    .filter(buildFilter(query));

  if (isMap) {
    return filtered
      .map(transformMap);
  }

  return filtered;
}

export default getColleges;