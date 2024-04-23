import { Router } from "express";
// -------------- Controllers -----------------
import TeamController from "../../controllers/team.controller.js";
// -------------- Middlewares -----------------
import controllerWrapper from "../../helpers/controller.wrapper.js";

const datasRouter = Router();

/**
   * GET /datas/teams
   * @summary Get team's informations
   * @tags Team
   * @return { Team[] } 200 - Success response - application/json
   * @return { ApiJsonError } 400 - Bad request response - application/json
   * @example response - 400 - example error response
   * {
   *  "error": "Bad request"
   * }
   * @return { ApiJsonError } 404 - Not found response - application/json
   * @example response - 404 - example error response
   * {
   *  "error": "Not Found"
   * }
   * @return { ApiJsonError } 500 - Internal Server Error response - application/json
   * @example response - 500 - example error response
   * {
   *  "error": "Internal Server Error"
   * }
   */
datasRouter.get(
  "/teams",
  controllerWrapper(TeamController.getAllTeams.bind(TeamController)),
);

export default datasRouter;
