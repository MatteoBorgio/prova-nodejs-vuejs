import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

let tasks = []

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks)
})

// POST /tasks
app.post('/tasks', (req, res) => {
    const { text } = req.body
    if (!text) {
        return res.status(400).json({ error: 'text is required' })
    }
    const newTask = {
        id: Date.now(),
        text
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

// Avvio server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
