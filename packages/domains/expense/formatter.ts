import { capitalize } from '@nc/utils/string';
import { Expense } from './types';

const publicFields = ['merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status'];

export function secureTrim(expense: Expense): string {
  return JSON.stringify(expense, publicFields);
}

export function format(rawExpense: any): Expense {
  return {
    id: rawExpense.id,
    merchant_name: capitalize(rawExpense.merchant_name),
    amount_in_cents: rawExpense.amount_in_cents,
    currency: rawExpense.currency.toUpperCase(),
    user_id: rawExpense.user_id,
    date_created: rawExpense.date_created,
    status: rawExpense.status,
  };
}
