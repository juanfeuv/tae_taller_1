import { Meteor } from 'meteor/meteor';

import Colleges from '../../collections/colleges';

const transformMap = ({
  latitude, longitude, nombre, desEstado, grupo, ciudad, costoMatricula
}) => ({
  coordinates: [Number(longitude), Number(latitude)],
  name: nombre,
  estado: desEstado,
  ciudad,
  grupo,
  costoMatricula,
});

const getColleges = ({ isMap }) => {
  const query = {};

  if (isMap) {
    return Colleges
      .find(query)
      .fetch()
      .map(transformMap);
  }

  return Colleges
    .find(query, {
      sort: {
        costoMatricula: 1,
      }
    })
    .fetch();
}

Meteor.methods({ getColleges });