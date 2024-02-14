import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import ScoutController from "../../controllers/scout.controller.js";

const scoutRouter = Router();

scoutRouter.route("/:id")
  .get(controllerWrapper(ScoutController.getWithUser.bind(ScoutController)))
  .patch(controllerWrapper(ScoutController.updateInfos.bind(ScoutController)));

scoutRouter.route("/search")
  .get(controllerWrapper(ScoutController.getAll.bind(ScoutController)));

scoutRouter.route("/:id/player/:playerId")
  .get(controllerWrapper(ScoutController.getFindOnePlayer.bind(ScoutController)));

scoutRouter.route("/:id/player/:playerId/match/:matchId")
  .get(controllerWrapper(ScoutController.getByPk.bind(ScoutController)));

export default scoutRouter;
