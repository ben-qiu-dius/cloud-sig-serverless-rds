var common = require('../Common/postgresql')
exports.auroraGetUser = async (_, { uuid }) => {
    const client = common.clientFor('aurora')
    client.connect()
    await common.init(client)
    var resp = await common.getUser(client, uuid);
    client.end()
    return resp;
}

exports.postgresGetUser = async (_, { uuid }) => {
  const client = common.clientFor('prostgres')
  client.connect()
  await common.init(client)
  var resp = await common.getUser(client, uuid);
  client.end()
  return resp;
}

exports.proxyGetUser = async (_, { uuid }) => {
  const client = common.clientFor('proxy')
  client.connect()
  await common.init(client)
  var resp = await common.getUser(client, uuid);
  client.end()
  return resp;
}