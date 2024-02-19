import CoreController from "./core.controller.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";

export default class TeamController extends CoreController {
  static datamapper = TeamDatamapper;

  static async getTeamInfos(teamIds) {
    const allTeamPromises = [];
    teamIds.forEach((id) => {
      const teamPromise = this.datamapper.findAll({ where: { team_id: id } });
      allTeamPromises.push(teamPromise);
    });
    return (await Promise.all(allTeamPromises)).map((team) => team[0]);
  }

  static async getMultipleHomeAndAwayTeamsInfos(datas) {
    const homePromise = [];
    const awayPromise = [];
    datas.forEach((data) => {
      const home = this.datamapper.findAll({ where: { team_id: data.team_id_as_home } });
      homePromise.push(home);
      const away = this.datamapper.findAll({ where: { team_id: data.team_id_as_outside } });
      awayPromise.push(away);
    });

    const homeTeams = (await Promise.all(homePromise)).map((team) => team[0]);
    const awayTeams = (await Promise.all(awayPromise)).map((team) => team[0]);
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < datas.length; i++) {
      const obj = {
        ...datas[i],
        team_id_as_home: homeTeams[i],
        team_id_as_outside: awayTeams[i],
      };
      results.push(obj);
    }
    return results;
  }

  static async getHomeAndAwayTeamsInfos(data) {
    const homeTeam = await this.datamapper.findAll({ where: { team_id: data.team_id_as_home } });
    const awayTeam = await this.datamapper.findAll({ where: { team_id: data.team_id_as_outside } });
    return {
      ...data,
      team_id_as_home: homeTeam[0],
      team_id_as_outside: awayTeam[0],
    };
  }
}
