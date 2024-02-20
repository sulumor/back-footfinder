import { Router } from "express";
import controllerWrapper from "../../helpers/controller.wrapper.js";
import TeamController from "../../controllers/team.controller.js";

const datasRouter = Router();

datasRouter.route("/teams").get(controllerWrapper(TeamController.getAllTeams.bind(TeamController)));

export default datasRouter;
