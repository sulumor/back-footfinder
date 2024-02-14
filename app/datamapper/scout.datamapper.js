import CoreDatamapper from "./core.datamapper.js";
import client from "../helpers/pg.client.js";

export default class ScoutDatamapper extends CoreDatamapper {
  static tableName = "scout";
  //mettre à jour les infos des recruteurs
  //ecrire une fonction avec des params 
  //faire la requête pour la modification des données necessaires
  //retourner les données mise à jour
  static async updateSQL(json) {
    const result = await client.query(`SELECT * FROM update_scout ('${JSON.stringify(json)}');`);
    return result.rows[0];
  }

  static async joinWithUser(id) {
    const result = await client.query(`
      SELECT * FROM "${this.tableName}" 
      JOIN "user" ON "${this.tableName}".user_id = "user".id
      WHERE "${this.tableName}".user_id=$1`, [id]);
    return result.rows[0];
  }
  
  static async findByPlayer(playerId) {
    const result = await client.query(` 
      SELECT * FROM "player"
      JOIN "user" ON "player".user_id = "user".id
      WHERE "player".user_id=$1`, [playerId]);
    return result.rows[0];
  }
 
};
