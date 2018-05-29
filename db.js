const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  }
})

const initDB = async() => {
  const usersExist = await knex.schema.hasTable('users')
  if (!usersExist) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('email')
      table.string('passwd')
      table.string('role')
      table.string('unit') // metric // imperial
      table.string('timezone')
    })
  }
  const runsExist = await knex.schema.hasTable('runs')
  if (!runsExist) {
    await knex.schema.createTable('runs', table => {
      table.increments('id').primary()
      table.integer('user_id')
      table.string('friendly_name')
      table.integer('duration') // in seconds
      table.timestamp('created') // utc
      table.integer('distance') // meters
    })
  }
  const totalUsers = await knex('users').select(knex.raw('count(*) as total'))
  if (totalUsers[0].total === 0) {
    await knex.insert({
      name: 'Admin',
      email: 'admin@email.com',
      passwd: 'admin',
      role: 'admin',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }).into('users')
    await knex.insert({
      name: 'User',
      email: 'user@email.com',
      passwd: 'user',
      role: 'user',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }).into('users')
  }
}
initDB()

module.exports = knex
