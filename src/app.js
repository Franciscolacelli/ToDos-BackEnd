// IMPORTS
const express = require('express');
const db = require('./utils/database');
const Todos = require('./models/todos.models');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
// -----

// CONECT and SINCRON DB
db.authenticate()
.then(() => console.log("Base de datos conectada"))
.catch((error) => console.log(error));

db.sync()
    .then(() => console.log("Base de datos sincronozada"))
    .catch(error => console.log(error))
// -----

const app = express();

app.use(cors());
app.use(express.json());


// CREAR
app.post('/api/v1/todos', async (req, res) => {
    try {
        const newTodos = req.body;
        await Todos.create(newTodos);
        res.status(201).send();
    } catch (error) {
        res.status(400).json(error);
    }
    });


// OBTENEER
app.get('/api/v1/todos', async (req, res) => {
    try {
     const todos = await Todos.findAll();
     res.json(todos)
    } catch (error) {
     res.status(400).json(error);
    }
 });


// ACTUALIZAR
app.put('/api/v1/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;
        await Todos.update({title, description, completed}, {
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
    res.status(400).json(error);
    }
});


// ELIMINAR
app.delete('/api/v1/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Todos.destroy({
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
    res.status(400).json(error);
}
});



// RUTA NO ENCONTRADA
app.use((req,res) => {
    res.send('No se encontro tu pagina')
})

// SERVIDOR ESCUCHANDO
app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`)
 }); 