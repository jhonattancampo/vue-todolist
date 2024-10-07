<template>
  <div class="flex justify-between p-4 bg-gray-100 rounded">
    <div>Completed: {{ completedCount }}</div>
    <div>Pending: {{ pendingCount }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskSummary',
  props: {
    completedCount: {
      type: Number,
      required: true,
    },
    pendingCount: {
      type: Number,
      required: true,
    },
  },
});
</script>
