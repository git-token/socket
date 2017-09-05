
/**
 * NOTE If running the server using NodeJS instead of docker-compose, uncomment the line
 * below to read the .env file and map to config
 */

 require('dotenv').config({ path: `${process.cwd()}/.env`})

/**
 * Configuration file for GitToken Socket instance
 * This file parses the environment variable passed to the docker-compose.yml
 * env_file field, then exports the configuration to be used in the application.
 * @type {Object}
 */


const config = {
  socketPort: process.env['SOCKET_PORT'],
  socketUri: process.env['SOCKET_URI'],
  mysqlHost: process.env['MYSQL_HOST'],
  mysqlUser: process.env['MYSQL_USER'],
  mysqlDatabase: process.env['MYSQL_DATABASE'],
  mysqlRootPassword: process.env['MYSQL_ROOT_PASSWORD']
}

module.exports = config
