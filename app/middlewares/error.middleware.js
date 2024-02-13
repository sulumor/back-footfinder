/* eslint-disable no-unused-vars */

/**
 * @params {Error} err
 * @params {Express.Request} req
 * @params {Express.Response} res
 * @params {Express.NextFunction} next
 * @returns {Express.Response}
 *
 */
export default (err, _, res, __) => {
  if (err.httpStatus === 500) console.error(err);

  return res.status(err.httpStatus).json({ error: err.message });
};
