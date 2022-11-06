import { Mongo } from 'meteor/mongo';

const INDEXES = [
  {
    costoMatricula: -1,
  },
  {
    costoMatricula: 1,
    estado: 1,
    _id: 1,
  }
];

const Colleges = new Mongo.Collection('colleges');

INDEXES.forEach(index => Colleges.createIndex(index));

export default Colleges;