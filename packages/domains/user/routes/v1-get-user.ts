import { getUserDetails } from '../model';
import { Router } from 'express';
import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';
import validate from 'uuid-validate';
import { ApiError, BadRequest } from '@nc/utils/errors';

export const router = Router();

router.get('/get-user-details', async (req, res, next) => {
  const userId = req.query?.userId;

  if (!userId || !validate(userId)) {
    return next(BadRequest('Please input a valid uuid', req));
  }

  const [userError, userDetails] = await to(getUserDetails(userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(JSON.parse(secureTrim(userDetails)));
});
