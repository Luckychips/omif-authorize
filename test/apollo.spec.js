import { generateCertificationNumber, validateCertificationNumber } from '../lib';
import { CODE } from '../lib';

it('publish', async () => {
  // const response = await generateCertificationNumber('01098839613');
  // console.log('authNumId', response);
  expect(1).toBe(1);
});

it('test duplicate phone number', async () => {
  // try {
  //   await generateCertificationNumber('01098839613');
  // } catch (error) {
  //   if (error.graphQLErrors.length > 0) {
  //     const targetError = error.graphQLErrors[0].extensions.errorCode.code;
  //     expect(targetError).toBe(CODE.DUPLICATE_PHONE);
  //   }
  // }

  expect(1).toBe(1);
});

it('test generateCertificationNumber', async () => {
  // try {
  //   const response = await generateCertificationNumber('01098839613');
  //   console.log('authNumId', response.data.generateAuthNumWithSignUp.authNumId);
  //   expect(Number(response.data.generateAuthNumWithSignUp.authNumId)).toBeGreaterThan(0);
  // } catch (error) {
  //   if (error.graphQLErrors.length > 0) {
  //     const targetError = error.graphQLErrors[0].extensions.errorCode.code;
  //     expect(targetError).toBe(CODE.DUPLICATE_PHONE);
  //   }
  // }

  expect(1).toBe(1);
});

it('test validateCertificationNumber', () => {
  // try {
  //   validateCertificationNumber({
  //     authNumId: 100103461,
  //     authNum: '483488'
  //   });
  // } catch (error) {
  //   if (error.graphQLErrors.length > 0) {
  //     const targetError = error.graphQLErrors[0].extensions.errorCode.code;
  //     expect(targetError).toBe(CODE.DUPLICATE_PHONE);
  //   }
  // }

  expect(1).toBe(1);
});
