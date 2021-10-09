import { getExpensesByUserId } from '../model';
import { getUserDetails } from '@nc/domain-user/model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import validate from 'uuid-validate';
import { ApiError, BadRequest } from '@nc/utils/errors';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const userId = req.query?.userId;

  if (!userId || !validate(userId)) {
    return next(BadRequest('Please input a valid uuid', req));
  }

  const [userError, userDetails] = await to(getUserDetails(userId));

  if (userError || !userDetails) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  const [expensesError, expenses] = await to(getExpensesByUserId(userDetails.id));

  if (expensesError) {
    return next(new ApiError(expensesError, expensesError.status, `Could not get expenses: ${expensesError}`, expensesError.title, req));
  }

  return res.json(expenses.map((expense) => JSON.parse(secureTrim(expense))));
});
