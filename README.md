# Electronic-Overtime-System
**A tool for keeping track of employees' overtime hours**

## TODO:
- Delete dummy accounts on production database
- ~Add email field to registration form~
- Make email field notNullable in knex schema
- Fix error that's prohibitting session-creation when users register or log in.
It works on the development server, but not on the production server.
- Fix frontend deployment error; Zeit doesn't like my Elm components. As such, when you visit the site,
you're presented with an older version of the app.

<hr>

_Note to self_: Here's the command to run a migration on heroku: 

`heroku run knex --knexfile=./api/knexfile.js migrate:latest -a electronic-overtime-system`
