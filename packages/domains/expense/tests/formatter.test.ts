import { format, secureTrim } from '../formatter';

describe('[Packages | Expense-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(secureTrim({
      merchant_name: 'Amazon',
      amount_in_cents: 4000,
      currency: 'USD',
      id: 'fake-uuid',
      user_id: 'fake-uuid',
      date_created: '2021-09-21T19:57:40.021Z',
      status: 'pending',
    })).toEqual(JSON.stringify({
      merchant_name: 'Amazon',
      amount_in_cents: 4000,
      currency: 'USD',
      date_created: '2021-09-21T19:57:40.021Z',
      status: 'pending',
    }));
  });
});

describe('[Packages | Expense-domain | Formatter] format', () => {
  test('format should return an instance of expense that fits the API model, based on the db raw value', () => {
    return expect(format({
      merchant_name: 'amazon',
      amount_in_cents: 4000,
      currency: 'usd',
      user_id: 'fake-uuid',
      date_created: '2021-09-21T19:57:40.021Z',
      status: 'pending',
    })).toEqual({
      merchant_name: 'Amazon',
      amount_in_cents: 4000,
      currency: 'USD',
      user_id: 'fake-uuid',
      date_created: '2021-09-21T19:57:40.021Z',
      status: 'pending',
    });
  });
});
