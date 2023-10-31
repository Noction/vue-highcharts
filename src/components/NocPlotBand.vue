<template>
  <!-- No direct rendering, it just manipulates its parent x-axis or y-axis -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, inject, ref } from 'vue';
import type { AxisPlotBandsOptions } from 'highcharts';

const props = defineProps<{
  options: AxisPlotBandsOptions
}>();

let currentAxis: Highcharts.Axis | undefined;
let plotBandId: string | null = null;

const counter = ref(0);  // A counter to ensure unique IDs
const generateUniqueId = () => `plotBand-${Date.now()}-${counter.value++}`;

const addOrUpdatePlotBand = () => {
  if (!currentAxis || !props.options) return;  // Error checks

  // If the plotBandId exists, it means we've added a plot band before.
  if (plotBandId) {
    // Remove the existing plot band
    currentAxis.removePlotBand(plotBandId);

    // Add the plot band with the updated options
    const newPlotBandOptions = { ...props.options, id: plotBandId };  // Ensure the ID remains the same
    currentAxis.addPlotBand(newPlotBandOptions);
  } else {
    // If we're here, it means it's the first time we're adding the plot band.
    plotBandId = generateUniqueId(); // Generate a unique ID
    const newPlotBandOptions = { ...props.options, id: plotBandId };  // Assign the generated ID
    currentAxis.addPlotBand(newPlotBandOptions);
  }
};

onMounted(() => {
  currentAxis = inject('parent-axis') as Highcharts.Axis;  // Inject the parent axis instance
  if (!currentAxis) {
    console.error("Parent axis not found!");  // Error handling
    return;
  }
  addOrUpdatePlotBand();
});

watch(() => props.options, addOrUpdatePlotBand, { deep: true });

onUnmounted(() => {
  if (currentAxis && plotBandId) {
    currentAxis.removePlotBand(plotBandId);
  }
});
</script>
