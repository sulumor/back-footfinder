import MatchDatamapper from "../datamapper/match.datamapper.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";
import CoreController from "./core.controller.js";

export default class MatchController extends CoreController {
  static datamapper = MatchDatamapper;

  static async createSQL({ params, body }, res) {
    const createInfos = { id: params.id, ...body };
    const match = await this.datamapper.createSQL(createInfos);
    const homeTeam = await TeamDatamapper.findAll({ where: { team_id: match.team_id_as_home } });
    const awayTeam = await TeamDatamapper.findAll({ where: { team_id: match.team_id_as_outside } });
    return res.status(200).json({
      ...match,
      team_id_as_home: homeTeam[0],
      team_id_as_outside: awayTeam[0],
    });
  }
}
