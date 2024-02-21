import CoreDatamapper from "./core.datamapper.js";

export default class AuthDatamapper extends CoreDatamapper {
  static tableName = "user";

  static readTableName = "auth_view";

  static createTableName = "add_user";
}
