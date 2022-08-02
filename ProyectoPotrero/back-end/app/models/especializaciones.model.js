const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const EspecializacionesSchema = mongoose.Schema(
  {
    LogoUno: String,
    Texto: {
      type: String,
    },
    LogoDos: String,
    Url: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

EspecializacionesSchema.plugin(mongoosePaginate)
EspecializacionesSchema.index({
  LogoUno: 'text',
  Texto: 'text',
  LogoDos: 'text',
  Url: 'text',
})

const myModel = (module.exports = mongoose.model('Especializaciones', EspecializacionesSchema, 'especializaciones'))
myModel.schema = EspecializacionesSchema
