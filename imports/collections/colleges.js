import { Mongo } from 'meteor/mongo';

const INDEXES = [
  {
    costoMatricula: -1,
  }
];

const Colleges = new Mongo.Collection('colleges');

INDEXES.forEach(index => Colleges.createIndex(index));

export default Colleges;