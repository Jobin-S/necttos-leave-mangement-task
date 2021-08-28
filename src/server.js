const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const routes = require('./routes')
// DB connection

mongoose.connect("mongodb+srv://nodeapp:us9dKjttoOlk2Lko@cluster0.asqjh.mongodb.net/TEST?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },)
.then(()=>fastify.log.info('MONGODB CONNECTED!!'))
.catch(err => console.log('DB Connection ERR ', err))

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'Task API' }
})

routes.forEach(route => {
    fastify.route(route)
});


// Run the server!
const PORT = process.env.PORT || 4000
const start = async () => {
  try {
    await fastify.listen(PORT)
    .then(`SERVER STARTED AT ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()