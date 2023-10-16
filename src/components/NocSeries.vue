<template />

<script setup lang="ts">
import { onMounted, onUnmounted, watch, inject } from 'vue';
import type { SeriesOptionsType } from 'highcharts';
import {useHighchartsContext} from "@/composables/useHighchartsContext";

const { chartInstance } = useHighchartsContext();

const props = defineProps<{
  options: SeriesOptionsType;
  id?: string;
}>();

let series: Highcharts.Series | null = null;

const addOrUpdateSeries = () => {
  const existingSeries = props.id && chartInstance.get(props.id);

  if (existingSeries) {
    const updatedOptions = JSON.parse(JSON.stringify(props.options));
    existingSeries.update(updatedOptions, true, true);
  } else {
    const newSeriesOptions = { id: props.id, ...props.options };
    series = chartInstance.addSeries(newSeriesOptions, true, true);
  }
};

onMounted(addOrUpdateSeries);

watch(() => props.options, addOrUpdateSeries, { deep: true });

onUnmounted(() => {
  if (series) {
    series.remove(false, true, true);
  }
});
</script>
