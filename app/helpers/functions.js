import TeamDatamapper from "../datamapper/team.datamapper.js";

export default async function getHomeAndAwayTeamsInfos(datas) {
  if (Array.isArray(datas)) {
    const homePromise = [];
    const awayPromise = [];
    datas.forEach((data) => {
      const home = TeamDatamapper.findAll({ where: { team_id: data.team_id_as_home } });
      homePromise.push(home);
      const away = TeamDatamapper.findAll({ where: { team_id: data.team_id_as_outside } });
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
  const homeTeam = await TeamDatamapper.findAll({ where: { team_id: datas.team_id_as_home } });
  const awayTeam = await TeamDatamapper.findAll({ where: { team_id: datas.team_id_as_outside } });
  return {
    ...datas,
    team_id_as_home: homeTeam[0],
    team_id_as_outside: awayTeam[0],
  };
}
