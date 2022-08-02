module.exports = (app) => {
  const especializaciones = require('../controllers/especializaciones.controller.js')

  // Get all records
  app.get('/api/especializaciones', (req, res) => {
    especializaciones.findAll({ req, res })
  })

  // Search records
  app.get('/api/especializaciones/search', (req, res) => {
    especializaciones.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/especializaciones/:ID', (req, res) => {
    especializaciones.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/especializaciones', (req, res) => {
    especializaciones
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/especializaciones/:ID', (req, res) => {
    especializaciones
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/especializaciones/:ID', (req, res) => {
    especializaciones
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
