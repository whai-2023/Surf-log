const { table } = require("console")

exports.up = function (knex) {
  return knex.schema.createTable('locations', table => {
    table.increments('id')
    table.string('location')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('locations')
}