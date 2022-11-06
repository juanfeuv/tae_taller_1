import { Meteor } from 'meteor/meteor';

import Colleges from '../../collections/colleges';

const getFullColleges = () => {
  return Colleges
    .find({})
    .fetch()
    .map(({ _id, nombre, desEstado, ciudad }) => ({
      value: _id,
      label: `${nombre} - ${desEstado} - ${ciudad}`,
    }));
};

Meteor.methods({ getFullColleges });
