<template>
  <div ref="xAxisContainer" />
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, h, render, defineComponent, Fragment, provide, inject, watchEffect} from 'vue';
import { Axis, type XAxisOptions } from 'highcharts';
import { useHighchartsContext } from '@/composables/useHighchartsContext';

const props = defineProps<{
  id: string,
  options: XAxisOptions
}>();

// const chart = inject('chartInstance') as Chart;
const { chartInstance } = useHighchartsContext();
const xAxisContainer = ref<HTMLElement | null>(null);
let currentXAxis: Axis | undefined;

const slots = defineSlots<{
  default(): any
}>();

onMounted(() => {
  if (xAxisContainer.value) {
    const existingAxis = chartInstance.get(props.id) as Axis;

    if (existingAxis && existingAxis instanceof Axis && existingAxis.coll === 'xAxis') {
      // If the axis with the provided ID exists, update its properties
      existingAxis.update(props.options);
      currentXAxis = existingAxis;
    } else {
      // If no such axis exists, add a new one
      currentXAxis = chartInstance.addAxis({ ...props.options, id: props.id }, true);
    }

    const InternalComponent = defineComponent({
      setup() {
        provide('parent-axis', currentXAxis);
        return () => h(Fragment, null, slots.default ? slots.default() : []);
      },
    });

    render(h(InternalComponent), xAxisContainer.value);
  }

  watchEffect(() => {
    if (currentXAxis) {
      currentXAxis.update(props.options);
    }
  });
});

onUnmounted(() => {
  if (currentXAxis) {
    currentXAxis.remove();
  }
});
</script>
