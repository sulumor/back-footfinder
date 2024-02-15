import MatchDatamapper from "../datamapper/match.datamapper.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";
import ApiError from "../errors/api.error.js";
import CoreController from "./core.controller.js";

export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;

  static async createSQL({ params, body }, res, next) {
    const createInfos = { id: params.id, ...body };
    const match = await this.datamapper.createSQL(createInfos);
    if (!match) return next(new ApiError("Ressources not Found", { httpStatus: 404 }));
    const homeTeam = await TeamDatamapper.findAll({ where: { team_id: match.team_id_as_home } });
    const awayTeam = await TeamDatamapper.findAll({ where: { team_id: match.team_id_as_outside } });
    return res.status(201).json({
      ...match,
      team_id_as_home: homeTeam[0],
      team_id_as_outside: awayTeam[0],
    });
  }

  static async updateSQL({ params, body }, res, next) {
    const updateInfos = { ...params, ...body };
    const updatedMatch = await this.datamapper.updateSQL(updateInfos);
    if (!updatedMatch) return next(new ApiError("Ressources not Found", { httpStatus: 404 }));
    const homeTeam = await TeamDatamapper.findAll({
      where:
        { team_id: updatedMatch.team_id_as_home },
    });
    const awayTeam = await TeamDatamapper.findAll({
      where:
        { team_id: updatedMatch.team_id_as_outside },
    });
    return res.status(201).json({
      ...updatedMatch,
      team_id_as_home: homeTeam[0],
      team_id_as_outside: awayTeam[0],
    });
  }
}
