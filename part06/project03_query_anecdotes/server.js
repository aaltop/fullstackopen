import server_config from "./src/services/config.js"
const { SERVER_PORT } = server_config

import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  console.log()

  const { content } = request.body

  if (request.method==='POST' && (!content || content.length<5) ) {
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more'
    })
  } else {
    next()
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(SERVER_PORT, () => {
  console.log('JSON Server is running')
})
