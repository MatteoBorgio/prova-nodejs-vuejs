<script setup>
// serve per creare variabili reattive
import { ref } from 'vue';

const taskList = ref([]);
const inputText = ref('');

async function addTask() {
  const res = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: inputText.value})
  });
  const savedTask = await res.json();
  taskList.value.push(savedTask);
  inputText.value = '';
}
</script>

<template>
  <div class="container">
    <h1>To do list</h1>

    <input v-model="inputText" placeholder="Text..." />

    <button @click="addTask()">Save</button>

    <ul>
      <li v-for="task in taskList" :key="task.id">
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
}
li {
  margin: 5px 0;
  padding: 10px;
  list-style: none;
}
</style>