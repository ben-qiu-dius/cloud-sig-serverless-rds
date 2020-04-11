const uuidv4 = require('uuid/v4')
const common = require('../Common/postgresql')

exports.auroraCreateUser = async (_, obj) => {
  const client = common.clientFor('aurora')
  client.connect()
  await common.init(client)
  var userUUID = uuidv4()
  let userInserted = await client.query('INSERT INTO users (uuid, name) VALUES($1, $2) RETURNING id', [
    userUUID,
    obj.input.Name,
  ])

  var userId = userInserted.rows[0].id
  for (let index = 0; index < obj.input.Posts.length; index++) {
    const element = obj.input.Posts[index]
    await client.query('INSERT INTO posts (uuid, text, user_id) VALUES($1, $2, $3)', [uuidv4(), element.Text, userId])
  }
  var resp = await common.getUser(client, userUUID)
  client.end()
  return resp
}

exports.postgresCreateUser = async (_, obj) => {
  const client = common.clientFor('postgres')
  client.connect()
  await common.init(client)
  var userUUID = uuidv4()
  let userInserted = await client.query('INSERT INTO users (uuid, name) VALUES($1, $2) RETURNING id', [
    userUUID,
    obj.input.Name,
  ])

  var userId = userInserted.rows[0].id
  for (let index = 0; index < obj.input.Posts.length; index++) {
    const element = obj.input.Posts[index]
    await client.query('INSERT INTO posts (uuid, text, user_id) VALUES($1, $2, $3)', [uuidv4(), element.Text, userId])
  }
  var resp = await common.getUser(client, userUUID)
  client.end()
  return resp
}

exports.proxyCreateUser = async (_, obj) => {
  const client = common.clientFor('proxy')
  client.connect()
  await common.init(client)
  var userUUID = uuidv4()
  let userInserted = await client.query('INSERT INTO users (uuid, name) VALUES($1, $2) RETURNING id', [
    userUUID,
    obj.input.Name,
  ])

  var userId = userInserted.rows[0].id
  for (let index = 0; index < obj.input.Posts.length; index++) {
    const element = obj.input.Posts[index]
    await client.query('INSERT INTO posts (uuid, text, user_id) VALUES($1, $2, $3)', [uuidv4(), element.Text, userId])
  }
  var resp = await common.getUser(client, userUUID)
  client.end()
  return resp
}
