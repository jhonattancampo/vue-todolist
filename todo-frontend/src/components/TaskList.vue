<template>
    <div>
      <TaskForm @taskCreated="fetchTasks" />
      <div class="mt-4">
        <TaskSummary :completedCount="completedCount" :pendingCount="pendingCount" />
      </div>
      <div class="mt-4">
        <button @click="sortByDate" class="btn btn-primary">Sort by Deadline</button>
      </div>
      <ul class="mt-4">
        <TaskItem
          v-for="task in sortedTasks"
          :key="task._id"
          :task="task"
          @taskUpdated="fetchTasks"
          @taskDeleted="fetchTasks"
        />
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import TaskItem from './TaskItem.vue';
  import TaskForm from './TaskForm.vue';
  import TaskSummary from './TaskSummary.vue';
  import { getTasks } from '../services/api';
  
  export default defineComponent({
    components: {
      TaskItem,
      TaskForm,
      TaskSummary,
    },
    setup() {
      const tasks = ref<any[]>([]);
      const sorted = ref<boolean>(false);
  
      const fetchTasks = async () => {
        try {
          const response = await getTasks();
          tasks.value = response.data;
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
  
      const sortByDate = () => {
        sorted.value = !sorted.value;
      };
  
      const sortedTasks = computed(() => {
        return [...tasks.value].sort((a, b) => {
          return sorted.value
            ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            : 0;
        });
      });
  
      const completedCount = computed(() => tasks.value.filter(t => t.completed).length);
      const pendingCount = computed(() => tasks.value.filter(t => !t.completed).length);
  
      onMounted(() => {
        fetchTasks();
      });
  
      return {
        tasks,
        sortedTasks,
        sortByDate,
        completedCount,
        pendingCount,
        fetchTasks,
      };
    },
  });
  </script>
  