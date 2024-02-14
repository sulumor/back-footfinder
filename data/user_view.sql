CREATE VIEW user_view AS
SELECT
    user.id AS user_id,
    user.firstname,
    user.lastname,
    user.email,
    user.role_id,
    role.label AS role_label,
    
FROM
    "user" 
    
JOIN
    "role"  ON user.role_id = role.id;
