const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./middleware');

const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => console.log("MongoDB database connection established successfully"));

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => err ? console.log(err) : res.json(todos));
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => err ? console.log(err) : res.json(todo));
});

todoRoutes.route('/add').post((req, res, next) => {
    middleware.validateContentType(req, res, next)
}, (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => res.status(200).json({ 'todo': 'todo added successfully' }))
        .catch(err => res.status(400).send('adding new todo failed'));
});

todoRoutes.route('/update/:id').post((req, res, next) => {
    middleware.validateContentType(req, res, next)
}, (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send('cannot find todo with that ID');
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_completed = req.body.todo_completed;

            todo.save()
                .then(todo => res.status(200).json({ 'todo': 'todo updated successfully' }))
                .catch(err => res.status(400).send('Update not possible'));
        }
    });
});

todoRoutes.route('/delete/:id').delete((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send('cannot find todo with that ID');
        } else {
            todo.remove()
                .then(todo => res.status(200).json({ 'todo': 'todo removed successfully' }))
                .catch(err => res.status(400).send('deleting todo failed'));
        }
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));
