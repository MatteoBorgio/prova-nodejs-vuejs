<script setup>
import { ref, onMounted } from 'vue'; // 1. Importiamo onMounted

const taskList = ref([]);
const inputText = ref('');

// Funzione per caricare i task dal Database
async function fetchTasks() {
  try {
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    taskList.value = data;
  } catch (error) {
    console.error("Errore nel caricamento:", error);
  }
}

// Funzione per aggiungere un task
async function addTask() {
  if (!inputText.value) return; // Evitiamo task vuoti

  try {
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: inputText.value})
    });

    const savedTask = await res.json();

    // Aggiungiamo alla lista il task che arriva dal server (che ha già l'_id)
    taskList.value.push(savedTask);
    inputText.value = '';
  } catch (error) {
    console.error("Errore nel salvataggio:", error);
  }
}

// 2. Appena il componente è pronto, carichiamo i dati
onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div class="container">
    <h1>To do list</h1>

    <input
        v-model="inputText"
        placeholder="Text..."
        @keyup.enter="addTask"
    />

    <button @click="addTask()">Save</button>

    <ul>
      <li v-for="task in taskList" :key="task._id">
        {{ task.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  font-family: sans-serif;
}
input {
  padding: 8px;
  margin-right: 5px;
}
button {
  padding: 8px 15px;
  cursor: pointer;
}
li {
  margin: 5px 0;
  padding: 10px;
  list-style: none;
  background-color: #f4f4f4; /* Un po' di stile per vedere meglio i blocchi */
  border-radius: 4px;
}
</style>