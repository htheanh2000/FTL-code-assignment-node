// A serious vulnerability exists in the following SQL statement.
// Please briefly describe what issue it may caused and how to fix it.
// No need to code.

/**
 * @param {Object}
 * {
 *   permission: String
 *   id: Number
 * }
 */
function updateUserPermission({ permission, id }) {
  mysql.query(`UPDATE users SET permission = ${permission} WHERE id=${id}`)
}

updateUserPermission({ permission: 'admin', id: 1 })


// Answer: This is one of very common vulnerability: SQL Injection.

// For example, if an attacker sets permission to admin'; DROP TABLE users; --, 
// it could result in executing a malicious SQL command that drops the users table,
// leading to data loss.

// Solution:
// Validate query parameters 
// Using ORM to create query
