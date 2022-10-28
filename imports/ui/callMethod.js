import { Meteor } from 'meteor/meteor';

const callMethod = (name, params) => new Promise((resolve) => Meteor
  .call(name, params, (err, res) => {
    if (err) {
      resolve({
        err,
      });

      return;
    }

    resolve({
      res,
    });
  }));


export default callMethod;
