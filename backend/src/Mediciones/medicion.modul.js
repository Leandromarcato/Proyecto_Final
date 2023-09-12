const {Schema,model} = require('mongoose')

const medicioneSchema = new Schema({
    temperatura:{
        type: 'number',
        required: true
    },
    precion:{
        
    },
    profundidad:{
    } ,
    


})





module.exports= model('mediciones', medicioneSchema)