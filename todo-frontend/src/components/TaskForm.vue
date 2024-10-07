<template>
    <form @submit.prevent="submitForm" class="flex flex-col">
      <input
        v-model="title"
        type="text"
        placeholder="Task Title"
        required
        class="p-2 border rounded mb-2"
      />
      <textarea
        v-model="description"
        placeholder="Task Description"
        class="p-2 border rounded mb-2"
      ></textarea>
      <input
        v-model="deadline"
        type="datetime-local"
        required
        class="p-2 border rounded mb-2"
      />
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { createTask } from '../services/api';
  
  export default defineComponent({
    emits: ['taskCreated'],
    setup(props, { emit }) {
      const title = ref('');
      const description = ref('');
      const deadline = ref('');
  
      const submitForm = async () => {
        try {
          const newTask = {
            title: title.value,
            description: description.value,
            deadline: new Date(deadline.value),
          };
          await createTask(newTask);
          emit('taskCreated');
          // Reset form
          title.value = '';
          description.value = '';
          deadline.value = '';
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };
  
      return {
        title,
        description,
        deadline,
        submitForm,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  