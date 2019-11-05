# Electronic-Overtime-System
**A tool for keeping track of employees' overtime hours**

## TODO:
- Delete dummy accounts on production database
- ~Add email field to registration form~
- Make email field notNullable in knex schema
- Fix error that's not creating a session when users register or log in

<hr>

_Note to self_: Here's the command to run a migration on heroku: 

`heroku run knex --knexfile=./api/knexfile.js migrate:latest -a electronic-overtime-system`
