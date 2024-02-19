// ? Types liés à la BDD
/**
 * @typedef { object } User
 * @property { number } id
 * @property { string } avatar
 * @property { string } lastname
 * @property { string } firstname
 * @property { string } email
 * @property { number } role_id
 * @property { string } created_at
 * @property { string } updated_at
 */

/**
 * @typedef { object } Player
 * @property { number } id
 * @property { string } birth_date
 * @property { string } nationality
 * @property { string } genre
 * @property { string } strong_foot
 * @property { number } number_of_matches_played
 * @property { number } user_id
 * @property { number } position_id
 * @property { string } created_at
 * @property { string } updated_at
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

/**
 * @typedef { object } Team
 * @property { number } team_id
 * @property { string } club_name
 * @property { string } logo
 * @property { string } adress
 * @property { string } zip_code
 * @property { string } city
 * @property { string } latitude
 * @property { string } longitude
 * @property { string } season
 * @property { number } player_id
 */

// ? Types view
/**
 * @typedef { object } Match
 * @property { number } id
 * @property { number } match_id
 * @property { string } score
 * @property { Team } team_id_as_home
 * @property { Team } team_id_as_outside
 */

/**
 * @typedef { object } Stats
 * @property { number } id
 * @property { number } match_id
 * @property { string } score
 * @property { Team } team_id_as_home
 * @property { Team } team_id_as_outside
 * @property { number } assists
 * @property { number } goals_scored
 * @property { number } minutes_played
 * @property { number } red_card
 * @property { number } yellow_card
 * @property { number } stop
 * @property { number } goals_conceed
 * @property { string } fitness
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

/**
 * @typedef { object } UpdatePlayer - Body to update a player minimum one input is required
 * @property { string } avatar
 * @property { string } lastname
 * @property { string } firstname
 * @property { string } email
 * @property { string } birth_date
 * @property { string } nationality
 * @property { string } genre
 * @property { string } strong_foot
 *
 */

/**
 * @typedef { object } PostMatch - Body to insert a match
 * @property { number } homeTeam
 * @property { number } awayTeam
 * @property { string } score
 */

/**
 * @typedef { object } PostStats - Body to insert a statistic
 * @property { number } assists
 * @property { number } goals_scored
 * @property { number } minutes_played
 * @property { number } red_card
 * @property { number } yellow_card
 * @property { number } stop
 * @property { number } goals_conceed
 * @property { string } fitness
 */

/**
 * @typedef { object } PlayerQuery
 * @property { string } lastname
 * @property { string } firstname
 * @property { string } nationality
 * @property { string } genre
 * @property { string } strong_foot
 * @property { string } position
 * @property { number } number_of_matches_played
 */
