import {
  CODE,
  initialize,
  generateCertificationNumber,
  validateCertificationNumber,
} from '../lib';

beforeEach(() => {
  initialize();
});

it('publish', async () => {
  // const response = await generateCertificationNumber('01098839613');
  // console.log('authNumId', response);
  // expect(1).toBe(1);
});

it('testcase - duplicate phone number', async () => {
  try {
    await generateCertificationNumber('01038387213');
  } catch (error) {
    expect(error.statusCode).toBe(CODE.DUPLICATE_PHONE);
  }
});

it('testcase - generateCertificationNumber', async () => {
  const response = await generateCertificationNumber('01098839613');
  console.log(response.authNumId);
  expect(Number(response.authNumId)).toBeGreaterThan(0);
});

it('testcase - validateCertificationNumber', async () => {
  try {
    const response = await validateCertificationNumber({
      authNumId: 100103569,
      authNum: '949451'
    });

    expect(response).toBeTruthy();
  } catch (error) {
    expect(error.statusCode).toBe(CODE.INVALID_CERTIFICATION_NUMBER);
  }
});
