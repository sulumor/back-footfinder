import CoreController from "./core.controller.js";
import TeamDatamapper from "../datamapper/team.datamapper.js";

/**
 * Controller to manage operations related to teams.
 */
export default class TeamController extends CoreController {
  static datamapper = TeamDatamapper;

  /**
 *
 * @param {number[]} teamIds Array of team IDs.
 * @returns {Promise<Object[]>} Promise resolving to an array of team information objects.
 */
  static async getTeamInfos(teamIds) {
    const allTeamPromises = [];
    teamIds.forEach((id) => {
      const teamPromise = this.datamapper.findAll({ where: { team_id: id } });
      allTeamPromises.push(teamPromise);
    });
    return (await Promise.all(allTeamPromises)).map((team) => team[0]);
  }

  /**
 *Method to retrieve information for multiple home and away teams.
 * @param {Object[]} datas Array of data objects containing home and away team IDs.
 * @returns {Promise<Object[]>} Promise resolving to an array
 * of objects containing team information.
 */
  static async getMultipleHomeAndAwayTeamsInfos(datas) {
    const homePromise = [];
    const awayPromise = [];
    datas.forEach((data) => {
      const home = this.datamapper.findByPk(data.team_id_as_home);
      homePromise.push(home);
      const away = this.datamapper.findByPk(data.team_id_as_outside);
      awayPromise.push(away);
    });

    const homeTeams = (await Promise.all(homePromise)).map((team) => team);
    const awayTeams = (await Promise.all(awayPromise)).map((team) => team);
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < datas.length; i++) {
      const {
        team_id_as_home: Home,
        team_id_as_outside: Away,
        created_at: createdAt,
        updated_at: updatedAt,
        ...data
      } = datas[i];
      const obj = {
        ...data,
        home: homeTeams[i],
        away: awayTeams[i],
      };
      results.push(obj);
    }
    return results;
  }

  /**
 *Method to retrieve information for a single home and away team.
 * @param {Object} data Object containing home and away team IDs.
 * @returns {Promise<Object>} Promise resolving to an object containing team information.
 */
  static async getHomeAndAwayTeamsInfos(data) {
    const homeTeam = await this.datamapper.findByPk(data.team_id_as_home);
    const awayTeam = await this.datamapper.findByPk(data.team_id_as_outside);
    return {
      ...data,
      team_id_as_home: homeTeam[0],
      team_id_as_outside: awayTeam[0],
    };
  }

  /**
 *Method to retrieve information for all teams.
 * @param {Object} _ The request object (unused)
 * @param {Object} res The response object.
 * @returns {Promise<Object[]>} - Promise resolving to an array of team information objects.
 */
  static async getAllTeams(_, res) {
    const rows = await this.datamapper.findAllTeams();
    return res.status(200).json(rows);
  }
}
