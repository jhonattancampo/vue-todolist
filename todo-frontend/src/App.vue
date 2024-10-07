<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">ToDo List</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from './components/TaskList.vue';

export default defineComponent({
  components: {
    TaskList,
  },
});
</script>

<style>
/* Add global styles here if needed */
</style>
