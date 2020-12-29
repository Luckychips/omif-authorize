import { CODE, initialize, joinWith } from '../lib';

it('testcase - before initialize', async () => {
  const params = {
    loginId: "apptest100",
    marketingAgreement: 1,
    password: "string123",
    username: "테스터",
    phone: "01038387213",
    authNumId: "100040374",
    authNum: "004719"
  };

  try {
    const response = await joinWith();
    expect(response).toBe(false);
  } catch (error) {
    console.log('error');
  }
});

describe('after initializing', () => {
  beforeEach(() => {
    return initialize();
  });

  it('testcase - is not verified', async () => {
    const params = {
      loginId: "apptest100",
      marketingAgreement: 1,
      password: "string123",
      username: "테스터",
      phone: "01038387213",
      authNumId: "100040374",
      authNum: "004719"
    };

    try {
      await joinWith(params);
    } catch (error) {
      expect(error.statusCode).toBe(CODE.OTHER_JOIN_ERROR);
    }
  });
});
