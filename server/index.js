import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// --- CONFIGURAZIONE DATABASE ---

// Inserisci qui la tua password reale al posto di LA_TUA_PASSWORD_VERA
const password = '1234'

// Costruiamo la stringa con il tuo indirizzo specifico (cluster0.zakurtm...)
const MONGODB_URI = `mongodb+srv://admin:${password}@cluster0.zakurtm.mongodb.net/todo-app?appName=Cluster0`

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connesso a MongoDB Atlas con successo!'))
    .catch(err => {
        console.error('❌ Errore di connessione a Mongo:', err)
    })

// --- MODELLO ---

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Task = mongoose.model('Task', taskSchema)

// --- ROTTE ---

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/tasks', async (req, res) => {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'text is required' })

    try {
        const newTask = new Task({ text })
        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})