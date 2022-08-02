const Cohortes = require('../models/cohortes.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Cohorte
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.Curso !== 'undefined') updatedData['Curso'] = data.Curso

  if (options.req.files && options.req.files.Img && options.req.files.Img.data) {
    fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.Img.name}`, options.req.files.Img.data)
    updatedData['Img'] = options.req.files.Img.name
  }
  if (typeof data.FechaInicio !== 'undefined') updatedData['FechaInicio'] = data.FechaInicio

  // Create a Cohorte
  const Cohorte = new Cohortes(updatedData)

  // Save Cohorte in the database
  Cohorte.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.Curso !== 'undefined') updatedData['Curso'] = data.Curso

    if (options.req.files && options.req.files.Img && options.req.files.Img.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.Img.name}`, options.req.files.Img.data)
      updatedData['Img'] = options.req.files.Img.name
    }
    if (typeof data.FechaInicio !== 'undefined') updatedData['FechaInicio'] = data.FechaInicio

    // Create a Cohorte
    const Cohorte = new Cohortes(updatedData)

    // Save Cohorte in the database
    Cohorte.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all Cohortes from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Cohortes.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Proyectos') > -1) && {
        strictPopulate: false,
        path: 'Proyectos',
      }
    )

    .then((cohortes) => {
      options.res.json(paginate.paginate(cohortes, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Cohortes.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Cohortes.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Cohortes.schema.path(query.searchField).instance === 'ObjectID' || Cohortes.schema.path(query.searchField).instance === 'Array') {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Cohortes.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Proyectos') > -1) && {
          strictPopulate: false,
          path: 'Proyectos',
        }
      )

      .then((cohorte) => {
        resolve(paginate.paginate(cohorte, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Cohorte with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Cohortes.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Proyectos') > -1) && {
          strictPopulate: false,
          path: 'Proyectos',
        }
      )

      .then((cohorte) => {
        if (!cohorte) {
          return options.res.status(404).send({
            message: 'Cohorte not found with id ' + id,
          })
        }
        resolve(paginate.paginate([cohorte]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Cohorte not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Cohorte with id ' + id,
        })
      })
  })
}

// Update a cohorte identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.Curso !== 'undefined') updatedData['Curso'] = data.Curso

    if (options.req.files && options.req.files.Img && options.req.files.Img.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.Img.name}`, options.req.files.Img.data)
      updatedData['Img'] = options.req.files.Img.name
    }
    if (typeof data.FechaInicio !== 'undefined') updatedData['FechaInicio'] = data.FechaInicio

    // Find Cohorte and update it with the request body
    const query = { populate: 'true' }
    Cohortes.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Proyectos') > -1) && {
          strictPopulate: false,
          path: 'Proyectos',
        }
      )

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a cohorte with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Cohortes.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
