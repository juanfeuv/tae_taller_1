import { Mongo } from 'meteor/mongo';

const INDEXES = [];


const Colleges = new Mongo.Collection('colleges');

INDEXES.forEach(index => Colleges.createIndex(index));

export default Colleges;