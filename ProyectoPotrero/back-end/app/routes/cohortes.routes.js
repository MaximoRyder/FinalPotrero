module.exports = (app) => {
  const cohortes = require('../controllers/cohortes.controller.js')

  // Get all records
  app.get('/api/cohortes', (req, res) => {
    cohortes.findAll({ req, res })
  })

  // Search records
  app.get('/api/cohortes/search', (req, res) => {
    cohortes.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/cohortes/:ID', (req, res) => {
    cohortes.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/cohortes', (req, res) => {
    cohortes
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/cohortes/:ID', (req, res) => {
    cohortes
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/cohortes/:ID', (req, res) => {
    cohortes
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
