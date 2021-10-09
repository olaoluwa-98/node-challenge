import { Expense } from './types';
import { format } from './formatter';
import { readExpensesByUserId } from './data/db-expense';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getExpensesByUserId(userId: string): Promise<Expense[]> {
  const [dbError, rawExpenses] = await to(readExpensesByUserId(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find expenses by user with id ${userId}`);
  }

  return rawExpenses.map((rawExpense) => format(rawExpense));
}
