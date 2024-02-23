import ApiError from "../errors/api.error.js";
import registrationPlayerPostSchemas from "../schemas/post/registration.player.post.schemas.js";
import registrationScoutPostSchemasCopy from "../schemas/post/registration.scout.post.schemas copy.js";

export default () => async ({ params, body }, _, next) => {
  try {
    if (params.role === "joueur") await registrationPlayerPostSchemas.validateAsync(body);
    if (params.role === "recruteur") await registrationScoutPostSchemasCopy.validateAsync(body);
    next();
  } catch (err) {
    next(new ApiError(err.details[0].message, { httpStatus: err.statusCode }));
  }
};
