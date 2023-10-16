<template>
  <!-- No direct rendering, it just manipulates its parent x-axis or y-axis -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, inject, ref } from 'vue';
import type { AxisPlotLinesOptions } from 'highcharts';

const props = defineProps<{
  options: AxisPlotLinesOptions
}>();

let currentAxis: Highcharts.Axis | undefined;
let plotLineId: string | null = null;

const counter = ref(0);  // A counter to ensure unique IDs
const generateUniqueId = () => `plotLine-${Date.now()}-${counter.value++}`;

const addOrUpdatePlotLine = () => {
  if (!currentAxis || !props.options) return;  // Error checks

  // If the plotLineId exists, it means we've added a plot line before.
  if (plotLineId) {
    // Remove the existing plot line
    currentAxis.removePlotLine(plotLineId);

    // Add the plot line with the updated options
    const newPlotLineOptions = { ...props.options, id: plotLineId };  // Ensure the ID remains the same
    currentAxis.addPlotLine(newPlotLineOptions);
  } else {
    // If we're here, it means it's the first time we're adding the plot line.
    plotLineId = generateUniqueId(); // Generate a unique ID
    const newPlotLineOptions = { ...props.options, id: plotLineId };  // Assign the generated ID
    currentAxis.addPlotLine(newPlotLineOptions);
  }
};

onMounted(() => {
  currentAxis = inject('parent-axis') as Highcharts.Axis;  // Inject the parent axis instance
  if (!currentAxis) {
    console.error("Parent axis not found!");  // Error handling
    return;
  }
  addOrUpdatePlotLine();
});

watch(() => props.options, addOrUpdatePlotLine, { deep: true });

onUnmounted(() => {
  if (currentAxis && plotLineId) {
    currentAxis.removePlotLine(plotLineId);
  }
});
</script>
