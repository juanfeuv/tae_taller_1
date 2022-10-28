import { Meteor } from 'meteor/meteor';

const getColleges = (params) => {
  console.log('hola mundo', params);

  return params;
}

Meteor.methods({ getColleges });