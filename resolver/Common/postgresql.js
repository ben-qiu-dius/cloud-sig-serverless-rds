const { Client } = require('pg')
const AWS = require('aws-sdk')
const fs = require('fs')

const generateToken = () => {
  const signer = new AWS.RDS.Signer({
    region: 'ap-northeast-1',
    hostname: process.env.POSTGRES_PROXY_HOST,
    port: 5432,
    username: process.env.USERNAME,
  })

  const token = signer.getAuthToken({
    username: process.env.USERNAME,
  })
  return token
}

exports.init = async (client) => {
  var res = await client.query(`
    CREATE TABLE IF NOT EXISTS users
    (
        id serial not null PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null,
        name varchar(100) not null
    );
    `)
  await client.query(`
    CREATE TABLE IF NOT EXISTS posts
    (
        id serial not null PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null,
        text varchar(100) not null,
        user_id INT not null
    );
    `)
}
exports.getUser = async (client, uuid) => {
  var user = {}
  var userFromDb = await client.query(
    `
    select id, uuid, name from users where uuid = $1
    `,
    [uuid]
  )
  if (userFromDb.rows.length == 0) {
    return null
  }
  var postsFromDb = await client.query(
    `
    select uuid, text from posts where user_id = $1
    `,
    [userFromDb.rows[0].id]
  )

  user.UUID = userFromDb.rows[0].uuid
  user.Name = userFromDb.rows[0].name

  if (postsFromDb.rows.length > 0) {
    user.Posts = postsFromDb.rows.map(function (x) {
      return { UUID: x.uuid, Text: x.text }
    })
  }

  return user
}

exports.clientFor = (name) => {
  const host =
    name === 'aurora'
      ? process.env.AURORA_HOST
      : name === 'postgres'
      ? process.env.POSTGRES_HOST
      : process.env.POSTGRES_PROXY_HOST
  const port =
    name === 'aurora'
      ? process.env.AURORA_PORT
      : name === 'postgres'
      ? process.env.POSTGRES_PORT
      : process.env.POSTGRES_PROXY_PORT
  return new Client({
    host,
    port,
    // ssl: { rejectUnauthorized: false, ca: fs.readFileSync(`${__dirname}/rds-combined-ca-bundle.pem`).toString() },
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    // password: name === 'proxy' ? generateToken() : process.env.PASSWORD,
    password: process.env.PASSWORD,
  })
}
