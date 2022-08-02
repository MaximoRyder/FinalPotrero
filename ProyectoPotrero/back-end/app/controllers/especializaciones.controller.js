const Especializaciones = require('../models/especializaciones.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Especializacion
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (options.req.files && options.req.files.LogoUno && options.req.files.LogoUno.data) {
    fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.LogoUno.name}`, options.req.files.LogoUno.data)
    updatedData['LogoUno'] = options.req.files.LogoUno.name
  }
  if (typeof data.Texto !== 'undefined') updatedData['Texto'] = data.Texto

  if (options.req.files && options.req.files.LogoDos && options.req.files.LogoDos.data) {
    fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.LogoDos.name}`, options.req.files.LogoDos.data)
    updatedData['LogoDos'] = options.req.files.LogoDos.name
  }
  if (typeof data.Url !== 'undefined') updatedData['Url'] = data.Url

  // Create a Especializacion
  const Especializacion = new Especializaciones(updatedData)

  // Save Especializacion in the database
  Especializacion.save()
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

    if (options.req.files && options.req.files.LogoUno && options.req.files.LogoUno.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.LogoUno.name}`, options.req.files.LogoUno.data)
      updatedData['LogoUno'] = options.req.files.LogoUno.name
    }
    if (typeof data.Texto !== 'undefined') updatedData['Texto'] = data.Texto

    if (options.req.files && options.req.files.LogoDos && options.req.files.LogoDos.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.LogoDos.name}`, options.req.files.LogoDos.data)
      updatedData['LogoDos'] = options.req.files.LogoDos.name
    }
    if (typeof data.Url !== 'undefined') updatedData['Url'] = data.Url

    // Create a Especializacion
    const Especializacion = new Especializaciones(updatedData)

    // Save Especializacion in the database
    Especializacion.save()
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

// Retrieve and return all Especializaciones from the database.
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

  Especializaciones.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .then((especializaciones) => {
      options.res.json(paginate.paginate(especializaciones, { page: query.page, limit: query.limit || 10 }))
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
      if (Especializaciones.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Especializaciones.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (
        Especializaciones.schema.path(query.searchField).instance === 'ObjectID' ||
        Especializaciones.schema.path(query.searchField).instance === 'Array'
      ) {
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

    Especializaciones.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .then((especializacion) => {
        resolve(paginate.paginate(especializacion, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Especializacion with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Especializaciones.findById(id)

      .then((especializacion) => {
        if (!especializacion) {
          return options.res.status(404).send({
            message: 'Especializacion not found with id ' + id,
          })
        }
        resolve(paginate.paginate([especializacion]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Especializacion not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Especializacion with id ' + id,
        })
      })
  })
}

// Update a especializacion identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (options.req.files && options.req.files.LogoUno && options.req.files.LogoUno.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.LogoUno.name}`, options.req.files.LogoUno.data)
      updatedData['LogoUno'] = options.req.files.LogoUno.name
    }
    if (typeof data.Texto !== 'undefined') updatedData['Texto'] = data.Texto

    if (options.req.files && options.req.files.LogoDos && options.req.files.LogoDos.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.LogoDos.name}`, options.req.files.LogoDos.data)
      updatedData['LogoDos'] = options.req.files.LogoDos.name
    }
    if (typeof data.Url !== 'undefined') updatedData['Url'] = data.Url

    // Find Especializacion and update it with the request body
    const query = { populate: 'true' }
    Especializaciones.findByIdAndUpdate(id, updatedData, { new: true })

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a especializacion with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Especializaciones.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
