# Electronic-Overtime-System
**A tool for keeping track of employees' overtime hours**

## TODO:
- Delete dummy accounts on production database
- Make email field notNullable in knex schema
- Fix error that's prohibitting session-creation when users register or log in.
It works on the development server, but not on the production server.

<hr>

Deployed backend URL: https://electronic-overtime-system.herokuapp.com/

_Note to self_: Here's the command to run a migration on heroku: 

`heroku run knex --knexfile=./api/knexfile.js migrate:latest -a electronic-overtime-system`
