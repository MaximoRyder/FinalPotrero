module.exports = (app) => {
  const proyectos = require('../controllers/proyectos.controller.js')

  // Get all records
  app.get('/api/proyectos', (req, res) => {
    proyectos.findAll({ req, res })
  })

  // Search records
  app.get('/api/proyectos/search', (req, res) => {
    proyectos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/proyectos/:ID', (req, res) => {
    proyectos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/proyectos', (req, res) => {
    proyectos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/proyectos/:ID', (req, res) => {
    proyectos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/proyectos/:ID', (req, res) => {
    proyectos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
