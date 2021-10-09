import { Api } from '../utils/api';

import {
  dbSetup,
  dbTeardown,
  emptyExpenseTable,
  fillExpenseTable,
} from '../utils/db';

beforeAll(() => {
  return dbSetup();
});

afterAll(() => {
  return dbTeardown();
});

beforeEach(() => {
  fillExpenseTable();
});

afterEach(() => {
  emptyExpenseTable();
});

describe('Expense Domain Acceptance Tests', () => {
  describe('get-user-expenses endpoint', () => {
    test('get-user-expenses route should return positively', async () => {
      // user with da140a29-ae80-4f0e-a62d-6c2d2bc8a474 has 4 expenses
      await Api.get(
        '/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474'
      )
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          res.body.forEach((expense) => {
            // test non-public details should not show
            expect(expense.id).toBeUndefined();
            expect(expense.user_id).toBeUndefined();
          });
          expect(res.body.length).toEqual(4);
        });
    });

    test('get-user-expenses route should return empty list for user with no expense', async () => {
      // user with e17825a6-ad80-41bb-a76b-c5ee17b2f29d has no expenses
      await Api.get(
        '/expense/v1/get-user-expenses?userId=e17825a6-ad80-41bb-a76b-c5ee17b2f29d'
      )
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toEqual(0);
        });
    });

    test('get-user-expenses route should return error if userId is invalid', (done) => {
      Api.get('/expense/v1/get-user-expenses?userId=ddd').expect(400, done);
    });

    const wrongUUID = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a4ee';
    test('get-user-expenses route should return error if user does not exist', (done) => {
      Api.get(`/expense/v1/get-user-expenses?userId=${wrongUUID}`).expect(
        404,
        done
      );
    });
  });
});
