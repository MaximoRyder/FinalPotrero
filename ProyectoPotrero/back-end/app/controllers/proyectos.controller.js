const Proyectos = require('../models/proyectos.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Proyecto
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.nombreAlumno !== 'undefined') updatedData['nombreAlumno'] = data.nombreAlumno

  if (options.req.files && options.req.files.VistaPrevia && options.req.files.VistaPrevia.data) {
    fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.VistaPrevia.name}`, options.req.files.VistaPrevia.data)
    updatedData['VistaPrevia'] = options.req.files.VistaPrevia.name
  }
  if (typeof data.url !== 'undefined') updatedData['url'] = data.url

  updatedData['Grupo'] = []
  try {
    const Cohortes = require('../controllers/cohortes.controller.js')
    let ReceivedGrupo = typeof data.Grupo === 'string' ? JSON.parse(data.Grupo) : data.Grupo
    GrupoRaw = Array.isArray(ReceivedGrupo) ? ReceivedGrupo : [ReceivedGrupo]
    GrupoRaw.forEach((Grupoinfo) => {
      const GrupoFiles = {}

      if (!Grupoinfo._id) {
        const GrupoID = require('mongoose').Types.ObjectId()

        Object.keys(Grupoinfo).forEach((info) => {
          if (Grupoinfo[info] && typeof Grupoinfo[info] === 'object' && typeof Grupoinfo[info].Curso === 'string') {
            GrupoFiles[info] = Grupoinfo[info]
          }
        })

        let req = options.req
        req.body = { ...Grupoinfo, _id: GrupoID }
        req.files = { ...GrupoFiles }
        Cohortes.createAsPromise({ req, res: options.res })
        updatedData['Grupo'].push(GrupoID)
      } else {
        updatedData['Grupo'].push(Grupoinfo._id)
      }
    })
  } catch (e) {
    updatedData['Grupo'] = data.Grupo
  }

  if (typeof data.nombreProyecto !== 'undefined') updatedData['nombreProyecto'] = data.nombreProyecto

  if (typeof data.Destacado !== 'undefined') updatedData['Destacado'] = data.Destacado

  if (typeof data.Evaluado !== 'undefined') updatedData['Evaluado'] = data.Evaluado

  if (typeof data.urlLinkedin !== 'undefined') updatedData['urlLinkedin'] = data.urlLinkedin

  // Create a Proyecto
  const Proyecto = new Proyectos(updatedData)

  // Save Proyecto in the database
  Proyecto.save()
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

    if (typeof data.nombreAlumno !== 'undefined') updatedData['nombreAlumno'] = data.nombreAlumno

    if (options.req.files && options.req.files.VistaPrevia && options.req.files.VistaPrevia.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.VistaPrevia.name}`, options.req.files.VistaPrevia.data)
      updatedData['VistaPrevia'] = options.req.files.VistaPrevia.name
    }
    if (typeof data.url !== 'undefined') updatedData['url'] = data.url

    updatedData['Grupo'] = []
    try {
      const Cohortes = require('../controllers/cohortes.controller.js')
      let ReceivedGrupo = typeof data.Grupo === 'string' ? JSON.parse(data.Grupo) : data.Grupo
      GrupoRaw = Array.isArray(ReceivedGrupo) ? ReceivedGrupo : [ReceivedGrupo]
      GrupoRaw.forEach((Grupoinfo) => {
        const GrupoFiles = {}

        if (!Grupoinfo._id) {
          const GrupoID = require('mongoose').Types.ObjectId()

          Object.keys(Grupoinfo).forEach((info) => {
            if (Grupoinfo[info] && typeof Grupoinfo[info] === 'object' && typeof Grupoinfo[info].Curso === 'string') {
              GrupoFiles[info] = Grupoinfo[info]
            }
          })

          let req = options.req
          req.body = { ...Grupoinfo, _id: GrupoID }
          req.files = { ...GrupoFiles }
          Cohortes.createAsPromise({ req, res: options.res })
          updatedData['Grupo'].push(GrupoID)
        } else {
          updatedData['Grupo'].push(Grupoinfo._id)
        }
      })
    } catch (e) {
      updatedData['Grupo'] = data.Grupo
    }

    if (typeof data.nombreProyecto !== 'undefined') updatedData['nombreProyecto'] = data.nombreProyecto

    if (typeof data.Destacado !== 'undefined') updatedData['Destacado'] = data.Destacado

    if (typeof data.Evaluado !== 'undefined') updatedData['Evaluado'] = data.Evaluado

    if (typeof data.urlLinkedin !== 'undefined') updatedData['urlLinkedin'] = data.urlLinkedin

    // Create a Proyecto
    const Proyecto = new Proyectos(updatedData)

    // Save Proyecto in the database
    Proyecto.save()
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

