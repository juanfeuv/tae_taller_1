import Colleges from '../../Assets/colleges.json';

const findCollege = (input) => {
  return Colleges
    .filter(({ nombre, desEstado, ciudad }) => `${nombre} - ${desEstado} - ${ciudad}`.toLowerCase().includes(input.toLowerCase()))
    .slice(0, 20)
    .map(({ _id, nombre, desEstado, ciudad }) => ({
      value: _id,
      label: `${nombre} - ${desEstado} - ${ciudad}`,
    }));
}

const getFullColleges = (input) => Promise.resolve(findCollege(input));

export default getFullColleges;