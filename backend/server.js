const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => console.log("MongoDB database connection established successfully"));

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));

const todoRoutes = express.Router();
app.use('/todos', todoRoutes);

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => err ? console.log(err) : res.json(todos));
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => err ? console.log(err) : res.json(todo));
});

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => res.status(200).json({ 'todo': 'todo added successfully' }))
        .catch(err => res.status(400).send('adding new todo failed'));
});
