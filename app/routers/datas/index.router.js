import { Router } from "express";
// -------------- Controllers -----------------
import TeamController from "../../controllers/team.controller.js";
import PositionController from "../../controllers/position.controller.js";
import GenderController from "../../controllers/gender.controller.js";
import NationalityController from "../../controllers/nationality.controller.js";
// -------------- Middlewares -----------------
import controllerWrapper from "../../helpers/controller.wrapper.js";

const datasRouter = Router();

/**
   * GET /datas/teams
   * @summary Get list of all teams with their informations
   * @tags Datas
   * @return { Team[] } 200 - Success response - application/json
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Ressource not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
datasRouter.get(
  "/teams",
  controllerWrapper(TeamController.getAll.bind(TeamController)),
);

/**
   * GET /datas/positions
   * @summary Get list of all positions
   * @tags Datas
   * @return { Base[] } 200 - Success response - application/json
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Ressource not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
datasRouter.get(
  "/positions",
  controllerWrapper(PositionController.getAll.bind(PositionController)),
);

/**
   * GET /datas/genders
   * @summary Get list of all genders
   * @tags Datas
   * @return { Base[] } 200 - Success response - application/json
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Ressource not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
datasRouter.get(
  "/genders",
  controllerWrapper(GenderController.getAll.bind(GenderController)),
);

/**
   * GET /datas/nationalities
   * @summary Get list of all nationalities
   * @tags Datas
   * @return { Base[] } 200 - Success response - application/json
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Ressource not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
datasRouter.get(
  "/nationalities",
  controllerWrapper(NationalityController.getAll.bind(NationalityController)),
);

export default datasRouter;
