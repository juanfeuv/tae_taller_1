import _ from 'lodash';

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

const getColleges = ({ isMap, query = {} }) => {
  const {
    universidad, estado, costoMatricula,
  } = query;

  const newQuery = {};

  if (!_.isEmpty(costoMatricula)) {
    newQuery.costoMatricula = {
      $gte: costoMatricula[0],
      $lte: costoMatricula[1],
    }
  }

  if (!_.isEmpty(estado)) {
    newQuery.estado = {
      $in: estado,
    };
  }

  if (!_.isEmpty(universidad)) {
    newQuery._id = {
      $in: universidad,
    };
  }

  if (isMap) {
    return Colleges
      .find(newQuery)
      .fetch()
      .map(transformMap);
  }

  return Colleges
    .find(newQuery, {
      sort: {
        costoMatricula: 1,
      }
    })
    .fetch();
}

Meteor.methods({ getColleges });