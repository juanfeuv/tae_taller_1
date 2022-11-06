import { Meteor } from 'meteor/meteor';

const getStates = () => {
  const estados = JSON.parse(Assets.getText('estados_usa.json'));

  return estados.map(({ des, code }) => ({
    value: des,
    label: code,
  }));
};

Meteor.methods({ getStates });