// Retrieve and return all Proyectos from the database.
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

  Proyectos.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Cohortes') > -1) && {
        strictPopulate: false,
        model: 'Cohortes',
        path: 'Grupo',
      }
    )

    .then((proyectos) => {
      options.res.json(paginate.paginate(proyectos, { page: query.page, limit: query.limit || 10 }))
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
      if (Proyectos.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Proyectos.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Proyectos.schema.path(query.searchField).instance === 'ObjectID' || Proyectos.schema.path(query.searchField).instance === 'Array') {
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

    Proyectos.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Cohortes') > -1) && {
          strictPopulate: false,
          model: 'Cohortes',
          path: 'Grupo',
        }
      )

      .then((proyecto) => {
        resolve(paginate.paginate(proyecto, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Proyecto with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Proyectos.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Cohortes') > -1) && {
          strictPopulate: false,
          model: 'Cohortes',
          path: 'Grupo',
        }
      )

      .then((proyecto) => {
        if (!proyecto) {
          return options.res.status(404).send({
            message: 'Proyecto not found with id ' + id,
          })
        }
        resolve(paginate.paginate([proyecto]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Proyecto not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Proyecto with id ' + id,
        })
      })
  })
}

// Update a proyecto identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.nombreAlumno !== 'undefined') updatedData['nombreAlumno'] = data.nombreAlumno

    if (options.req.files && options.req.files.VistaPrevia && options.req.files.VistaPrevia.data) {
      fs.writeFileSync(`${options.req.app.get('filesFolder')}/${options.req.files.VistaPrevia.name}`, options.req.files.VistaPrevia.data)
      updatedData['VistaPrevia'] = options.req.files.VistaPrevia.name
    }
    if (typeof data.url !== 'undefined') updatedData['url'] = data.url

    updatedData['Grupo'] = []
    try {
      const Cohortes = require('../controllers/cohortes.controller.js')
      let ReceivedGrupo = typeof data.Grupo === 'string' ? JSON.parse(data.Grupo) : data.Grupo
      GrupoRaw = Array.isArray(ReceivedGrupo) ? ReceivedGrupo : [ReceivedGrupo]
      GrupoRaw.forEach((Grupoinfo) => {
        const GrupoFiles = {}

        if (!Grupoinfo._id) {
          const GrupoID = require('mongoose').Types.ObjectId()

          Object.keys(Grupoinfo).forEach((info) => {
            if (Grupoinfo[info] && typeof Grupoinfo[info] === 'object' && typeof Grupoinfo[info].Curso === 'string') {
              GrupoFiles[info] = Grupoinfo[info]
            }
          })

          let req = options.req
          req.body = { ...Grupoinfo, _id: GrupoID }
          req.files = { ...GrupoFiles }
          Cohortes.createAsPromise({ req, res: options.res })
          updatedData['Grupo'].push(GrupoID)
        } else {
          updatedData['Grupo'].push(Grupoinfo._id)
        }
      })
    } catch (e) {
      updatedData['Grupo'] = data.Grupo
    }

    if (typeof data.nombreProyecto !== 'undefined') updatedData['nombreProyecto'] = data.nombreProyecto

    if (typeof data.Destacado !== 'undefined') updatedData['Destacado'] = data.Destacado

    if (typeof data.Evaluado !== 'undefined') updatedData['Evaluado'] = data.Evaluado

    if (typeof data.urlLinkedin !== 'undefined') updatedData['urlLinkedin'] = data.urlLinkedin

    // Find Proyecto and update it with the request body
    const query = { populate: 'true' }
    Proyectos.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Cohortes') > -1) && {
          strictPopulate: false,
          model: 'Cohortes',
          path: 'Grupo',
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

// Delete a proyecto with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Proyectos.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
