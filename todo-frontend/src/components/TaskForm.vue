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

    <!-- Button with colors and spinner -->
    <button
      type="submit"
      :disabled="loading"
      :class="{
        'bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white': !loading,
        'bg-gray-300 text-gray-500': loading
      }"
      class="btn btn-primary p-2 rounded"
    >
      <span v-if="loading" class="loader"></span> <!-- Spinner -->
      <span v-else>Add Task</span>
    </button>

    <!-- Error message -->
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
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
    const loading = ref(false);
    const error = ref('');

    const submitForm = async () => {
      loading.value = true;
      error.value = ''; // Reset error message
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
      } catch (err) {
        error.value = 'Error creating task. Please try again.';
        console.error('Error creating task:', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      title,
      description,
      deadline,
      loading,
      error,
      submitForm,
    };
  },
});
</script>

<style scoped>
/* Add colors to the button */
button:disabled {
  cursor: not-allowed;
}

/* Loader animation */
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
