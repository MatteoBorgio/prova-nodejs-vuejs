const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let tasks = []

app.get('/tasks', (req, res) => {
    res.json(tasks)
})
app.post('/tasks', (req, res) => {
    const newTask = {
        text: req.body.text,
        id: Date.now()
    };
    tasks.push(newTask)
    res.json(tasks)
})

app.listen(3000, () => {
    console.log(`Server started on port 3000`)
})