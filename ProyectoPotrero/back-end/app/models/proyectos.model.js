const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProyectosSchema = mongoose.Schema(
  {
    nombreAlumno: {
      type: String,
    },
    VistaPrevia: String,
    url: String,
    Grupo: [mongoose.Schema.Types.ObjectId],
    nombreProyecto: {
      type: String,
    },
    Destacado: Boolean,
    Evaluado: Boolean,
    urlLinkedin: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ProyectosSchema.plugin(mongoosePaginate)
ProyectosSchema.index({
  nombreAlumno: 'text',
  VistaPrevia: 'text',
  url: 'text',
  Grupo: 'text',
  nombreProyecto: 'text',
  Destacado: 'text',
  Evaluado: 'text',
  urlLinkedin: 'text',
})

const myModel = (module.exports = mongoose.model('Proyectos', ProyectosSchema, 'proyectos'))
myModel.schema = ProyectosSchema
