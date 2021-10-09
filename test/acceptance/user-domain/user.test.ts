import { Api } from '../utils/api';
import {
  dbSetup,
  dbTeardown,
  emptyUserTable,
  fillUserTable,
} from '../utils/db';

beforeAll(() => {
  return dbSetup();
});

afterAll(() => {
  return dbTeardown();
});

beforeEach(() => {
  fillUserTable();
});

afterEach(() => {
  emptyUserTable();
});

describe('User Domain Acceptance Tests', () => {
  describe('get-user-details endpoint', () => {
    test('get-user-details route should return positively', async () => {
      await Api.get(
        '/user/v1/get-user-details?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
      )
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe('Jeppe');

          // test non-public details should not show
          expect(res.body.id).toBeUndefined();
          expect(res.body.ssn).toBeUndefined();
        });
    });

    test('get-user-details route should return error if userId is invalid', (done) => {
      Api.get('/user/v1/get-user-details?userId=ddd').expect(400, done);
    });

    const wrongUUID = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a4ee';
    test('get-user-details route should return error if user does not exist', (done) => {
      Api.get(`/user/v1/get-user-details?userId=${wrongUUID}`).expect(
        404,
        done
      );
    });
  });
});
