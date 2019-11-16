const mongoose = require('mongoose');

//coneccion a la base de datos
const URI = 'mongodb://127.0.0.1/vuejfullstackdb';

mongoose.connect(URI, { useNewUrlParser: true })
.then(db=>{
    console.log('Conexion a MongoDB exitosa con mongoose.');
    console.log(`Nombre de la base de datos para modo development ${URI}`);
})
.catch(err => console.console.error(err));

module.exports = mongoose;