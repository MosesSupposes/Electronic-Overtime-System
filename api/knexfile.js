// Update with your config settings.

module.exports = {

  development: {    
    client: 'sqlite3',
    connection: { 
      filename: './database/electronic-overtime-system-dev.db3' 
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/development/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { 
      directory: './database/development/seeds' 
    },
  },

  testing: {
    client: 'sqlite3',
    connection: { 
      filename: './database/electronic-overtime-system-testing.db3' 
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/testing/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { 
      directory: './database/testing/seeds' 
    },
  },
  
  staging: {
    client: 'postgresql',
    connection: "postgres://localhost/electronic-overtime-system",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/development/migrations',
    },
    seeds: {
      directory: './database/development/seeds',
    }
  },

  production: {
    client: 'postgresql',
    connection: "postgres://localhost/electronic-overtime-system",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/production/migrations',
    },
    seeds: {
      directory: './database/production/seeds',
    }
  }

};
