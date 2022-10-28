import _ from 'lodash';

export default () => {
  const data = JSON.parse(Assets.getText('colleges_agrupados.json'))
    .map(({ ID }) => ID);

  console.log('total', data.length);

  console.log('unico', _.uniq(data).length);
}

