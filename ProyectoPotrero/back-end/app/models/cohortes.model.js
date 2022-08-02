const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CohortesSchema = mongoose.Schema(
  {
    Curso: {
      type: String,
    },
    Img: String,
    FechaInicio: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

CohortesSchema.plugin(mongoosePaginate)
CohortesSchema.index({
  Curso: 'text',
  Img: 'text',
  FechaInicio: 'text',
})

const myModel = (module.exports = mongoose.model('Cohortes', CohortesSchema, 'cohortes'))
myModel.schema = CohortesSchema
