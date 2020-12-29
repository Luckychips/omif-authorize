import {
  CODE,
  initialize,
  validateCertificationNumber,
  joinWith
} from '../lib';

beforeEach(() => {
  initialize();
})

it('full test', async () => {
  try {
    await validateCertificationNumber({
      authNumId: 100103569,
      authNum: '949451'
    });

    const params = {
      loginId: "sungjin1234",
      marketingAgreement: 1,
      password: "string123",
      username: "테스터",
      phone: "01098839613",
      authNumId: "100103486",
      authNum: "027376"
    };

    const response = await joinWith(params);
    expect(response).toBeTruthy();
  } catch (error) {
    expect(error.statusCode).toBe(CODE.DUPLICATE_ID);
  }
});
