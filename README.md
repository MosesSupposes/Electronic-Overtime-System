# Electronic-Overtime-System
**A tool for keeping track of employees' overtime hours**

## TODO:
- Fix error that's prohibitting session-creation when users register or log in.
It works on the development server, but not on the production server.
_UPDATE_: The auth endpoints now work on the production server when accessed via Postman, but not on
a regular web browser. More specifically on what's actually hapenning: it creates and saves the session, but it doesn't store the token on the session.
<hr>

Deployed backend URL: https://electronic-overtime-system.herokuapp.com/

_Note to self_: Here's the command to run a migration on heroku: 

`heroku run knex --knexfile=./api/knexfile.js migrate:latest -a electronic-overtime-system`

In case you run into this error: `bash: knex not found`, run this command:

`heroku run "npm init -y && npm i knex pg --save && knex --knexfile=./api/knexfile.js migrate:latest" -a electronic-overtime-system`
