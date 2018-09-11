db.createUser({ // Función de la BD para generalmente crear usuarios
    user: 'ANDRES', // Nombre de usuario
    pwd: '333', // Contraseña del usuario
    roles: ['readWrite', 'dbAdmin'] 
    // Los roles o operaciones del usuario van dentro de un arreglo de JS
    // El usuario puede leer y escribir, Y es un usuario administrador por lo tanto
    // tiene los permisos de administrador
})

db.clientes.insert()
// db hace referencia a la base de datos "misclientes"
// creo una coleccion de clientes e inserto datos

db.clientes.insert({
    firstName: 'Isaac',
    lastName: 'Asimov'
})
// Y entre llaves los datos al igual que el usuario,
// este cliente(objeto) tiene propiedades firstName y lastName
// entonces se lee como en la bd tendre una coleccion de clientes y dentro 
// voy a insertar algo, un objeto de javascript con sus propiedades first Name y lastName

WriteResult({ "nInserted" : 1 })
// La ejecución retorna esto y es que ya lo ha insertado
// Y ahora que la base de datos tiene datos puedo visualizarla en la lista de dbs

db.clientes.find()
// Para poder ver los datos que he almacenado en esta colección

db.clientes.insert([
    { firstName: 'Isaac', lastName: 'Asimov' },
    { firstName: 'Elena', lastName: 'Soraya' },
    { firstName: 'Joe', lastName: 'McMillan' }
])
// De esta forma insertamos estos 3 clientes(objetos) utilizando un array

BulkWriteResult({ // Ha insertado un bloque de datos
	"writeErrors" : [ ],
	"writeConcernErrors" : [ ],
	"nInserted" : 3, // cantidad de datos
	"nUpserted" : 0,
	"nMatched" : 0,
	"nModified" : 0,
	"nRemoved" : 0,
	"upserted" : [ ]
})
// Esto retorna la ejecución de la función de arriba (Línea 30)

db.clientes.find({firstName: 'Isaac'})
// Consulta que retorna objetos según la propiedad,
// mostrar mientrás fistName = Isaac
db.clientes.update(
    {lastName: 'Asimov'},// Propiedad que estoy buscando la cúal voy a reemplazar
    {
        firstName: 'Isaac',
        apellido: "Soraya",
        gender: 'female'
    }
)
// Se puede reemplazar incluso el nombre de propiedades o insertando más valor o quitandoselo

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
// 1 encontrado y 1 modificado

db.clientes.find().pretty()
// Muestra los datos más legibles, bonitos, como objetos

db.clientes.find({_id: ObjectId("5b305fd7797e31d00d8d37fb")})
// Cuando buscamos por _id debemos ingresarlo así

db.customers.update(
    {_id: ObjectId("5b305fd7797e31d00d8d37fb")},
    {
        firstName: 'Isaac',
        lastName: 'Delahaye',
        gender: 'male'
    }
)
// No lo encuentra ya que estoy buscando en la colección equivocada

db.clientes.update(
    {_id: ObjectId("5b305fd7797e31d00d8d37fb")},
    {
        firstName: 'Isaac',
        lastName: 'Delahaye',
        gender: 'male'
    }
)
// Ahora si

db.clientes.update(
    {_id: ObjectId("5b305fd7797e31d00d8d37fb")},
    {
        $set: {age: 45}
    }
)
// $set permite agregar una propiedad en lugar de alterar o pasar todo completo

db.clientes.update(
    {_id: ObjectId("5b305fd7797e31d00d8d37fb")},
    {
        $inc: {age: 5}
    }
)
// $inc permite incrementar un dato numerico como edad, puntos, años, etc.
// o $inc -1 si se desea disminuir 1

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
// Retorna la consola que a concidido un dato y a modificado un dato

db.clientes.update(
    {_id: ObjectId("5b305fd7797e31d00d8d37fb")},
    {
        $unset: {age: 1}
    }
)
// $unset permite eliminar una propiedad o dato
// es como decir que unset para age es true con el 1, así eliminandola o quitandola

db.clientes.update(
    {
        firstName: 'Elena'
    },
    {
        firstName: 'Elena',
        lastName: 'Delahaye'
    }
    , {upsert: true}
)
// Aquí todo normal ya que encuentra 1 y lo modifica

db.clientes.update(
    {
        firstName: 'Aaron'
    },
    {
        firstName: 'Aaron',
        lastName: 'Delahaye'
    }
    , {upsert: true}
)

WriteResult({
	"nMatched" : 0,
	"nUpserted" : 1,
	"nModified" : 0,
	"_id" : ObjectId("5b31843da26a1907bbd45eae")
})
// Retorna que no a coincidido con ninguno pero si que lo a creado
// eso es lo que hacer upsert

db.clientes.update(
    {firstName: "Aaron"},
    {
        $rename: {"firstName": "primerNombre"}
    }
)
// $rename, modificador para renombrar un dato

db.clientes.remove(
    {primerNombre: "Aaron"}
)
// Elimina el dato o objeto por el parametro de busqueda

db.clientes.remove(
    {firstName: "Isaac"},
    {justOne: true}
)
// Elimina solo 1

db.clientes.find(
    {$or: [{firstName: "Joe"}, {firstName: "Isaac"}]}
)
// Muestra todos clientes que tengan el nombre Joe o Isaac

db.clientes.find(
    {gender: "male"}
)
// Muestra a los que su genero sea "male"

db.clientes.insert(
    [
        {name: "Alejandro", age: 20},
        {name: "Maria", age: 30},
        {name: "Jose", age: 81},
    ]
)
// Inserto datos para el ejemplo con la busqueda por edades

db.clientes.find(
    {age: {$gt: 20}}
)
// gt = grater than o mayor que
// $gt muestra los objetos con la propiedad de age que sea mayor a 20

db.clientes.find(
    {age: {$lt: 30}}
)
// lt = less than o menor que
// $lt muestra los objetos con la propiedad de age que sea menor a 30

db.clientes.find(
    {age: {$gt: 18, $lt: 30}}
)
// Utilizando los 2 al mismo tiempo

db.clientes.insert(
    {
        firstName: "Zack",
        address: {
            city: "London",
            number: 33
        }
    }
)
db.clientes.find(
    {"address.city": "London"}
)
// Una propiedad con propiedades, Wow!

db.clientes.find(
    {name: {$regex: 'a'}}
)
// $regex busca utilizando las expresiones regulares de js,
// entre todos los objetos la propiedad "name" que contenga a

db.clientes.find().sort(
    {
        lastName: 1
    }
)
// sort ordena los datos
// 1 es ascendentemente y -1 descendentemente

db.clientes.count()
// retorna la cantidad de clientes que hay

db.clientes.find(
    {age: {$gt: 18}}
).count()
// Primero busca las personas que son mayor a 18
// y las cuenta, así utilizando 2 funciones de mongo

db.clientes.find().limit(3)
// Limitara la cantidad de datos que se muestren a 3

db.clientes.find().limit(4).sort({name: -1})
// Encadenando metodos

db.clientes.find().forEach(
    function(doc){
        print(doc.name)
    }
)
// Utiliza y retorna el nombre del documento y 
// para los datos que si existe el name me retorna los nombres
// Se pueden utilizar funciones de JS