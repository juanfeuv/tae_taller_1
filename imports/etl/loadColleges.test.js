import { tranform, getEstados, getFullColleges } from './loadColleges';

describe('tranform', () => {
  it('mapping should be succesfull', () => {
    const estados = getEstados();
    const colleges = getFullColleges();
    const received = tranform({ estados, colleges })();

    const EXPECTED = {};

    expect(received).toBe(EXPECTED);
  });
});