<template>
    <li class="flex items-center justify-between p-4 border rounded mb-2">
      <div>
        <input
          type="checkbox"
          :checked="task.completed"
          @change="onToggleCompletion"
          class="mr-2"
        />
        <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
        <div class="text-sm text-gray-500">
          Deadline: {{ formattedDeadline }}
        </div>
      </div>
      <div>
        <button @click="confirmDeleteTask" class="text-red-500">Delete</button>
      </div>
    </li>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { updateTask, deleteTask as deleteTaskApi } from '../services/api';
  
  export default defineComponent({
    name: 'TaskItem',
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    emits: ['taskUpdated', 'taskDeleted'],
    setup(props, { emit }) {
      const onToggleCompletion = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const newCompletedStatus = target.checked;
        try {
          await updateTask(props.task._id, { completed: newCompletedStatus });
          emit('taskUpdated');
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
  
      const confirmDeleteTask = () => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
          deleteTask();
        }
      };
  
      const deleteTask = async () => {
        try {
          await deleteTaskApi(props.task._id);
          emit('taskDeleted');
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };
  
      const formattedDeadline = computed(() => {
        const date = new Date(props.task.deadline);
        return date.toLocaleString();
      });
  
      return {
        onToggleCompletion,
        confirmDeleteTask,
        deleteTask,
        formattedDeadline,
      };
    },
  });
  </script>
  