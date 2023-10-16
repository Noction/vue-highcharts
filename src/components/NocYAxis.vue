<template>
  <div ref="yAxisContainer" />
</template>

<script setup lang="ts">
import { ref, onMounted, h, render, defineComponent, Fragment, provide, inject, watchEffect } from 'vue';
import type {Axis, Chart,  YAxisOptions } from 'highcharts';
import {useHighchartsContext} from "@/composables/useHighchartsContext";

const props = defineProps<{
  id: string,
  options: YAxisOptions
}>();

const { chartInstance } = useHighchartsContext();
const yAxisContainer = ref<HTMLElement | null>(null);
let currentYAxis: Axis | undefined;

const slots = defineSlots<{
  default(): any
}>();

onMounted(() => {
  if (yAxisContainer.value) {
    const existingAxis = chartInstance.get(props.id) as Highcharts.Axis;
    if (existingAxis && existingAxis.coll === 'yAxis') {
      existingAxis.update(props.options);
      currentYAxis = existingAxis;
    } else {
      currentYAxis = chartInstance.addAxis({ ...props.options, id: props.id }, false);
    }

    const InternalComponent = defineComponent({
      setup() {
        provide('parent-axis', currentYAxis);
        return () => h(Fragment, null, slots.default ? slots.default() : []);
      },
    });

    render(h(InternalComponent), yAxisContainer.value);
  }

  // Setup a watcher to observe changes to the component's properties
  watchEffect(() => {
    if (currentYAxis) {
      currentYAxis.update(props.options);
    }
  });
});
</script>
