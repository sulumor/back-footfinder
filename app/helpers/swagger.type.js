// ? Types liés à la BDD
/**
 @typedef { object } User
 * @property { number } id
 * @property { string } lastname
 * @property { string } firstname
 * @property { string } email
 * @property { number } role_id
 * @property { string } created_at
 * @property { string } updated_at
 */

/**
 * @typedef { object } Player
 * @property { string } birth_date
 * @property { string } nationality
 * @property { string } avatar
 * @property { string } genre
 * @property { string } strong_foot
 * @property { number } number_of_matches_played
 * @property { number } user_id
 * @property { number } position_id
 */

/**
 * @typedef { object } Scout
 * @property { string } club
 * @property { string } city
 * @property { number } user_id
 *
 */

/**
 * @typedef { object } Token
 * @property { string } jwt
 * @property { number } expiresAt
 */

// ? Types spécifiques

/**
 * @typedef { object } LoginBody - Body to receive a login
 * @property { string } email.required - email
 * @property { string } password.required - password
 */

/**
 * @typedef { object } Data
 * @property { number } id
 * @property { string } lastname
 * @property { string } firstname
 * @property { string } email
 * @property { string } role
 * @property { number } role_id
 * @property { string } created_at
 * @property { string } updated_at
 * @property { string } birth_date
 * @property { string } nationality
 * @property { string } avatar
 * @property { string } genre
 * @property { string } strong_foot
 * @property { number } number_of_matches_played
 * @property { number } user_id
 * @property { number } position_id
 * @property { Token } token
 */

/**
 * @typedef { object } LoginResponse - Response after a login request
 * @property { Data } data
 */

/**
 * @typedef { object } RegisterBody - Body to receive a login
 * @property { string } firstname.required - firstname
 * @property { string } lastname.required - lastname
 * @property { string } email.required - email
 * @property { string } password.required - password
 * @property { string } passwordConfirmed.required - password confirmed
 */

/**
 * @typedef { object } RegisterResponse - Response after a login request
 * @property { User } data
 * @property { Token } token
 */
